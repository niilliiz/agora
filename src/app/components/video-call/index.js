import styles from "./video-call.module.css";
import { useState } from "react";
import { useJoin } from "agora-rtc-react";
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

  // todo: u can handle the error here - if there is error - if it's not connected
  // this is the way to join the room
  const { data, isLoading, isConnected, error } = useJoin(
    {
      appid: appConfig.appId,
      channel: appConfig.channel,
      token: appConfig.token,
    },
    isCalling,
  );

  function handleSetCamOn() {
    setCameraOn(prevCamera => !prevCamera);
  }
  function handleSetMicOn() {
    setMicOn(prevMic => !prevMic);
  }

  const [localTracks, setLocalTracks] = useState({
    localCameraTrack: null,
    localMicrophoneTrack: null,
  });

  // todo: maybe it would be a good idea if we put mic and cam in context and use it in the room and preview
  return (
    <div className={styles.videoCallContainer}>
      {!isCalling ? (
        <Preview
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={() => handleSetMicOn()}
          setCameraOn={() => handleSetCamOn()}
          onJoin={() => handleJoinButtonClicked()}
          localTracks={localTracks}
          setLocalTracks={setLocalTracks}
        />
      ) : (
        <Room
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={() => handleSetMicOn()}
          setCameraOn={() => handleSetCamOn()}
          onLeave={() => handleLeaveButtonClicked()}
          localTracks={localTracks}
          setLocalTracks={setLocalTracks}
        />
      )}
    </div>
  );
}

//  <button onClick={handleJoinButtonClicked}>join</button>
//       {isCalling && (
//         <Room
//           micOn={micOn}
//           cameraOn={cameraOn}
//           setMicOn={() => handleSetMicOn()}
//           setCameraOn={() => handleSetCamOn()}
//           onLeave={() => handleLeaveButtonClicked()}
//         />
//       )}

/*
 * todo
 *  1-handle loading here
 * 2-handle error here
 *
 *  */
