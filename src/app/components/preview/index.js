import styles from "./preview.module.css";
import { useMemo, useState } from "react";
import AllowedContainer from "@/app/components/preview/components/allowed-container";
import Container from "@/app/components/layout-components/container";
import PendingPermissionModal from "@/app/components/preview/components/permission-pending-modal";

//todo: if u had time, u can sync all permission state together :)
const Permission_States = {};

export default function Preview({
  onJoin,
  micOn,
  setMicOn,
  cameraOn,
  setCameraOn,
  localTracks,
  setLocalTracks,
}) {
  // pending - granted - denied
  const [permissionState, setPermissionState] = useState("pending");

  const [pendingPermissionModal, setPendingPermissionModal] = useState(false);

  function handlePermissionState(value) {
    setPermissionState(value);
  }

  function handleClosePendingPermissionModal() {
    setPendingPermissionModal(false);
  }

  function handleOpenPendingPermissionModal() {
    setPendingPermissionModal(true);
  }

  function handleJoinTheRoom() {
    if (permissionState === "granted") {
      onJoin();
    } else {
      handleOpenPendingPermissionModal();
    }
  }

  useMemo(() => {
    if (permissionState === "granted") {
      setPendingPermissionModal(false);
    } else {
      setPendingPermissionModal(true);
    }
  }, [permissionState]);

  return (
    <Container>
      <div className={styles.previewContainer}>
        <AllowedContainer
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={setMicOn}
          setCameraOn={setCameraOn}
          onJoin={handleJoinTheRoom}
          permissionState={permissionState}
          setPermissionState={value => handlePermissionState(value)}
          localTracks={localTracks}
          setLocalTracks={setLocalTracks}
          openPendingPermissionModal={() => handleOpenPendingPermissionModal()}
        />
        {pendingPermissionModal && (
          <PendingPermissionModal onClose={() => handleClosePendingPermissionModal()} />
        )}
      </div>
    </Container>
  );
}
