import axios from "axios"
import * as cheerio from "cheerio"
import { decryptEncryptAjaxResponse, generateEncryptAjaxParameters } from "./ajaxCryptoMethods"

const BASE_URL = "https://gogoanime3.net"
const goload_stream_url = "https://goload.pro/streaming.php"
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"

export async function scrapeSourceFiles(id:string){
    let sources:any[] = []
    let sources_bk:any[] = []
    try{
        let epPage, server, $, serverUrl

        if(id.includes("episode")){
            epPage = await axios.get(BASE_URL + "/" + id)
            $ = cheerio.load(epPage.data)
            
            server = $('div.anime_video_body > div.anime_muti_link > ul > li.vidcdn > a').attr('data-video')!
            serverUrl = new URL(server)
        }
        else {
            serverUrl = new URL(`${goload_stream_url}?id=${id}`)
        }

        const goGoServerPage = await axios.get(serverUrl.href,{
            headers: {"User-Agent": USER_AGENT}
        })
        const $$ = cheerio.load(goGoServerPage.data)

        const params = generateEncryptAjaxParameters(
            $$,
            serverUrl.searchParams.get("id") ?? ''
        )
        const fetchRes = await axios.get(
            `${serverUrl.protocol}//${serverUrl.hostname}/encrypt-ajax.php?${params}`,{
                headers: {
                    "User-Agent": USER_AGENT,
                    "X-Requested-With": "XMLHttpRequest"
                }
            }
        )
        const response = await decryptEncryptAjaxResponse(fetchRes.data.data)

        if(!response.source) return { error: "No source found"}

        if(response.source[0].file.includes('.m3u8')){
            const resResult = await axios.get(response.source[0].file.toString())
            const resolution = resResult.data.match(/(RESOLUTION=)(.*)(\s*?)(\s*.*)/g)
            resolution.forEach((res:any) => {
                const index = response.source[0].file.lastIndexOf("/")
                const quality = res.split("\n")[0].split('x')[1].split(',')[0]
                const url = response.source[0].file.slice(0,index)

                sources.push({
                    url: `${url}/${res.split('\n')[1]}`,
                    isM3U8 : (url + res.split('\n')[1]).includes('.m3u8'),
                    quality : `${quality}p`                
                })
            })
            response.source.forEach((source:any) => {
                sources.push({
                    url : source.file,
                    isM3U8 : source.file.includes('.m3u8'),
                    quality : 'default'
                })
            })
        }
        if(response.source_bk[0].file.includes('.m3u8')){
            const resResult = await axios.get(response.source_bk[0].file.toString())
            const resolution = resResult.data.match(/(RESOLUTION=)(.*)(\s*?)(\s*.*)/g)
            resolution.forEach((res:any) => {
                const index = response.source_bk[0].file.lastIndexOf("/")
                const quality = res.split("\n")[0].split('x')[1].split(',')[0]
                const url = response.source_bk[0].file.slice(0,index)

                sources_bk.push({
                    url: `${url}/${res.split('\n')[1]}`,
                    isM3U8 : (url + res.split('\n')[1]).includes('.m3u8'),
                    quality : `${quality}p`                
                })
            })
            response.source_bk.forEach((source_bk:any) => {
                sources.push({
                    url : source_bk.file,
                    isM3U8 : source_bk.file.includes('.m3u8'),
                    quality : 'default'
                })
            })
        }
        return{
            Referer: serverUrl.href,
            sources: sources,
            sources_bk: sources_bk
        }
    }catch(err){
        return { error: err }
    }
}