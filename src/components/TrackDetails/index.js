import './details.css';

function TrackDetails({trackName, albumName, handleClick, active}) {
  
  return(
    <div onClick={handleClick} className={!active ? "component-track-details" : "component-track-details-selected"}>
      <div className="component-track-details-track-name">
        <h5>{trackName}</h5>
      </div>
      <div className="component-track-details-track-album-name">
        <h6>{`Album: ${albumName}`}</h6>
      </div>
    </div>
  );
}

export default TrackDetails;