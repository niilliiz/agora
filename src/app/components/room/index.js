import styles from "./room.module.css";
import { useIsConnected } from "agora-rtc-react";
import MediaController from "@/app/components/media-controller";

export default function Room({ micOn, cameraOn, setMicOn, setCameraOn, onLeave }) {
  const isConnected = useIsConnected();
  console.log("isConnected Room", isConnected);

  function handleLeaveTheRoom() {
    console.log("leave the room");
    onLeave();
  }

  return (
    <div className={styles.roomContainer}>
      <h1>Room</h1>
      <div className={styles.videoContainer}>
        <div>videos remote or local</div>
        <MediaController
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={setMicOn}
          setCameraOn={setCameraOn}
          onLeave={() => handleLeaveTheRoom()}
        />
      </div>
    </div>
  );
}
