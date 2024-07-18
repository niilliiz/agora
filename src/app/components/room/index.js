import { useEffect, useMemo, useRef, useState } from "react";
import AgoraRTC, {
  useCurrentUID,
  useIsConnected,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";
import { fakeAvatar, fakeName } from "@/utils/fake";
import styles from "@/app/components/preview-old/preview-old.module.css";

export default function Room({ cameraOn, micOn }) {
  const isConnected = useIsConnected();

  const videoContainerRef = useRef(null);

  const uid = useCurrentUID() || 0;

  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(), []);

  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  const selfPublished = micOn || cameraOn;

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  useMemo(() => {
    if (localCameraTrack) {
      if (cameraOn) {
        localCameraTrack.play(videoContainerRef.current);
      } else {
        localCameraTrack.stop();
        localCameraTrack.off();
      }
    }
  }, [localCameraTrack, cameraOn]);

  console.log("camer", localCameraTrack);
  // useEffect(() => {
  //   if (localCameraTrack && cameraOn) {
  //     localCameraTrack.play(videoContainerRef.current);
  //   }
  // }, [cameraOn, localCameraTrack]);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const client = useRTCClient();

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    console.log("user-published");
    if (mediaType === "video") {
      // setUsers(previousUsers => [...previousUsers, user]);
      console.log("mediaType video", mediaType);
    }

    if (mediaType === "audio") {
      // user.audioTrack.play()
      console.log("mediaType audio", mediaType);
    }
  };

  const handleUserLeft = user => {
    // setUsers(previousUsers => previousUsers.filter(u => u.uid !== user.uid));
    console.log("left");
  };

  useEffect(() => {
    console.log("hello");
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);
  }, []);

  return (
    <div>
      <div className={styles.localVideoContainer} ref={videoContainerRef}></div>
      <div>{<p>{`${userName}{${uid}}`}</p>}</div>
    </div>
  );
}
