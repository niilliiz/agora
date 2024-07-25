import styles from "./preview.module.css";
import { useState } from "react";
import { useIsConnected, useJoin } from "agora-rtc-react";
import { appConfig } from "@/utils/app-config";
import Room from "@/app/components/room";

export default function Preview() {
  const isConnected = useIsConnected();
  console.log("isConnected Preview", isConnected);

  const [isCalling, setIsCalling] = useState(false);

  function handleJoinButtonClicked() {
    setIsCalling(true);
  }

  function handleLeaveButtonClicked() {
    setIsCalling(false);
  }

  // this is the way to join the room
  useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    isCalling,
  );

  return (
    <div className={styles.previewContainer}>
      {!isCalling ? (
        <>
          <h1>Preview</h1>
          <button onClick={() => handleJoinButtonClicked()}>JOIN</button>
        </>
      ) : (
        <Room onLeave={() => handleLeaveButtonClicked()} />
      )}
    </div>
  );
}
