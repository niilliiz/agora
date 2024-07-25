import { useEffect, useMemo, useRef, useState } from "react";
import AgoraRTC, {
  useCurrentUID,
  useIsConnected,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";
import { fakeAvatar, fakeName } from "@/utils/fake";
import styles from "@/app/components/preview-old/preview-old.module.css";

export default function Room({ properties: { micOn, cameraOn } }) {
  const isConnected = useIsConnected();
  const videoContainerRef = useRef(null);

  const selfPublished = micOn || cameraOn;

  console.log("isConnected", isConnected);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  console.log(localCameraTrack, "cameraTrack");

  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    if (videoContainerRef.current && localCameraTrack) {
      console.log("here");
      localCameraTrack.play(videoContainerRef.current);
    }
  }, [localCameraTrack]);

  return (
    <div>
      <div className={styles.localVideoContainer} ref={videoContainerRef}></div>
      is calling
    </div>
  );
}
