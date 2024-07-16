import { useState } from "react";
import {
  useJoin,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "agora-rtc-react";

import MediaControllers from "@/app/components/media-controllers";

import { appConfig } from "@/utils/app-config";

import styles from "./video-call.module.css";
import Room from "@/app/components/room";

export default function VideoCall() {
  const [calling, setCalling] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const { data, isLoading, isConnected, error } = useJoin(
    { appid: appConfig.appId, channel: appConfig.channel, token: appConfig.token },
    calling,
  );

  const remoteUsers = useRemoteUsers();
  const { videoTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  audioTracks.map(track => track.play());

  console.log("remoteUsers", remoteUsers);
  console.log("videoTracks", videoTracks);
  console.log("audioTracks", audioTracks);

  console.log("data", data);
  // console.log("isLoading", isLoading);
  // console.log("isConnected", isConnected);
  // console.log("error", error);

  return (
    <div className={styles.videoCallContainer}>
      {calling ? (
        <Room
          cameraOn={cameraOn}
          micOn={micOn}
          // renderRemoteUsers={() => <RenderRemoteUsers videoTracks={videoTracks} />}
        />
      ) : (
        <div>not calling</div>
      )}
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
