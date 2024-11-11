import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { searchAnimeQuery } from "@/lib/aniListQueries";

const url = "https://gogoanime3.net";
const anilistUrl = "https://graphql.anilist.co";
const list_episodes_url = "https://ajax.gogocdn.net/ajax/load-list-episode";
const anifyUrl = "https://api.anify.tv";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id")!;
    const requestURL = `${url}/category/${id}`;
    const animeId = id.replace("-dub", "").replace("-sub", ""); //Extracting AnimeId to be checked on AniList
    console.log(animeId);

    let result = {};
    const { data } = await axios.get(requestURL);
    const $ = cheerio.load(data);   //cheerio.load(data) loads HTML content stored in "data" in cheerio

    const title = $(".anime_info_body_bg").find("h1").text();
    const image = $(".anime_info_body_bg").find("img[src]").attr("src");
    let type, description, genre, released, status, otherName;
    const ep_start = $("#episode_page > li").first().find("a").attr("ep_start");
    const numOfEpisodes = $("#episode_page li:last-child a").attr("ep_end");

    $(".type").each((i, el) => {
      const $el = $(el);
      switch (i) {
        case 0:
          type = $el.text().replace(/\s\s+/g, "");
          break;
        case 1:
          description = $el.text().replace(/\s\s+/g, "");
          break;
        case 2:
          genre = $el.text().replace(/\s\s+/g, "");
          break;
        case 3:
          released = $el.text().replace(/\s\s+/g, "");
          break;
        case 4:
          status = $el.text().replace(/\s\s+/g, "");
          break;
        case 5:
          otherName = $el.text().replace(/\s\s+/g, "");
          break;
      }
    });

    const episodes: any[] = [];

    const movie_id = $("#movie_id").attr("value");
    const alias = $("#alias_anime").attr("value");
    const episodeHtml = await axios.get(
      `${list_episodes_url}?ep_start=${ep_start}&ep_end=${numOfEpisodes}&id=${movie_id}&default_ep=${0}&alias=${alias}`
    );
    const $$ = cheerio.load(episodeHtml.data);

    $$("#episode_related > li").each((i, el) => {
      episodes.push($(el).find("a").attr("href")?.toString().replace('/','').trim());
    });
    episodes.reverse();
    let anilistResponse;
    try {
      anilistResponse = await axios({
        url: anilistUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          query: searchAnimeQuery,
          variables: {
            search: animeId,
          },
        },
      });
    } catch (err) {
      console.log("Error from getanime anilist api call", err);
    }

    const anilistId = anilistResponse?.data?.data?.Media?.id;
    let anifyData: any = {};
    let kitsuId = null;
    if (anilistId) {
      await axios
        .get(`${anifyUrl}/info/${anilistId}`)
        .then((response: any) => {
          anifyData = response.data;
          kitsuId = response.data.mappings.find(
            (mapping: any) => mapping.providerId === "kitsu"
          ).id;
        })
        .catch(() => {
          anifyData = {};
        });
    }
    const jikanResponse = await axios.get(`https://api.jikan.moe/v4/anime/${anilistResponse?.data?.data?.Media?.idMal}/reviews`)

    const gogoResponse = {
      title,
      image,
      type,
      description,
      genre,
      released,
      status,
      otherName,
      numOfEpisodes,
      episodes,
    };

    if (anilistResponse !== undefined) {
      const anilistData = anilistResponse.data.data.Media;
      const anilist = {
        id: anilistData.id,
        malId: anilistData.idMal,
        title: anilistData.title,
        anilistPoster: anilistData.coverImage,
        anilistBannerImage: anilistData.bannerImage,
        color: anilistData.coverImage.color,
        type: anilistData.type,
        description: anilistData.description,
        genre: anilistData.genres,
        season: anilistData.season,
        released: anilistData.seasonYear,
        status: anilistData.status,
        popularity: anilistData.popularity,
        averageScore: anilistData.averageScore,
        numOfEpisodes: anilistData.episodes,
        animeEpisodes: episodes,
        mappings: anifyData?.mappings,
        kitsuId: kitsuId,
        malReviews: jikanResponse.data.data,
        ...anilistData,
      };
      result = {
        anilistResponse: anilist,
        gogoResponse: gogoResponse,
      };
    } else {
      result = {
        anilistResponse: null,
        gogoResponse: gogoResponse,
      };
    }
    return NextResponse.json(
      {
        msg: "Success",
        result,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("Error in anime details route", err);
    return NextResponse.json(
      {
        msg: "Error in anime details route",
      },
      {
        status: 500,
      }
    );
  }
}
