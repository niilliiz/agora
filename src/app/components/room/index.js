import styles from "./room.module.css";

import { useCurrentUID, useIsConnected, usePublish, useRTCClient } from "agora-rtc-react";
import MediaController from "@/app/components/media-controller";
import { useCallback, useEffect, useState } from "react";
import Container from "@/app/components/layout-components/container";
import RemoteVideoContainer from "@/app/components/room/components/remote-video-container";
import LocalVideoContainer from "@/app/components/room/components/local-video-container";
import Timer from "@/app/components/timer";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Limited_Second } from "@/utils/static-values";
import EndNoticeModal from "@/app/components/end-notice-modal";
import LeavingSoonErrorModal from "@/app/components/leaving-soon-error-modal";

const startTime = 1722881194378;
const User_Role = "doctor";

export default function Room({ micOn, cameraOn, setMicOn, setCameraOn, onLeave, localTracks }) {
  const [isLeavingSoonErrorModal, setIsLeavingSoonErrorModal] = useState(false);
  const [isOpenNoticeModal, setIsOpenNoticeModal] = useState(false);

  const isConnected = useIsConnected();
  const client = useRTCClient();

  const uid = useCurrentUID();

  console.log(uid, "uid");

  const [width] = useWindowWidth();

  const handleCloseLeavingSoonErrorModal = useCallback(() => setIsLeavingSoonErrorModal(false), []);

  function handleOpenLeavingSoonErrorModal() {
    setIsLeavingSoonErrorModal(true);
  }

  const handleCloseEndNoticeModal = useCallback(() => setIsOpenNoticeModal(false), []);

  function handleOpenEndNoticeModal() {
    setIsOpenNoticeModal(true);
  }

  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  usePublish([localMicrophoneTrack, localCameraTrack]);

  function handleLeaveTheRoom() {
    const startTime = 1722886140;

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeDifference = currentTime - startTime;

    if (timeDifference < Limited_Second) {
      handleOpenLeavingSoonErrorModal();
    } else {
      if (User_Role === "doctor") {
        handleOpenEndNoticeModal();
      } else {
        window.location.href = "https://nexu.co";
        onLeave();
      }
    }
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
    <>
      <Container className={styles.container}>
        <div className={styles.roomContainer}>
          <div className={styles.videosWrapper}>
            {isConnected && (
              <>
                {width <= 600 && (
                  <Timer
                    className={styles.shortScreenTimer}
                    autoStart={isConnected}
                    remoteData="Remote Name"
                  />
                )}
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
      <EndNoticeModal isOpen={isOpenNoticeModal} onClose={() => handleCloseEndNoticeModal()} />
      <LeavingSoonErrorModal
        isOpen={isLeavingSoonErrorModal}
        onClose={() => handleCloseLeavingSoonErrorModal()}
      />
    </>
  );
}

//https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#publish

// todo:

// 1- handle koni k aya remote
