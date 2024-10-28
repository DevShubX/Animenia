import axios from 'axios'
import React from 'react'
import AnimeWatch from './_components/AnimeWatch'

const AnimeWatchPage = async ({params} : {params : {episodeId : string}}) => {
    const response = await axios.get(`http://localhost:3000/api/animeEpisodeLinks?episodeId=${params.episodeId}`)

  return (
    <div>
        <AnimeWatch data={response.data.result} />
    </div>
  )
}

export default AnimeWatchPage