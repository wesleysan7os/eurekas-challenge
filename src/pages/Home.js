import { useEffect, useState } from 'react';
import axios from 'axios';
import Credencials from '../utils/Credentials';
import TrackDetails from '../components/TrackDetails/index';


function Home() {
  const [token, setToken] = useState('');
  const [topTracks, setTopTracks] = useState(null);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
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

  const handleFavorite = (trackID, trackName, albumName) => {
    const newFavoriteTrack = {
      id: trackID,
      name: trackName,
      album: albumName
    };
 
    setFavoriteTracks([ ...favoriteTracks, newFavoriteTrack]);
  };

  const handleUnfavorite = (trackID, trackName, albumName) => {
    const newFavoriteTracks = favoriteTracks.filter(track => track.id !== trackID);

    setFavoriteTracks(newFavoriteTracks);
  }


  return (
    <div className="Home">
      <div className="tracksList">
        <h1>Beatles' Top Tracks on <strong>Spotify</strong></h1>
        <div>{topTracks && topTracks.map((track) => (
          <TrackDetails 
            key={track.id} 
            trackID={track.id} 
            trackName={track.name} 
            albumName={track.album.name} 
            handleClick={handleFavorite}
          />
        ))}
        </div>
      </div>

      <div className="favoriteTracksList">
        <h1>My Favorite Tracks</h1>
        <div>{favoriteTracks.length > 0 && favoriteTracks.map((favTrack) => (
          <TrackDetails 
            key={favTrack.id} 
            trackID={favTrack.id} 
            trackName={favTrack.name} 
            albumName={favTrack.album} 
            handleClick={handleUnfavorite} 
          />
        ))}</div>
      </div>
    </div>
  );
}

export default Home;