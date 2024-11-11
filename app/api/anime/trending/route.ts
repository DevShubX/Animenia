import { TrendingAnimeQuery } from "@/lib/aniListQueries";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://graphql.anilist.co";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page")!;
  const count = req.nextUrl.searchParams.get("count")!;
  try {
    const response:any = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: TrendingAnimeQuery,
        variables: {
          page: page === undefined ? 1 : page,
          perPage: count === undefined ? 10 : count,
        },
      },
    }).catch((err) => {
      return NextResponse.json(
        {
          msg: "Error fetching trending anime",
          err,
        },
        {
          status: 400,
        }
      );
    });
    // console.log(response)
    if (response === undefined || response === null) {
      return NextResponse.json(
        {
          data: "No response",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        msg: "Success",
        result: response.data,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("Error from Trending Anime Route", err);
    return NextResponse.json(
      {
        msg: "Error from Trending Anime Route",
      },
      {
        status: 500,
      }
    );
  }
}
