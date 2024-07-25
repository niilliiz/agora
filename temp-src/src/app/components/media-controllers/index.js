import styles from "./media-controllers.module.css";

import { useState } from "react";

export default function MediaControllers({
  calling,
  cameraOn,
  micOn,
  setCalling,
  setCameraOn,
  setMicOn,
  disabled,
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
        <button
          disabled={disabled}
          className={styles.controllerButton}
          onClick={() => setCalling()}
        >
          {disabled ? "-" : calling ? "leave" : "join"}
        </button>
      </div>
    </div>
  );
}
