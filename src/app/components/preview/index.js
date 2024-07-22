import MediaControllers from "@/app/components/media-controllers";
import styles from "./preview.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import AgoraRTC, { useJoin, useLocalCameraTrack, useLocalMicrophoneTrack } from "agora-rtc-react";
import { appConfig } from "@/utils/app-config";
import { createCameraVideoTrack, createMicrophoneAudioTrack } from "agora-rtc-sdk-ng/esm";
import useMediaPermissions from "@/utils/useMediaPermissions";

export default function PreviewPage() {
  const videoContainerRef = useRef(null);

  let isInitialRenderRef = useRef(true);

  const [calling, setCalling] = useState(false);
  const {
    cameraOn,
    micOn,
    localTracks,
    requestCameraPermission,
    requestMicPermission,
    clearTracks,
    checkCameraPermission,
    checkMicPermission,
    setCameraOn,
    setMicOn,
    permissionError,
  } = useMediaPermissions();

  const { cameraPermissionError, micPermissionError } = permissionError;

  const { cameraLocalTrack } = localTracks;

  async function handleCameraToggle() {
    if (!cameraOn) {
      //   we must know if user has given a permission or not
      const cameraPermissionState = await checkCameraPermission();
      if (cameraPermissionState !== "granted") {
        const cameraTrack = await requestCameraPermission();
        if (cameraTrack) {
          if (videoContainerRef.current) {
            cameraTrack.play(videoContainerRef.current);
          }
        }
      } else {
        const cameraTrack = await requestCameraPermission();
        if (cameraTrack) {
          if (videoContainerRef.current) {
            cameraTrack.play(videoContainerRef.current);
          }
        }
      }
    } else {
      //   the user has already given a permission
      // todo: check the original app to see how they handle turning off the camera
      setCameraOn(false);
      if (cameraLocalTrack) {
        cameraLocalTrack.close();
      }
    }
  }

  // handle pending state
  async function handleMicToggle() {
    if (!micOn) {
      const micPermissionState = await checkMicPermission();
      if (micPermissionState !== "granted") {
        await requestMicPermission();
      } else {
        const cameraTrack = await requestMicPermission();
        if (cameraTrack) {
          if (videoContainerRef.current) {
            cameraTrack.play(videoContainerRef.current);
          }
        }
      }
    } else {
      setMicOn(false);
      if (localTracks.microphoneLocalTrack) {
        localTracks.microphoneLocalTrack.close();
      }
    }
  }

  useEffect(() => {
    if (videoContainerRef.current && isInitialRenderRef.current) {
      // Prevent from rendering the video element twice in DOM
      isInitialRenderRef.current = false;

      // Request permissions initially
      requestCameraPermission().then(cameraTrack => {
        if (cameraTrack) {
          cameraTrack.play(videoContainerRef.current);
        }
      });

      requestMicPermission();
    }

    // todo: sure about this code snippet, it's just c&p from chatgpt
    return () => {
      clearTracks();
    };
  }, []);

  return (
    <div className={styles.previewContainer}>
      <div className={styles.videoContainer}>
        <div className={styles.localVideoContainer} ref={videoContainerRef}></div>
        <MediaControllers
          calling={calling}
          cameraOn={cameraOn}
          micOn={micOn}
          setCalling={() => {
            setCalling(a => !a);
          }}
          setCameraOn={() => handleCameraToggle()}
          setMicOn={() => handleMicToggle()}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          {cameraPermissionError && `Please enable ${cameraPermissionError} permission`}
          {micPermissionError && `Please enable ${micPermissionError} permission`}
          {cameraOn && micOn ? "All set to join the call" : "Please enable camera and microphone"}
        </div>
        <button className={styles.join}></button>
      </div>
    </div>
  );
}

// 1 - get the name of channel, so we would know where we should join
// 2- get the token and other stuff
// 3- know if there is remote user
// 4- get the corresponding permission if they want to turn on the camera or microphone -> follow the flow of turning on or off the track ---> make a
//   component for camera and microphone so manage all its state there
// 5- manage the users
// 6- users should join to the room with their chosen state
// 7- just imagine the user didn't give permission to one of the track-> so every time we click on mic or camera button to toggle them, if there is a track so we would know they've already given a permission, if not,
//    we should ask them to give permission again.
// 8- use useMemo or useCallback and memo for components performance-wise and avoid re-rendering
