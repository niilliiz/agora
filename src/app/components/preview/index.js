import MediaControllers from "@/app/components/media-controllers";
import styles from "./preview.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import AgoraRTC, { useJoin, useLocalCameraTrack, useLocalMicrophoneTrack } from "agora-rtc-react";
import { appConfig } from "@/utils/app-config";
import { createCameraVideoTrack, createMicrophoneAudioTrack } from "agora-rtc-sdk-ng/esm";

export default function PreviewPage() {
  const videoContainerRef = useRef(null);

  let isInitialRenderRef = useRef(true);

  const [calling, setCalling] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const [localTracks, setLocalTracks] = useState({
    cameraLocalTrack: null,
    microphoneLocalTrack: null,
  });

  const { cameraLocalTrack, microphoneLocalTrack } = localTracks;

  useEffect(() => {
    if (videoContainerRef.current && isInitialRenderRef.current) {
      // prevent from rendering the video element twice in DOM
      isInitialRenderRef.current = false;

      // get camera permission
      createCameraVideoTrack()
        .then(cameraTrack => {
          setLocalTracks(prev => ({
            ...prev,
            cameraLocalTrack: cameraTrack,
          }));

          setCameraOn(true);
          cameraTrack.play(videoContainerRef.current);
        })
        .catch(e => {
          console.log(e, "User didn't give permission to access CAMERA");
          setCameraOn(false);
        });

      // get microphone permission
      createMicrophoneAudioTrack()
        .then(microphoneTrack => {
          setMicOn(true);
          setLocalTracks(prev => ({
            ...prev,
            microphoneLocalTrack: microphoneTrack,
          }));
        })
        .catch(e => {
          console.log(e, "User didn't give permission to access MICROPHONE");
          setMicOn(false);
        });
    }

    // todo: sure about this code snippet, it's just c&p from chatgpt
    return () => {
      cameraLocalTrack && cameraLocalTrack.close();
      microphoneLocalTrack && microphoneLocalTrack.close();
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
          setCameraOn={() => {
            setCameraOn(a => !a);
          }}
          setMicOn={() => {
            setMicOn(a => !a);
          }}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
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
