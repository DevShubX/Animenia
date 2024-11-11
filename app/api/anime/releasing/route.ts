import { releaseingAnimeQuery } from "@/lib/aniListQueries";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://graphql.anilist.co";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status")!;
  try {
    const response: any = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: releaseingAnimeQuery,
        variables: {
          status: status === undefined ? null : status,
        },
      },
    }).catch((err) => {
      return NextResponse.json(
        {
          msg: "Error fetching releasing Anime",
          err,
        },
        {
          status: 400,
        }
      );
    });
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
    console.log("Error from Releasing Anime Route", err);
    return NextResponse.json(
      {
        msg: "Error from Releasing Anime Route",
      },
      {
        status: 500,
      }
    );
  }
}
