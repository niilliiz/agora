import styles from "./room.module.css";

import {
  useIsConnected,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";
import MediaController from "@/app/components/media-controller";
import { useEffect, useRef } from "react";

export default function Room({ micOn, cameraOn, setMicOn, setCameraOn, onLeave }) {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  const isConnected = useIsConnected();

  function handleLeaveTheRoom() {
    onLeave();
  }

  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);
  remoteMicrophoneTracks.map(track => track.play());

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  function handleToggleMic() {
    if (micOn) {
      setMicOn(false);
      if (localMicrophoneTrack) {
        localMicrophoneTrack.close();
      }
    } else {
      setMicOn(true);
      if (localMicrophoneTrack) {
        localMicrophoneTrack.play();
      }
    }
  }

  function handleToggleCamera() {
    if (cameraOn) {
      setCameraOn(false);

      if (localCameraTrack) {
        localCameraTrack.stop();
      }
    } else {
      setCameraOn(true);
      if (localCameraTrack) {
        localCameraTrack.play(localVideoRef.current);
      }
    }
  }

  useEffect(() => {
    if (remoteCameraTracks.length > 0 && remoteVideoRef.current) {
      remoteCameraTracks[0].play(remoteVideoRef.current);
    }
  }, [remoteCameraTracks.length]);

  useEffect(() => {
    if (localCameraTrack && localVideoRef.current) {
      localCameraTrack.play(localVideoRef.current);
    }
  }, [localCameraTrack]);

  return (
    <div className={styles.roomContainer}>
      <h1>Room</h1>
      <div className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <div className={styles.video} ref={remoteVideoRef} />
          <div className={styles.video} ref={localVideoRef} />
        </div>
        <MediaController
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={() => handleToggleMic()}
          setCameraOn={() => handleToggleCamera()}
          onLeave={() => handleLeaveTheRoom()}
        />
      </div>
    </div>
  );
}
