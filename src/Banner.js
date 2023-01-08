import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from './axios'
import requests from './request'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url="https://image.tmdb.org/t/p/original/"

const Banner = () => {
    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    useEffect(() => {
      async function fetchData(){
        const request=await axios.get(requests.fetchNetflixOriginals)
        setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length -1)]);
      }
      fetchData()
      
    }, [])

    console.table(movie)
    function truncate(str, n){
        return str?.length>n?str.substr(0,n-1) + "...":str;
    }
    const opts={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        }
     }

     const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('')
        }
        else{
            movieTrailer(movie?.name || "").then(url=>{
                //https://www.youtube.com/watch?v=${videoId}
                const urlParams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get(`v`))
            }).catch(err=>console.log(err))
        }
     }
  return (
    <>
    <header className='banner'
        style={{
            backgroundSize:"cover",
            backgroundImage:`url("${base_url}${movie?.backdrop_path}")`,
            backgroundPosition:"center center "
        }}>
        <div className="banner_contents">
    {/* Background image */}
      {/* title */}
      <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
      <div className="banner_buttons">
        <button className="banner_button" onClick={()=>handleClick(movie)}>Play</button>
        <button className="banner_button">My List</button>
      </div>
      <h1 className="banner_description">
        {truncate(movie?.overview, 150)}
      </h1>
      {/* description */}
      </div>
     
      <div className="banner_fadeBottom"></div>


    </header>
     {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}

     </>
  )
}

export default Banner
