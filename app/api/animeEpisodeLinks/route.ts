import { scrapeSourceFiles } from "@/lib/videoLinkExtractor";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from 'cheerio'

const url = "https://gogoanime3.net"
const iframeLink = (episodeId:string) =>
    `https://disqus.com/embed/comments/?base=default&f=gogoanimetv&t_u=https%3A%2F%2Fgogoanime.vc%2F${episodeId}&s_o=default#version=cfefa856cbcd7efb87102e7242c9a829`;


export async function GET(req:NextRequest){
    try{
        const epiId = req.nextUrl.searchParams.get("episodeId")!
        const episodeId = `${url}/${epiId}`
        let sources:any = {}

        sources = await scrapeSourceFiles(epiId)
        
        let result:any = {}
        const { data } = await axios.get(episodeId)
        const $ = cheerio.load(data)

        const downloadLink = $(".downloads").find("a").attr("href")
        let vidstreaming, gogoserver, streamsb, xstreamcdn, mixdrop, mp4upload, doodstream;

        $(".anime_muti_link ul li").each((i,el) => {
            const $el = $(el)
            switch(i){
                case 0:
                    vidstreaming = $el.find("a").attr("data-video")
                    if (vidstreaming !== undefined){
                        vidstreaming = vidstreaming
                    }
                    break;
                case 1:
                    gogoserver = $el.find("a").attr("data-video")
                    if (gogoserver !== undefined){
                        gogoserver = gogoserver
                    }
                    break;
                case 2:
                    streamsb = $el.find("a").attr("data-video")
                    break;
                case 3:
                    xstreamcdn = $el.find("a").attr("data-video")
                    break;
                case 4:
                    mixdrop = $el.find("a").attr("data-video")
                    break;
                case 5:
                    mp4upload = $el.find("a").attr("data-video")
                    break
                case 6:
                    doodstream = $el.find("a").attr("data-video")
                    break;
            }
        })

        const numOfEpisodes:number = parseInt($("#episode_page li:last-child a").attr("ep_end")!)
        const baseEpisodeLink = epiId.replace(/\d+$/,"")
        const episodes = []
        for (let i = 1; i <= numOfEpisodes; i++){
            episodes.push(baseEpisodeLink + i)
        }
        const titleName = $(".title_name h2").text()
        const comments = iframeLink(epiId.substring(1))

        result={
            titleName,
            downloadLink,
            vidstreaming,
            gogoserver,
            streamsb,
            xstreamcdn,
            mixdrop,
            mp4upload,
            doodstream,
            numOfEpisodes,
            baseEpisodeLink,
            episodes,
            sources,
            comments,
        }

        return NextResponse.json({
            msg: "Success",
            result
        },{
            status: 200
        })

    }catch(err){
        console.log("Error from getLinks route",err)
        return NextResponse.json({
            msg: "Error from Episode Link"
        },{
            status: 500
        })
    }
}