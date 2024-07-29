// noinspection JSIgnoredPromiseFromCall

import { useEffect, useRef } from "react";
import styles from "./allowed-container.module.css";
import VideoContainer from "@/app/components/video-container";
import MediaController from "@/app/components/media-controller";
import AgoraRTC from "agora-rtc-react";

function AllowedContainer({
  hasPermission,
  setHasPermission,
  onJoin,
  micOn,
  setMicOn,
  cameraOn,
  setCameraOn,
  localTracks,
  setLocalTracks,
}) {
  let isInitialRenderRef = useRef(true);
  const videoContainerRef = useRef(null);

  const { localCameraTrack, localMicrophoneTrack } = localTracks;

  async function requestCameraAndMicrophonePermission() {
    // todo: we force user to give permission for both medias, if we want to force them just to give for the one of them, we can use createCameraVideoTrack or createMicrophoneAudioTrack separately
    try {
      const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks(prevLocal => ({
        ...prevLocal,
        localCameraTrack: cameraTrack,
        localMicrophoneTrack: microphoneTrack,
      }));
      setCameraOn(true);
      setMicOn(true);
      if (cameraTrack) {
        cameraTrack.play(videoContainerRef.current);
      }

      if (microphoneTrack) {
        microphoneTrack.play();
      }
      setHasPermission(true);
    } catch (e) {
      setHasPermission(false);
      console.error(e, "User didn't give permission to both MICROPHONE or CAMERA");
    }
  }

  useEffect(() => {
    if (videoContainerRef.current && isInitialRenderRef.current) {
      // Prevent from rendering the video element twice in DOM
      isInitialRenderRef.current = false;

      requestCameraAndMicrophonePermission();
    }
  }, []);

  useEffect(() => {
    if (videoContainerRef.current) {
      if (localCameraTrack) {
        localCameraTrack
          .setEnabled(cameraOn)
          .catch(() => console.warn("There is an error while enabling the camera track."));

        if (cameraOn) {
          localCameraTrack.play(videoContainerRef.current);
        } else {
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
  }, [micOn, localMicrophoneTrack]);

  return (
    <div className={styles.allowedContainer}>
      <section className={styles.mediaContainer}>
        <div className={styles.videoWrapper}>
          <div className={styles.video} ref={videoContainerRef} />
        </div>
        <MediaController
          className={styles.mediaController}
          micOn={micOn}
          cameraOn={cameraOn}
          setCameraOn={setCameraOn}
          setMicOn={setMicOn}
          localTracks={localTracks}
        />
      </section>
      {/*-----------------------------------*/}
      <section className={styles.infoContainer}>
        <div className={styles.header}>
          <h2 className={styles.doctorName}>With James Rodrigo</h2>
          <div className={styles.specialtyName}>Cancer</div>
        </div>
        <div className={styles.sessionDetail}>
          <p className={styles.date}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13 2H11.5V1.5C11.5 1.36739 11.4473 1.24021 11.3536 1.14645C11.2598 1.05268 11.1326 1 11 1C10.8674 1 10.7402 1.05268 10.6464 1.14645C10.5527 1.24021 10.5 1.36739 10.5 1.5V2H5.5V1.5C5.5 1.36739 5.44732 1.24021 5.35355 1.14645C5.25979 1.05268 5.13261 1 5 1C4.86739 1 4.74021 1.05268 4.64645 1.14645C4.55268 1.24021 4.5 1.36739 4.5 1.5V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2ZM4.5 3V3.5C4.5 3.63261 4.55268 3.75979 4.64645 3.85355C4.74021 3.94732 4.86739 4 5 4C5.13261 4 5.25979 3.94732 5.35355 3.85355C5.44732 3.75979 5.5 3.63261 5.5 3.5V3H10.5V3.5C10.5 3.63261 10.5527 3.75979 10.6464 3.85355C10.7402 3.94732 10.8674 4 11 4C11.1326 4 11.2598 3.94732 11.3536 3.85355C11.4473 3.75979 11.5 3.63261 11.5 3.5V3H13V5H3V3H4.5ZM13 13H3V6H13V13Z"
                fill="white"
              />
            </svg>
            <span className={styles.time}>Thursday, Jun 15</span>
          </p>
          <p className={styles.sessionDuration}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M15.3332 8.00008C15.3332 11.774 12.2738 14.8334 8.49984 14.8334C4.72589 14.8334 1.6665 11.774 1.6665 8.00008C1.6665 4.22614 4.72589 1.16675 8.49984 1.16675C12.2738 1.16675 15.3332 4.22614 15.3332 8.00008Z"
                stroke="white"
              />
              <path d="M8.5 3.33325V7.99992L11.1667 10.6666" stroke="white" strokeLinecap="round" />
            </svg>
            <span className={styles.duration}>12:30-13:00 (30 minutes duration)</span>
          </p>
        </div>
        <div className={styles.footer}>
          <button className={styles.joinCTA} disabled={!hasPermission} onClick={() => onJoin()}>
            Join Now
          </button>
          <span className={styles.sessionDetail}>You’re the first one here</span>
        </div>
      </section>
    </div>
  );
}

export default AllowedContainer;
