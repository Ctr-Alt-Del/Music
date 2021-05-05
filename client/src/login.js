import React from 'react';
import './App.css'

// import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?response_type=code&client_id=5a86df01b4d143979952801e438f042b&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return (
        <div class="login">
            <button class="button">
                <a class="loginButton" href={AUTH_URL}>Login</a>
            </button>
        </div>
    )
}