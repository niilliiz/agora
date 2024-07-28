import styles from "./media-controller.module.css";
import { forwardRef, useEffect } from "react";

function MediaController(
  {
    className = "",
    micOn,
    cameraOn,
    setMicOn,
    setCameraOn,
    localTracks,
    onLeave,
    onVolumeChange,
    onOpenMoreInfo,
    onOpenNotepad,
  },
  ref,
) {
  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  useEffect(() => {
    if (ref.current) {
      if (localCameraTrack) {
        localCameraTrack
          .setEnabled(cameraOn)
          .catch(() => console.warn("There is an error while enabling the camera track."));

        if (cameraOn) {
          localCameraTrack.play(ref.current);
        } else {
          console.log("STOPPPPPP");
          localCameraTrack.stop();
        }
      }
    }
    //   todo: handle unmount component
  }, [cameraOn, localCameraTrack]);

  useEffect(() => {
    if (localMicrophoneTrack) {
      localMicrophoneTrack
        .setEnabled(micOn)
        .catch(() => console.warn("There is an error while enabling the microphone track."));

      if (micOn) {
        localMicrophoneTrack.play();
      } else {
        localMicrophoneTrack.stop();
      }
    }
    //   todo: handle unmount component
    return () => console.log("unmount camera");
  }, [micOn, localMicrophoneTrack]);

  return (
    <div className={`${styles.mediaControllerContainer} ${className}`}>
      {onOpenNotepad && <button onClick={() => onOpenNotepad()}>notepad</button>}
      {onOpenMoreInfo && <button onClick={() => onOpenMoreInfo()}>option</button>}
      <button onClick={setMicOn}>{micOn ? "mute" : "unmute"}</button>
      <button onClick={setCameraOn}>{cameraOn ? "cam on" : "cam off"}</button>
      {onVolumeChange && <button onClick={() => onVolumeChange()}>volume</button>}
      {onLeave && <button onClick={() => onLeave()}>LEAVE</button>}
    </div>
  );
}

export default forwardRef(MediaController);
