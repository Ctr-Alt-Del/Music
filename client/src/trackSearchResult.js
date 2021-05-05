import React from 'react';

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
    return (
        <div style={{ cursor: "pointer" }} onClick={handlePlay}>
            <div style={{ disply: "flex", justifyContent: "center", alignItems: "center", width: "auto" }}>
                <img src={track.albumUrl} class="albumCover" alt="Album Cover" />
            </div>
            <div className="info">
                <div class="songTitle">{track.title}</div>
                <div className='text-muted'>{track.artist}</div>
                <div class="songTitle">{track.songId}</div>
            </div>
        </div>
    )
}
