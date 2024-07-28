// noinspection JSIgnoredPromiseFromCall

import styles from "./preview.module.css";
import { useEffect, useRef, useState } from "react";
import { createCameraVideoTrack, createMicrophoneAndCameraTracks } from "agora-rtc-sdk-ng/esm";
import NotAllowedContainer from "@/app/components/preview/components/not-allowed-container";
import AllowedContainer from "@/app/components/preview/components/allowed-container";

export default function Preview({ onJoin }) {
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const [localTracks, setLocalTracks] = useState({
    cameraLocalTrack: null,
    microphoneLocalTrack: null,
  });

  const hasPermission = Object.values(localTracks).every(track => track !== null);

  const videoContainerRef = useRef(null);

  async function requestCameraPermission() {
    // todo: we force user to give permission for both medias, if we want to force them just to give for the one of them, we can use createCameraVideoTrack or createMicrophoneAudioTrack separately
    try {
      const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();
      setLocalTracks(prevLocal => ({
        ...prevLocal,
        cameraLocalTrack: cameraTrack,
        microphoneLocalTrack: microphoneTrack,
      }));
      setCameraOn(true);
      setMicOn(true);
    } catch (e) {
      console.log(e, "User didn't give permission to either MICROPHONE or CAMERA");
    }
  }

  useEffect(() => {
    if (videoContainerRef.current) {
      requestCameraPermission();
    }
  }, []);

  return (
    <div className={styles.previewContainer}>
      <AllowedContainer ref={videoContainerRef} onJoin={onJoin} hasPermission={hasPermission} />
      {!hasPermission && <NotAllowedContainer />}
    </div>
  );
}

/*
 *  -> check if camera permission is granted
 * -> if is granted redirect to the info page
 * -> if is not granted, show the modal
 * */
