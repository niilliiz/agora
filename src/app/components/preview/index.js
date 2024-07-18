import MediaControllers from "@/app/components/media-controllers";
import styles from "./preview.module.css";
import { useEffect, useRef, useState } from "react";
import AgoraRTC, { useLocalCameraTrack, useLocalMicrophoneTrack } from "agora-rtc-react";
import { createMicrophoneAndCameraTracks } from "agora-rtc-sdk-ng/esm";

// const [microphoneTrack, cameraTrack] = AgoraRTC.createMicrophoneAndCameraTracks();

export default function Preview() {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [localTracks, setLocalTracks] = useState([]);

  const videoContainerRef = useRef(null);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { localCameraTrack } = useLocalCameraTrack();

  // const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks().then(res => {
    console.dir(res);
    const [microphoneTrack, cameraTrack] = res;
    cameraTrack.play(videoContainerRef.current);
  });

  console.log("useMicAndCame", useMicrophoneAndCameraTracks);

  // async function handlePermissions() {
  //   try {
  //     const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
  //     cameraTrack.play(videoContainerRef.current);
  //     setLocalTracks([microphoneTrack, cameraTrack]);
  //     console.log("mic", microphoneTrack);
  //     console.log("cam", cameraTrack);
  //   } catch (e) {
  //     console.log("has error while getting permission");
  //   }
  // }

  // useEffect(() => {
  //   console.log("here");
  //   // get permission from user when comes to the preview page
  //   handlePermissions();
  //
  //   return () => {
  //     if (localTracks.length) {
  //       localTracks.forEach(track => track.close());
  //     }
  //   };
  // }, []);

  return (
    <div className={styles.previewContainer}>
      <div className={styles.videoContainer}>
        <div className={styles.localVideoContainer} ref={videoContainerRef}></div>
        <MediaControllers />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}></div>
        <button className={styles.join}></button>
      </div>
    </div>
  );
}
