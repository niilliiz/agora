import styles from "./room.module.css";

import AgoraRTC, {
  LocalAudioTrack,
  LocalVideoTrack,
  useIsConnected,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
  useRTCClient,
} from "agora-rtc-react";
import MediaController from "@/app/components/media-controller";
import { useEffect, useRef } from "react";
import VideoContainer from "@/app/components/video-container";

export default function Room({ micOn, cameraOn, setMicOn, setCameraOn, onLeave, localTracks }) {
  const remoteVideoRef = useRef(null);

  const isConnected = useIsConnected();
  const client = useRTCClient();

  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  usePublish([localMicrophoneTrack, localCameraTrack]);

  function handleLeaveTheRoom() {
    onLeave();
  }

  const remoteUsers = useRemoteUsers();
  const remoteCameraOn = remoteUsers.filter(user => user.hasVideo);
  const remoteMicOn = remoteUsers.filter(user => user.hasAudio);
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  console.log(remoteCameraOn, "reCam");
  console.log(remoteMicOn, "reMic");

  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);
  remoteMicrophoneTracks.map(track => track.play());

  async function handleTracks() {
    console.log("here");
    try {
      await client.publish([localCameraTrack, localMicrophoneTrack]);
    } catch (error) {
      console.error(error, "while handle track");
    }
  }

  useEffect(() => {
    if (isConnected && client) {
      handleTracks();
    }
  }, [isConnected, client, localCameraTrack, localMicrophoneTrack]);

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
        {isConnected && (
          <div className={styles.videoWrapper}>
            <VideoContainer ref={remoteVideoRef} />
            <LocalVideoTrack track={localCameraTrack} play={cameraOn} disabled={!cameraOn} />
            <LocalAudioTrack track={localMicrophoneTrack} play={micOn} disabled={!micOn} />
          </div>
        )}

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

//https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#publish
