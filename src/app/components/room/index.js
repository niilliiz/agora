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

export default function Room({ micOn, cameraOn, setMicOn, setCameraOn, onLeave, localTracks }) {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  const isConnected = useIsConnected();

  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  function handleLeaveTheRoom() {
    onLeave();
  }

  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);
  remoteMicrophoneTracks.map(track => track.play());

  // const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  // const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const client = useRTCClient();
  useMemo(() => {
    if (client) {
      client.publish([localMicrophoneTrack, localCameraTrack]);
    }
  }, [micOn, cameraOn, client, localMicrophoneTrack, localCameraTrack]);

  useEffect(() => {
    if (remoteCameraTracks.length > 0 && remoteVideoRef.current) {
      remoteCameraTracks.map(track => track.play(remoteVideoRef.current));
    }
    //   todo: handle unmount component
  }, [remoteCameraTracks.length]);

  return (
    <div className={styles.roomContainer}>
      <h1>Room</h1>
      <div className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <VideoContainer ref={remoteVideoRef} />
          <VideoContainer ref={localVideoRef} />
        </div>
        <MediaController
          ref={localVideoRef}
          micOn={micOn}
          cameraOn={cameraOn}
          setCameraOn={setCameraOn}
          setMicOn={setMicOn}
          localTracks={localTracks}
          onLeave={() => handleLeaveTheRoom()}
        />
      </div>
    </div>
  );
}
