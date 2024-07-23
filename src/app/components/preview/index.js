// noinspection JSIgnoredPromiseFromCall

import MediaControllers from "@/app/components/media-controllers";
import styles from "./preview.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import useMediaPermissions from "@/hooks/useMediaPermissions";
import PermissionDescription from "@/app/components/permission-description";
import AgoraService from "@/utils/agora-service";
import { appConfig } from "@/utils/app-config";

const agoraService = new AgoraService();

export default function PreviewPage() {
  const videoContainerRef = useRef(null);

  const [remoteUserJoined, setRemoteUserJoined] = useState(false);

  let isInitialRenderRef = useRef(true);

  console.log(agoraService.remoteUser);

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

  const canJoin = micOn || cameraOn;

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

  async function handleJoinTheChannel() {
    try {
      console.log("join");
      await agoraService.join(appConfig.appId, appConfig.channel, appConfig.token);
      setCalling(a => !a);
    } catch (e) {
      console.error("Failed to join the channel");
    }
  }

  // function handleFetchUser() {
  //   fetch("http://localhost:5000/api/agora-channel?channelName=First")
  //     .then(response => {
  //       if (!response.ok) {
  //         return response.text().then(text => {
  //           throw new Error(text);
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       setRemoteUserJoined(data?.users.length > 0);
  //     })
  //     .catch(error => console.error("Error fetching channel users:", error.message));
  // }
  //
  // console.log(remoteUserJoined);

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

      agoraService.initialize(appConfig.appId);

      // Set the remote user update listener
      agoraService.setRemoteUserUpdateListener(setRemoteUserJoined);

      //todo: Fetch channel user status from backend
      // handleFetchUser();
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
          disabled={!canJoin}
          setCalling={() => handleJoinTheChannel()}
          setCameraOn={() => handleCameraToggle()}
          setMicOn={() => handleMicToggle()}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          {(cameraPermissionError || micPermissionError) && <PermissionDescription />}
          <div className={styles.info}>
            {remoteUserJoined
              ? "A remote user has joined the room"
              : "No remote users in the room yet"}
          </div>
          {cameraOn && micOn ? "All set to join the call" : "Please enable camera and microphone"}
        </div>
        {/*<button onClick={handleJoinTheChannel} disabled={!canJoin} className={styles.join}>*/}
        {/*  join*/}
        {/*</button>*/}
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
