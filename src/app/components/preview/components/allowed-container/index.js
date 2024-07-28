// noinspection JSIgnoredPromiseFromCall

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./allowed-container.module.css";
import VideoContainer from "@/app/components/video-container";
import MediaController from "@/app/components/media-controller";
import { createMicrophoneAndCameraTracks } from "agora-rtc-sdk-ng/esm";

function AllowedContainer({
  hasPermission,
  setHasPermission,
  onJoin,
  micOn,
  setMicOn,
  cameraOn,
  setCameraOn,
}) {
  let isInitialRenderRef = useRef(true);
  const videoContainerRef = useRef(null);

  const [localTracks, setLocalTracks] = useState({
    localCameraTrack: null,
    localMicrophoneTrack: null,
  });

  async function requestCameraAndMicrophonePermission() {
    // todo: we force user to give permission for both medias, if we want to force them just to give for the one of them, we can use createCameraVideoTrack or createMicrophoneAudioTrack separately
    try {
      const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();
      setLocalTracks(prevLocal => ({
        ...prevLocal,
        localCameraTrack: cameraTrack,
        localMicrophoneTrack: microphoneTrack,
      }));
      setCameraOn(true);
      setMicOn(true);
      if (cameraTrack) {
        cameraTrack.play(videoContainerRef.current);
      }

      if (microphoneTrack) {
        microphoneTrack.play();
      }
      setHasPermission(true);
    } catch (e) {
      setHasPermission(false);
      console.log(e, "User didn't give permission to both MICROPHONE or CAMERA");
    }
  }

  useEffect(() => {
    if (videoContainerRef.current && isInitialRenderRef.current) {
      // Prevent from rendering the video element twice in DOM
      isInitialRenderRef.current = false;

      requestCameraAndMicrophonePermission();
    }
  }, []);

  return (
    <div className={styles.allowedContainer}>
      <div className={styles.mediaContainer}>
        <VideoContainer ref={videoContainerRef} />
        <MediaController
          ref={videoContainerRef}
          micOn={micOn}
          cameraOn={cameraOn}
          setCameraOn={setCameraOn}
          setMicOn={setMicOn}
          localTracks={localTracks}
        />
      </div>
      <div className={styles.infoContainer}>
        <button disabled={!hasPermission} onClick={() => onJoin()}>
          JOIN
        </button>
      </div>
    </div>
  );
}

export default AllowedContainer;
