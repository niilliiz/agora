import styles from "./preview.module.css";
import { useState } from "react";
import NotAllowedContainer from "@/app/components/preview/components/not-allowed-container";
import AllowedContainer from "@/app/components/preview/components/allowed-container";
import Container from "@/app/components/layout-components/container";

const Permission_States = {
  1: "grea",
};

export default function Preview({
  onJoin,
  micOn,
  setMicOn,
  cameraOn,
  setCameraOn,
  localTracks,
  setLocalTracks,
}) {
  // const [permission, set] = useState(false);
  const [permissionState, setPermissionState] = useState("denied");

  function handlePermissionState(value) {
    setPermissionState(value);
  }

  // function handleClosePermissionModal() {
  //   setHasPermission(true);
  // }

  return (
    <Container>
      <div className={styles.previewContainer}>
        <AllowedContainer
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={setMicOn}
          setCameraOn={setCameraOn}
          onJoin={onJoin}
          permissionState={permissionState}
          setPermissionState={value => handlePermissionState(value)}
          localTracks={localTracks}
          setLocalTracks={setLocalTracks}
        />
        {/*{!permission && <NotAllowedContainer onClose={() => handleClosePermissionModal()} />}*/}
      </div>
    </Container>
  );
}

/*
 *  -> check if camera permission is granted
 * -> if is granted redirect to the info page
 * -> if is not granted, show the modal
 * */
