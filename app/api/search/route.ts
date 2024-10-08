import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://gogoanime3.net";

const link = `${BASE_URL}//search.html?keyword=`;

export async function GET(req: NextRequest) {
  try {
    let name = req.nextUrl.searchParams.get("name")!;

    name = encodeURIComponent(name.trim());

    let result: any[] = [];
    const { data } = await axios.get(link + name);
    const $ = cheerio.load(data);
    $(".last_episodes ul li").each((i, el) => {
      const $el = $(el);
      const image = $el.find(".img a img[src]").attr("src");
      const title = $el.find("p a").attr("title");
      const releaseDate = $el.find(".released").text().replace(/\s\s+/g, "");
      const animeId = $el.find(".img a").attr("href");

      result.push({
        title,
        image,
        animeId: animeId?.replace("/category/", ""),
        releaseDate,
      });
    });
    result = result.filter((item) => item.releaseDate != "");
    return NextResponse.json(
      {
        msg: "Success",
        result,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error from search route", err);
    return NextResponse.json(
      {
        msg: "Error from search error",
      },
      { status: 500 }
    );
  }
}
