import styles from "./room.module.css";
import { useIsConnected } from "agora-rtc-react";

export default function Room({ onLeave }) {
  const isConnected = useIsConnected();
  console.log("isConnected Room", isConnected);

  function handleLeaveTheRoom() {
    console.log("leave the room");
    onLeave();
  }
  return (
    <div className={styles.roomContainer}>
      <h1>Room</h1>
      <button onClick={() => handleLeaveTheRoom()}>LEAVE</button>
    </div>
  );
}
