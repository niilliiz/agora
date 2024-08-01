import styles from "./remote-video-container.module.css";
import {
  RemoteVideoTrack,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";

export default function RemoteVideoContainer({ client = {} }) {
  const remoteUsers = useRemoteUsers();
  const hasRemoteUser = remoteUsers.length > 0;

  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);

  remoteMicrophoneTracks.map(track => track.play());

  return (
    <div className={styles.remoteVideoContainer}>
      {hasRemoteUser ? (
        remoteCameraTracks.map(track => {
          const hasVideo = remoteUsers?.find(user => user.uid === track?.getUserId())?.hasVideo;
          return <RemoteVideoTrack key={track.getTrackId()} track={track} play={hasVideo} />;
        })
      ) : (
        <div>wait</div>
      )}
    </div>
  );
}
