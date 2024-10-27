import { getAnimeReviewsByIdQuery } from "@/lib/aniListQueries";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = "https://graphql.anilist.co";

export async function GET(req: NextRequest,{params}:{params:{reviewId: string}}) {
  try {
    const response:any = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: getAnimeReviewsByIdQuery,
        variables: {
            reviewId: params.reviewId
        },
      },
    }).catch((err) => {
      return NextResponse.json(
        {
          msg: "Error fetching review of anime",
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
    console.log("Error from Review of Anime Route", err);
    return NextResponse.json(
      {
        msg: "Error from Review of Anime Route",
      },
      {
        status: 500,
      }
    );
  }
}
