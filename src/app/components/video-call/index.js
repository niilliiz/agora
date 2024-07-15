"use client";

import styles from "./video-call.module.css";

import { useState } from "react";
import MediaControllers from "@/app/components/media-controllers";

export default function VideoCall() {
  const [calling, setCalling] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

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
