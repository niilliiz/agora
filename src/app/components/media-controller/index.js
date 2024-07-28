import styles from "./media-controller.module.css";

export default function MediaController({
  className = "",
  micOn,
  cameraOn,
  setMicOn,
  setCameraOn,
  onLeave,
  onVolumeChange,
  onOpenMoreInfo,
  onOpenNotepad,
}) {
  return (
    <div className={`${styles.mediaControllerContainer} ${className}`}>
      {onOpenNotepad && <button onClick={() => onOpenNotepad()}>notepad</button>}
      {onOpenMoreInfo && <button onClick={() => onOpenMoreInfo()}>option</button>}
      <button onClick={() => setMicOn(prev => !prev)}>{micOn ? "mute" : "unmute"}</button>
      <button onClick={() => setCameraOn(prev => !prev)}>{cameraOn ? "cam on" : "cam off"}</button>
      {onVolumeChange && <button onClick={() => onVolumeChange()}>volume</button>}
      {onLeave && <button onClick={() => onLeave()}>LEAVE</button>}
    </div>
  );
}
