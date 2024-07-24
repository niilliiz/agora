import { useState } from "react";
import {
  createCameraVideoTrack,
  createMicrophoneAudioTrack,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-sdk-ng/esm";

export default function useMediaPermissions() {
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const [localTracks, setLocalTracks] = useState({
    cameraLocalTrack: null,
    microphoneLocalTrack: null,
  });

  const [permissionError, setPermissionError] = useState({
    cameraPermissionError: "",
    micPermissionError: "",
  });

  function manageErrorMessage(key) {
    const field = key + "PermissionError";
    setPermissionError(prevError => ({ ...prevError, [field]: key }));
  }

  async function requestCameraPermission() {
    try {
      const cameraTrack = await createCameraVideoTrack();
      setLocalTracks(prev => ({
        ...prev,
        cameraLocalTrack: cameraTrack,
      }));
      setCameraOn(true);
      return cameraTrack;
    } catch (e) {
      console.log(e, "User didn't give permission to access CAMERA");
      setCameraOn(false);
      manageErrorMessage("camera");
      return null;
    }
  }

  async function requestMicPermission() {
    try {
      const microphoneTrack = await createMicrophoneAudioTrack();
      setLocalTracks(prevTracks => ({
        ...prevTracks,
        microphoneLocalTrack: microphoneTrack,
      }));
      setMicOn(true);
      microphoneTrack.play();
      return microphoneTrack;
    } catch (e) {
      console.log(e, "User didn't give permission to access MICROPHONE");
      setMicOn(false);
      manageErrorMessage("mic");

      return null;
    }
  }

  function clearTracks() {
    if (localTracks.cameraLocalTrack) {
      localTracks.cameraLocalTrack.close();
    }
    if (localTracks.microphoneLocalTrack) {
      localTracks.microphoneLocalTrack.close();
    }
    setLocalTracks({
      cameraLocalTrack: null,
      microphoneLocalTrack: null,
    });
  }

  async function checkCameraPermission() {
    try {
      const result = await navigator.permissions.query({ name: "camera" });

      return result.state;
    } catch (e) {
      console.log(e, "Error checking camera permission");
      return "denied";
    }
  }
  async function checkMicPermission() {
    try {
      const result = await navigator.permissions.query({ name: "microphone" });
      return result.state;
    } catch (e) {
      console.log(e, "Error checking microphone permission");
      return "denied";
    }
  }

  return {
    cameraOn,
    micOn,
    localTracks,
    requestCameraPermission,
    requestMicPermission,
    clearTracks,
    checkCameraPermission,
    checkMicPermission,
    setCameraOn,
    setMicOn,
    permissionError,
  };
}
