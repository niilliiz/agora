import { useState } from "react";
import { useJoin } from "agora-rtc-react";

import MediaControllers from "@/app/components/media-controllers";

import { appConfig } from "@/utils/app-config";

import styles from "./video-call.module.css";
import Client from "@/app/components/client";

export default function VideoCall() {
  const [calling, setCalling] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const { data, isLoading, isConnected, error } = useJoin(
    { appid: appConfig.appId, channel: appConfig.channel, token: appConfig.token },
    calling,
  );

  console.log("data", data);
  console.log("isLoading", isLoading);
  console.log("isConnected", isConnected);
  console.log("error", error);

  return (
    <div className={styles.videoCallContainer}>
      <div>video call</div>
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
  );
}
