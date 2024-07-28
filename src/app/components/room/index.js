import styles from "./room.module.css";

import AgoraRTC, {
  LocalAudioTrack,
  LocalVideoTrack,
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
import { useEffect, useMemo, useRef, useState } from "react";
import VideoContainer from "@/app/components/video-container";
import { useAwaited } from "@/utils/tools";
import { log } from "next/dist/server/typescript/utils";

export default function Room({
  micOn,
  cameraOn,
  setMicOn,
  setCameraOn,
  onLeave,
  localTracks,
  setLocalTracks,
}) {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  const isConnected = useIsConnected();
  const client = useRTCClient();

  // const [localTracks, setLocalTracks] = useState({
  //   localCameraTrack: {},
  //   localMicrophoneTrack: {},
  // });
  //
  // useEffect(() => {
  //   if (isConnected && client) {
  //     AgoraRTC.createMicrophoneAndCameraTracks().then(response => {
  //       const [micTrack, camTrack] = response;
  //       setLocalTracks({ localMicrophoneTrack: micTrack, localCameraTrack: camTrack });
  //       client.publish(response);
  //     });
  //   }
  // }, [client, isConnected]);

  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  usePublish([localMicrophoneTrack, localCameraTrack]);

  async function handleTracks() {
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
  }, [isConnected, client, localCameraTrack, localMicrophoneTrack, cameraOn, micOn]);

  function handleLeaveTheRoom() {
    onLeave();
  }

  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);
  remoteMicrophoneTracks.map(track => track.play());

  useEffect(() => {
    if (remoteCameraTracks.length > 0 && remoteVideoRef.current) {
      remoteCameraTracks.map(track => track.play(remoteVideoRef.current));
    }
    //   todo: handle unmount component
  }, [remoteCameraTracks.length]);

  // useEffect(() => {
  //   if (localCameraTrack && cameraOn != null) {
  //     localCameraTrack.setEnabled(cameraOn).catch(console.warn);
  //   }
  // }, [cameraOn, localCameraTrack]);
  //
  // useEffect(() => {
  //   if (localCameraTrack) {
  //     if (localVideoRef.current && cameraOn) {
  //       localCameraTrack.play(localVideoRef.current, undefined);
  //     } else {
  //       console.log("stop");
  //       localCameraTrack.stop();
  //     }
  //   }
  // }, [localCameraTrack, div, cameraOn]);

  // useEffect(() => {
  //   if (div) {
  //     if (localCameraTrack) {
  //       localCameraTrack
  //         .setEnabled(cameraOn)
  //         .catch(() => console.warn("There is an error while enabling the camera track."));
  //
  //       if (cameraOn) {
  //         localCameraTrack.play(localVideoRef.current);
  //       } else {
  //         localCameraTrack.stop();
  //       }
  //     }
  //   }
  //   //   todo: handle unmount component
  // }, [cameraOn, localCameraTrack, client]);

  // useEffect(() => {
  //   if (localMicrophoneTrack) {
  //     localMicrophoneTrack
  //       .setEnabled(micOn)
  //       .catch(() => console.warn("There is an error while enabling the microphone track."));
  //
  //     if (micOn) {
  //       localMicrophoneTrack.play();
  //     } else {
  //       localMicrophoneTrack.stop();
  //     }
  //   }
  //   //   todo: handle unmount component
  // }, [micOn, localMicrophoneTrack]);

  // const camTrack = useAwaited(localCameraTrack);
  // const audTrack = useAwaited(localMicrophoneTrack);

  return (
    <div className={styles.roomContainer}>
      <h1>Room</h1>
      <div className={styles.videoContainer}>
        {isConnected && (
          <div className={styles.videoWrapper}>
            <VideoContainer ref={remoteVideoRef} />
            {/*<VideoContainer ref={localVideoRef} />*/}
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
