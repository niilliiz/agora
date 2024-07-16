import { useMemo, useState } from "react";
import AgoraRTC, {
  useCurrentUID,
  useIsConnected,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
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

  console.log("uid", userName);
  console.log("isConnected", isConnected);
  console.log("publishedUsers", publishedUsers);
  console.log("remoteUsers", remoteUsers);
  console.log("selfPublished", selfPublished);

  return (
    <div>
      <div>{<p>{`${userName}{${uid}}`}</p>}</div>
    </div>
  );
}
