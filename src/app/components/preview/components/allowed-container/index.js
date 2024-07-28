// noinspection JSIgnoredPromiseFromCall

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./allowed-container.module.css";
import VideoContainer from "@/app/components/video-container";
import MediaController from "@/app/components/media-controller";
import AgoraRTC from "agora-rtc-react";

function AllowedContainer({
  hasPermission,
  setHasPermission,
  onJoin,
  micOn,
  setMicOn,
  cameraOn,
  setCameraOn,
  localTracks,
  setLocalTracks,
}) {
  let isInitialRenderRef = useRef(true);
  const videoContainerRef = useRef(null);

  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  async function requestCameraAndMicrophonePermission() {
    // todo: we force user to give permission for both medias, if we want to force them just to give for the one of them, we can use createCameraVideoTrack or createMicrophoneAudioTrack separately
    try {
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
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

  useEffect(() => {
    if (videoContainerRef.current) {
      if (localCameraTrack) {
        localCameraTrack
          .setEnabled(cameraOn)
          .catch(() => console.warn("There is an error while enabling the camera track."));

        if (cameraOn) {
          localCameraTrack.play(videoContainerRef.current);
        } else {
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
