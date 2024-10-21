import React from 'react'
import AnimeDetails from './_components/AnimeDetails'
import axios from 'axios'

const AnimeDetailsPage = async ({params}:{params:{animeId:string}}) => {
    const response = await axios.get(`http://localhost:3000/api/animeDetails?id=${params.animeId}`) 

  return (
    <div>
      <AnimeDetails gogoData={response.data.result.gogoResponse} anilistData={response.data.result.anilistResponse} />
    </div>
  )
}

export default AnimeDetailsPage