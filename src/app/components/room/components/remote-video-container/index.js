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
import { useEffect, useMemo, useState } from "react";
import WaitingForRemoteUser from "@/app/components/room/components/waiting-for-remote";

export default function RemoteVideoContainer({ client = {} }) {
  const [allowedRemoteUser, setAllowedRemoteUser] = useState(null);

  const remoteUsers = useRemoteUsers();
  const rtcClient = useRTCClient();

  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);

  const userTracks = useMemo(() => {
    if (!allowedRemoteUser) return [];

    const videoTrack = remoteCameraTracks.find(
      track => track.getUserId() === allowedRemoteUser.uid,
    );
    const audioTrack = remoteMicrophoneTracks.find(
      track => track.getUserId() === allowedRemoteUser.uid,
    );

    return [
      {
        user: allowedRemoteUser,
        videoTrack,
        audioTrack,
      },
    ];
  }, [allowedRemoteUser, remoteCameraTracks, remoteMicrophoneTracks]);

  useEffect(() => {
    if (rtcClient) {
      const handleUserPublished = async (user, mediaType) => {
        if (allowedRemoteUser === null && remoteUsers.length <= 1) {
          setAllowedRemoteUser(user);
        } else {
          await rtcClient.unsubscribe(user, mediaType);
          console.log("Unsubscribed from user due to limit:", user);
        }
      };

      rtcClient.on("user-published", handleUserPublished);

      return () => {
        rtcClient.off("user-published", handleUserPublished);
      };
    }
  }, [rtcClient, allowedRemoteUser, remoteUsers.length]);

  useEffect(() => {
    const handleUserLeft = user => {
      if (allowedRemoteUser && user.uid === allowedRemoteUser.uid) {
        setAllowedRemoteUser(null);
      }
    };

    rtcClient.on("user-left", handleUserLeft);

    return () => {
      rtcClient.off("user-left", handleUserLeft);
    };
  }, [rtcClient, allowedRemoteUser]);

  useEffect(() => {
    remoteMicrophoneTracks.forEach(track => track.play());
  }, [remoteMicrophoneTracks]);

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
        <WaitingForRemoteUser />
      )}
    </div>
  );
}
