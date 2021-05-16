import { useState } from 'react';
import TrackDetails from '../components/TrackDetails/index';
import useFetch from '../hooks/useFetch';

function Home() {
  const  [topTracks, setTopTracks] = useFetch(); 
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  const handleFavorite = (currentTrackIndex) => {
    const newTopTracks = [ ...topTracks];
    newTopTracks[currentTrackIndex].active = true;
    newTopTracks[currentTrackIndex].index = currentTrackIndex;

    setTopTracks(newTopTracks);
    setFavoriteTracks([ ...favoriteTracks, newTopTracks[currentTrackIndex]]);
  };

  const handleUnfavorite = (currentTrackIndex) => {
    const newFavoriteTracks = [ ...favoriteTracks];
    const newTopTracks = [ ...topTracks];
    const track = newFavoriteTracks[currentTrackIndex];
    newTopTracks[track.index].active = false;

    setTopTracks(newTopTracks);
    newFavoriteTracks.splice(currentTrackIndex, 1);
    setFavoriteTracks(newFavoriteTracks);
  }

  return (
    <div className="Home">
      <div className="tracksList">
        <h1>Beatles' Top Tracks on <strong>Spotify</strong></h1>
        <div>{topTracks && topTracks.map((track, index) => (
          <TrackDetails 
            key={track.id} 
            trackName={track.name} 
            albumName={track.album.name} 
            handleClick={() => handleFavorite(index)}
            active={track.active}
          />
        ))}
        </div>
      </div>

      <div className="favoriteTracksList">
        <h1>My Favorite Tracks</h1>
        <div>{favoriteTracks.length > 0 && favoriteTracks.map((favTrack, index) => (
          <TrackDetails 
            key={favTrack.id} 
            trackName={favTrack.name} 
            albumName={favTrack.album.name} 
            handleClick={() => handleUnfavorite(index)} 
          />
        ))}</div>
      </div>
    </div>
  );
}

export default Home;