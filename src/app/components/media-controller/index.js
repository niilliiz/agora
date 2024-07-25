import styles from "./media-controller.module.css";

export default function MediaController({ micOn, cameraOn, setMicOn, setCameraOn, onLeave }) {
  return (
    <div className={styles.mediaControllerContainer}>
      <button onClick={() => setMicOn(prev => !prev)}>{micOn ? "mute" : "unmute"}</button>
      <button onClick={() => setCameraOn(prev => !prev)}>{cameraOn ? "cam on" : "cam off"}</button>
      <button onClick={() => onLeave()}>LEAVE</button>
    </div>
  );
}
