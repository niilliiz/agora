import styles from "./remote-video-container.module.css";
import {
  RemoteAudioTrack,
  RemoteVideoTrack,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import UserState from "@/app/components/room/components/user-state";
import CameraOffContainer from "@/app/components/camera-off";

export default function RemoteVideoContainer({ client = {} }) {
  const remoteUsers = useRemoteUsers();

  const hasRemoteUser = remoteUsers.length > 0;
  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);

  remoteMicrophoneTracks.map(track => track.play());

  return (
    <div className={styles.remoteVideoContainer}>
      {hasRemoteUser ? (
        remoteUsers.map(user => {
          const videoTrack = remoteCameraTracks.find(track => track.getUserId() === user.uid);
          const audioTrack = remoteMicrophoneTracks.find(track => track.getUserId() === user.uid);

          console.log("userV", videoTrack, user.hasVideo);
          console.log("userA", audioTrack, user.hasAudio);
          return (
            <div key={user.uid}>
              <CameraOffContainer />
              <UserState name="remote" micOn={user.hasAudio} />
              <RemoteVideoTrack track={videoTrack} play={user.hasVideo} />
              <RemoteAudioTrack track={audioTrack} play={user.hasAudio} />
            </div>
          );
        })
      ) : (
        <div>wait</div>
      )}
    </div>
  );
}
