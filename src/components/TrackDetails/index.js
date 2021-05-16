import { useState } from 'react';
import './details.css';

function TrackDetails({trackID, trackName, albumName, handleClick}) {
  const [className, setClassName] = useState("component-track-details");

  return(
    <div onClick={() => {handleClick(trackID, trackName, albumName)}} className={className}>
      <div onClick={() => setClassName("component-track-details-selected")}>
        <div className="component-track-details-track-name">
          <h5>{trackName}</h5>
        </div>
        <div className="component-track-details-track-album-name">
          <h6>{`Album: ${albumName}`}</h6>
        </div>
      </div>
    </div>
  );
}

export default TrackDetails;