import styles from "./media-controllers.module.css";

import { useState } from "react";

export default function MediaControllers({
  calling,
  cameraOn,
  micOn,
  setCalling,
  setCamera,
  setMic,
}) {
  return <div className={styles.mediaControllerContainer}></div>;
}
