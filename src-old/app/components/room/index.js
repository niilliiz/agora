// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import AgoraRTC, {
//   LocalAudioTrack,
//   LocalVideoTrack,
//   useCurrentUID,
//   useIsConnected,
//   useLocalCameraTrack,
//   useLocalMicrophoneTrack,
//   usePublish,
//   useRemoteUsers,
//   useRTCClient,
// } from "agora-rtc-react";
// import { fakeAvatar, fakeName } from "@/utils/fake";
// import styles from "@/app/components/preview-old/preview-old.module.css";
//
// function useSafePromise() {
//   const isUnmountRef = useIsUnmounted();
//
//   function safePromise(promise, onUnmountedError) {
//     // the async promise executor is intended
//     // eslint-disable-next-line no-async-promise-executor
//     return new Promise(async (resolve, reject) => {
//       try {
//         const result = await promise;
//         if (!isUnmountRef.current) {
//           resolve(result);
//         }
//         // unresolved promises will be garbage collected.
//       } catch (error) {
//         if (!isUnmountRef.current) {
//           reject(error);
//         } else if (onUnmountedError) {
//           onUnmountedError(error);
//         } else {
//           if (process.env.NODE_ENV === "development") {
//             console.error("An error occurs from a promise after a component is unmounted", error);
//           }
//         }
//       }
//     });
//   }
//
//   return useCallback(safePromise, [isUnmountRef]);
// }
//
// function useAwaited(promise) {
//   const sp = useSafePromise();
//   const [value, setValue] = useState();
//
//   useIsomorphicLayoutEffect(() => {
//     if (isPromise(promise)) {
//       sp(promise).then(setValue);
//     } else {
//       setValue(promise);
//     }
//   }, [promise, sp]);
//
//   return value;
// }
//
// export function MicrophoneAudioTrack({ track: maybeTrack, deviceId, ...props }) {
//   const track = useAwaited(maybeTrack);
//
//   useEffect(() => {
//     if (track && deviceId != null) {
//       track.setDevice(deviceId).catch(console.warn);
//     }
//   }, [deviceId, track]);
//
//   return <LocalAudioTrack track={maybeTrack} {...props} />;
// }
//
// function CameraVideoTrack({ track: maybeTrack, deviceId, videoPlayerConfig, ...props }) {
//   const track = useAwaited(maybeTrack);
//
//   useEffect(() => {
//     if (track && deviceId != null) {
//       track.setDevice(deviceId).catch(console.warn);
//     }
//   }, [deviceId, track]);
//
//   return <LocalVideoTrack track={maybeTrack} videoPlayerConfig={videoPlayerConfig} {...props} />;
// }
//
// export default function Room({ properties: { micOn, cameraOn } }) {
//   const isConnected = useIsConnected();
//   const videoContainerRef = useRef(null);
//
//   const selfPublished = micOn || cameraOn;
//
//   console.log("isConnected", isConnected);
//
//   const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
//   const { localCameraTrack } = useLocalCameraTrack(cameraOn);
//   usePublish([localMicrophoneTrack, localCameraTrack]);
//
//   console.log(localCameraTrack, "cameraTrack");
//
//   const remoteUsers = useRemoteUsers();
//
//   useEffect(() => {
//     if (videoContainerRef.current && localCameraTrack) {
//       console.log("here");
//       localCameraTrack.play(videoContainerRef.current);
//     }
//   }, [localCameraTrack]);
//
//   return (
//     <div>
//       <div className={styles.localVideoContainer} ref={videoContainerRef}></div>
//       <div>
//         <CameraVideoTrack
//           // deviceId={cameraDeviceId}
//           disabled={!cameraOn}
//           // play={playVideo}
//           track={videoTrack}
//           videoPlayerConfig={videoPlayerConfig}
//         />
//         <MicrophoneAudioTrack
//           // deviceId={micDeviceId}
//           disabled={!micOn}
//           // play={playAudio}
//           track={audioTrack}
//           volume={volume}
//         />
//         {/*{cover && !cameraOn && <UserCover cover={cover} />}*/}
//         {/*<div>{children}</div>*/}
//       </div>
//     </div>
//   );
// }
