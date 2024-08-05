import styles from "./room.module.css";

import { useIsConnected, usePublish, useRTCClient } from "agora-rtc-react";
import MediaController from "@/app/components/media-controller";
import { useEffect } from "react";
import Container from "@/app/components/layout-components/container";
import RemoteVideoContainer from "@/app/components/room/components/remote-video-container";
import LocalVideoContainer from "@/app/components/room/components/local-video-container";
import Timer from "@/app/components/timer";

export default function Room({ micOn, cameraOn, setMicOn, setCameraOn, onLeave, localTracks }) {
  const isConnected = useIsConnected();
  const client = useRTCClient();

  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  usePublish([localMicrophoneTrack, localCameraTrack]);

  function handleLeaveTheRoom() {
    onLeave();
  }

  useEffect(() => {
    async function handleTracks() {
      try {
        await client.publish([localCameraTrack, localMicrophoneTrack]);
      } catch (error) {
        console.error(error, "while publishing track");
      }
    }

    if (isConnected && client) {
      handleTracks();
    }
  }, [isConnected, client, localCameraTrack, localMicrophoneTrack]);

  return (
    <Container className={styles.container}>
      <div className={styles.roomContainer}>
        <div className={styles.videosWrapper}>
          {isConnected && (
            <>
              <Timer
                className={styles.shortScreenTimer}
                autoStart={isConnected}
                remoteData="Remote Name"
              />
              <RemoteVideoContainer />

              <LocalVideoContainer
                cameraOn={cameraOn}
                micOn={micOn}
                localCameraTrack={localCameraTrack}
                localMicrophoneTrack={localMicrophoneTrack}
              />
            </>
          )}
        </div>

        <MediaController
          isJoined
          micOn={micOn}
          cameraOn={cameraOn}
          setCameraOn={setCameraOn}
          setMicOn={setMicOn}
          onLeave={() => handleLeaveTheRoom()}
        />
      </div>
    </Container>
  );
}

//https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#publish

// todo:

// 1- handle koni k aya remote
