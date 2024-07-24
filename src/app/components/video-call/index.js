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
import OLDRoom from "@/app/components/old-room";

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
        <OLDRoom
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

/* todo
 * preview page
 * permission for camera v mic
 * how we detect if remote user has been joined
 * turn off the camera light if one turns off the camera
 * switch the camera front and back
 * handle leaving the room
 * handle the users information remote and local
 * handle rejoining the room
 * handle the users generally
 * timout for session
 * if it's possible, implement chat in video call
 * handle unmount of the component
 * ui of preview
 * ui of video call
 * ui of the media controllers
 * handle toggle the local mic and camera
 * handle toggle the remote mic and camera
 * we only have 2 users in the room
 * */
