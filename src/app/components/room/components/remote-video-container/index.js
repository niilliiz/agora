import styles from "./remote-video-container.module.css";
import {
  RemoteAudioTrack,
  RemoteVideoTrack,
  useRemoteAudioTracks,
  useRemoteUsers,
  useRemoteVideoTracks,
  useRTCClient,
} from "agora-rtc-react";
import UserState from "@/app/components/room/components/user-state";
import CameraOffContainer from "@/app/components/camera-off";
import { useMemo } from "react";

export default function RemoteVideoContainer({ client = {} }) {
  const remoteUsers = useRemoteUsers();
  const rtcClient = useRTCClient();

  const hasRemoteUser = useMemo(() => remoteUsers.length > 0, [remoteUsers.length]);
  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);

  remoteMicrophoneTracks.map(track => track.play());

  const userTracks = useMemo(() => {
    if (!hasRemoteUser) return [];

    return remoteUsers.map(user => {
      const videoTrack = remoteCameraTracks.find(track => track.getUserId() === user.uid);
      const audioTrack = remoteMicrophoneTracks.find(track => track.getUserId() === user.uid);

      return {
        user,
        videoTrack,
        audioTrack,
      };
    });
  }, [remoteUsers, remoteCameraTracks, remoteMicrophoneTracks, hasRemoteUser]);

  console.log("userTrack", userTracks);

  return (
    <div className={styles.remoteVideoContainer}>
      {userTracks.length > 0 ? (
        userTracks.map(({ user, videoTrack, audioTrack }) => {
          return (
            <div key={user.uid}>
              <CameraOffContainer />
              <UserState name="remote" micOn={user.hasAudio} />
              <RemoteVideoTrack track={videoTrack} play={user.hasVideo} />
              <RemoteAudioTrack track={audioTrack} play={user.hasAudio} />
            </div>
          );
        })
      ) : (
        <div>wait</div>
      )}
    </div>
  );
}
