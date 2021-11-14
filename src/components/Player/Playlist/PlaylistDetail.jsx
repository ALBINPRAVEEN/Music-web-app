import React from "react";
import { connect } from "react-redux";
import convert from "convert-seconds";
import { Icon } from "react-icons-kit";
import { ic_play_arrow, ic_play_circle_filled } from "react-icons-kit/md";
import { getTrackInfo } from "../../../redux/dataFetch";
import { setPlayingQueue } from "./../../../redux/track/track.actions";
import Loader from "./../Loader/Loader";

function PlaylistDetail({ playlist, getTrackQueue }) {
  if (!playlist) {
    return <Loader />;
  }

  const duration = playlist.duration && convert(playlist.duration);
  let trackNumber = 1;

  return (
    <div className="details-container">
      <div className="details-info">
        <div className="details-info-left">
          <img src={playlist.picture_medium} alt="cover" />
        </div>
        <div className="details-info-right">
          <div className="details-contributor">
            Creator: {playlist.creator && playlist.creator.name}
          </div>
          <div className="details-title">Title: {playlist.title}</div>
          <div>Description: {playlist.description}</div>
          <div>Tracks: {playlist.nb_tracks}</div>
          <div>
            Duration: {duration && duration.hours}:
            {duration && duration.minutes}:{duration && duration.seconds}
          </div>
          <div className="play-button">
            <button
              onClick={() => {
                getTrackQueue(playlist.tracks.data[0].id, playlist.tracks.data);
              }}
            >
              <Icon size={20} icon={ic_play_arrow} />
              Play
            </button>
          </div>
        </div>
      </div>
      <div className="details-bottom">
        <div className="details-bottom-title">Tracks</div>

        {playlist.tracks &&
          playlist.tracks.data.map((track) => (
            <TrackItem
              key={track.id}
              id={track.id}
              number={trackNumber++}
              title={track.title_short}
              duration={track.duration}
              artist={track.artist.name}
              trackSrc={track.preview}
              getTrackQueue={getTrackQueue}
              playQueue={playlist.tracks.data}
            />
          ))}
      </div>
    </div>
  );
}

function TrackItem({
  id,
  number,
  title,
  duration,
  artist,
  getTrackQueue,
  playQueue,
}) {
  const trackDuration = convert(duration);
  return (
    <div className="track-item-container">
      <table className="track-item">
        <tbody>
          <tr key={id}>
            <td>{number}</td>
            <td>{title}</td>
            <td>{artist}</td>
            <td>
              {trackDuration.minutes < 10
                ? `0${trackDuration.minutes}`
                : trackDuration.minutes}
              :
              {trackDuration.seconds < 10
                ? `0${trackDuration.seconds}`
                : trackDuration.seconds}
            </td>
            <td>
              <Icon
                size={20}
                icon={ic_play_circle_filled}
                onClick={() => {
                  getTrackQueue(id, playQueue);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getTrackQueue: (id, playQueue) => {
    dispatch(getTrackInfo(id));
    dispatch(setPlayingQueue(playQueue));
  },
});
export default connect(null, mapDispatchToProps)(PlaylistDetail);
