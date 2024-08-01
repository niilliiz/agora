import styles from "./local-video-container.module.css";
import { LocalAudioTrack, LocalVideoTrack } from "agora-rtc-react";
import CameraOffContainer from "@/app/components/camera-off";
import UserState from "@/app/components/room/components/user-state";

export default function LocalVideoContainer({
  cameraOn,
  micOn,
  localCameraTrack,
  localMicrophoneTrack,
}) {
  return (
    <div className={styles.localVideoContainer}>
      <CameraOffContainer />
      <UserState name="local" micOn={micOn} />
      <LocalVideoTrack track={localCameraTrack} play={cameraOn} disabled={!cameraOn} />
      <LocalAudioTrack track={localMicrophoneTrack} play={micOn} disabled={!micOn} />
    </div>
  );
}
