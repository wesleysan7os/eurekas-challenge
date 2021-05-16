import { useState, useEffect } from 'react';
import axios from 'axios';
import Credencials from '../utils/credentials';

function useFetch() {
  const [token, setToken] = useState('');
  const [topTracks, setTopTracks] = useState(null);
  const beatlesID = '3WrFJ7ztbogyGnTHbHJFl2';
  const spotify = Credencials();

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
    })
    .then(tokenResponse => {
      setToken(tokenResponse.data.access_token);

      axios(`https://api.spotify.com/v1/artists/${beatlesID}/top-tracks?market=BR`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token }
      })
      .then(topTracksResponse => {
        setTopTracks(topTracksResponse.data.tracks);
      })
    });
  }, []);

  return ([topTracks, setTopTracks]);
}

export default useFetch;