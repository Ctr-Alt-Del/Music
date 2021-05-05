import React from 'react';
import useAuth from './useAuth'
import { Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './trackSearchResult'
import axios from "axios"
import Player from "./player"

const spotifyApi = new SpotifyWebApi({
    clientId: '5a86df01b4d143979952801e438f042b',
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState("")
    const [Lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
    }

    useEffect(() => {
        if (!playingTrack) return
        axios.get("http://localhost:3001/lyrics", {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist,
            },
        })
            .then(res => {
                setLyrics(res.data.lyrics)
            })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            console.log(res)

            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: track.album.images[0].url,
                        // songId: track.album.id
                    }
                })
            )
        }).catch(err => {
            console.log(err)
            console.log("Error. No songs found.")
            console.log("Gotta create popup to display this message")

        })
        return () => cancel = true
    }, [search, accessToken])

    return (
        <div class="row">
             <div class="row top">
                    <div class="searchBox">
                        <div class="row search">
                            <Form.Control type="search" placeholder="Search Songs/Artist" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
            <div class="col-sm-2 left sidebar">
                <p>why</p>
            </div>
            <div class="col-sm-10">
               
                <div class="row body">
                    <div class="row allSongs">
                        {searchResults.map((track) => {
                            console.log(track);
                            return (
                                <div class="col-sm-2 ">
                                    <div class="songContainer">
                                        <TrackSearchResult
                                            track={track}
                                            key={track.uri}
                                            chooseTrack={chooseTrack} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {searchResults.length === 0 && (
                    <div class="lyricsBox">
                        <p class="lyrics">
                            {Lyrics}
                        </p>
                    </div>
                )}
                </div>
                <div class="row bottom playbox">
                    <div class="row play">
                        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
                    </div>
                </div>
            </div>
        </div>
        // <div class="row">
        //     <div class="col-sm-2 sidebar">
        //         <p>why</p>
        //     </div>
        //     <div class="col-sm-10 py-2">
        //         <div class="searchBox">
        //             <div class="row search">
        //                 <Form.Control type="search" placeholder="Search Songs/Artist" value={search} onChange={e => setSearch(e.target.value)} />
        //             </div>
        //         </div>
        //         <br />
        //         <br />
        //         <div class="body">
        //             <div class="row allSongs">
        //                 {searchResults.map((track) => {
        //                     console.log(track);
        //                     return (
        //                         <div class="col-sm-2 ">
        //                             <div class="songContainer">
        //                                 <TrackSearchResult
        //                                     track={track}
        //                                     key={track.uri}
        //                                     chooseTrack={chooseTrack} />
        //                             </div>
        //                         </div>
        //                     );
        //                 })}
        //             </div>
        //         </div>
        //         {searchResults.length === 0 && (
        //             <div class="lyricsBox">
        //                 <p class="lyrics">
        //                     {Lyrics}
        //                 </p>
        //             </div>
        //         )}
        //         <div class="playBox">
        //             <div class="row play">
        //                 <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}