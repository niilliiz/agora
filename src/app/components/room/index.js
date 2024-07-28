import styles from "./room.module.css";

import {
  useIsConnected,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
  useRTCClient,
} from "agora-rtc-react";
import MediaController from "@/app/components/media-controller";
import { useEffect, useMemo, useRef } from "react";
import VideoContainer from "@/app/components/video-container";

export default function Room({ micOn, cameraOn, setMicOn, setCameraOn, onLeave }) {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

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

  usePublish([localCameraTrack, localMicrophoneTrack]);

  useEffect(() => {
    if (remoteCameraTracks.length > 0 && remoteVideoRef.current) {
      remoteCameraTracks.map(track => track.play(remoteVideoRef.current));
    }
    //   todo: handle unmount component
  }, [remoteCameraTracks.length]);

  useEffect(() => {
    if (localVideoRef.current) {
      if (localCameraTrack) {
        localCameraTrack
          .setEnabled(cameraOn)
          .catch(() => console.warn("There is an error while enabling the camera track."));

        if (cameraOn) {
          localCameraTrack.play(localVideoRef.current);
        } else {
          console.log("STOPPPPPP");
          console.log(localCameraTrack);
          localCameraTrack.stop();
        }
      }
    }
    //   todo: handle unmount component
  }, [cameraOn, localCameraTrack]);

  useEffect(() => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack
        .setEnabled(micOn)
        .catch(() => console.warn("There is an error while enabling the microphone track."));

      if (micOn) {
        localMicrophoneTrack.play();
      } else {
        localMicrophoneTrack.stop();
      }
    }
    //   todo: handle unmount component
  }, [micOn, localMicrophoneTrack]);

  return (
    <div className={styles.roomContainer}>
      <h1>Room</h1>
      <div className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <VideoContainer ref={remoteVideoRef} />
          <VideoContainer ref={localVideoRef} />
        </div>
        <MediaController
          micOn={micOn}
          cameraOn={cameraOn}
          setCameraOn={setCameraOn}
          setMicOn={setMicOn}
          onLeave={() => handleLeaveTheRoom()}
        />
      </div>
    </div>
  );
}
