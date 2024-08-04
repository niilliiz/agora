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

export default function RemoteVideoContainer({ client = {} }) {
  const [allowedRemoteUsers, setAllowedRemoteUsers] = useState(null);

  const remoteUsers = useRemoteUsers();
  const rtcClient = useRTCClient();

  const hasRemoteUser = useMemo(() => remoteUsers.length > 0, [remoteUsers.length]);

  const { videoTracks: remoteCameraTracks } = useRemoteVideoTracks(remoteUsers);
  const { audioTracks: remoteMicrophoneTracks } = useRemoteAudioTracks(remoteUsers);

  const userTracks = useMemo(() => {
    if (!hasRemoteUser) return [];

    return remoteUsers.slice(0, 1).map(user => {
      const videoTrack = remoteCameraTracks.find(track => track.getUserId() === user.uid);
      const audioTrack = remoteMicrophoneTracks.find(track => track.getUserId() === user.uid);

      return {
        user,
        videoTrack,
        audioTrack,
      };
    });
  }, [remoteUsers, remoteCameraTracks, remoteMicrophoneTracks, hasRemoteUser]);

  useEffect(() => {
    if (rtcClient) {
      const handleUserPublished = async (user, mediaType) => {
        // Check if the current number of remote users is more than 1
        if (remoteUsers.length > 1) {
          // Unsubscribe from the newly published user's media
          await rtcClient.unsubscribe(user, mediaType);
          console.log("Unsubscribed from user due to limit:", user);
        } else {
          // Subscribe to the user's media if within limit
          await rtcClient.subscribe(user, mediaType);
          console.log("Subscribed to user:", user);
        }
      };

      rtcClient.on("user-published", handleUserPublished);

      return () => {
        rtcClient.off("user-published", handleUserPublished);
      };
    }
  }, [rtcClient, remoteUsers.length]);

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
        <div>wait</div>
      )}
    </div>
  );
}
