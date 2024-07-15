import styles from "./media-controllers.module.css";

import { useState } from "react";

export default function MediaControllers({
  calling,
  cameraOn,
  micOn,
  setCalling,
  setCameraOn,
  setMicOn,
}) {
  return (
    <div className={styles.mediaControllerContainer}>
      <div className={styles.controllersContainer}>
        <button className={styles.controllerButton} onClick={() => setMicOn()}>
          {micOn ? "🎤" : "🔇"}
        </button>

        <button className={styles.controllerButton} onClick={() => setCameraOn()}>
          {cameraOn ? "📷" : "🚫"}
        </button>
      </div>
      <div className={styles.callContainer}>
        <button className={styles.controllerButton} onClick={() => setCalling()}>
          {calling ? "🔴" : "🟢"}
        </button>
      </div>
    </div>
  );
}
