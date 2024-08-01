import styles from "./local-video-container.module.css";
import { LocalAudioTrack, LocalVideoTrack, usePublish } from "agora-rtc-react";

export default function LocalVideoContainer({
  cameraOn,
  micOn,
  localCameraTrack,
  localMicrophoneTrack,
}) {
  return (
    <div className={styles.localVideoContainer}>
      <LocalVideoTrack track={localCameraTrack} play={cameraOn} disabled={!cameraOn} />
      <LocalAudioTrack track={localMicrophoneTrack} play={micOn} disabled={!micOn} />
    </div>
  );
}
