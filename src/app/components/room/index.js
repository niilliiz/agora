import { useEffect, useMemo, useState } from "react";
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

export default function Room({ cameraOn, micOn }) {
  const isConnected = useIsConnected();

  const uid = useCurrentUID() || 0;

  const userName = useMemo(() => fakeName(uid), [uid]);
  const userAvatar = useMemo(() => fakeAvatar(), []);

  const remoteUsers = useRemoteUsers();
  const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

  const selfPublished = micOn || cameraOn;

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const client = useRTCClient();

  console.log("client", client);

  console.log("uid", userName);
  console.log("isConnected", isConnected);
  console.log("publishedUsers", publishedUsers);
  console.log("remoteUsers", remoteUsers);
  console.log("selfPublished", selfPublished);

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
      <div>{<p>{`${userName}{${uid}}`}</p>}</div>
    </div>
  );
}
