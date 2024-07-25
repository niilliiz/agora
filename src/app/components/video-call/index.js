import styles from "./video-call.module.css";
import { useState } from "react";
import { useIsConnected, useJoin } from "agora-rtc-react";
import { appConfig } from "@/utils/app-config";
import Room from "@/app/components/room";
import Preview from "@/app/components/preview";

export default function VideoCall() {
  const [isCalling, setIsCalling] = useState(false);

  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  function handleJoinButtonClicked() {
    setIsCalling(true);
  }

  function handleLeaveButtonClicked() {
    setIsCalling(false);
  }

  // this is the way to join the room
  const { data, isLoading, isConnected, error } = useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    isCalling,
  );
  console.log("isConnected Preview", isConnected);

  return (
    <div className={styles.videoCallContainer}>
      {!isCalling ? (
        <Preview onJoin={() => handleJoinButtonClicked()} />
      ) : (
        <Room
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={() => setMicOn(prevMic => !prevMic)}
          setCameraOn={() => setCameraOn(prevCamera => !prevCamera)}
          onLeave={() => handleLeaveButtonClicked()}
        />
      )}
    </div>
  );
}

/*
 * todo
 *  1-handle loading here
 * 2-handle error here
 *
 *  */
