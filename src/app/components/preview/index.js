import styles from "./preview.module.css";
import { useState } from "react";
import NotAllowedContainer from "@/app/components/preview/components/not-allowed-container";
import AllowedContainer from "@/app/components/preview/components/allowed-container";
import Container from "@/app/components/layout-components/container";

export default function Preview({
  onJoin,
  micOn,
  setMicOn,
  cameraOn,
  setCameraOn,
  localTracks,
  setLocalTracks,
}) {
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <Container>
      <div className={styles.previewContainer}>
        <AllowedContainer
          micOn={micOn}
          cameraOn={cameraOn}
          setMicOn={setMicOn}
          setCameraOn={setCameraOn}
          onJoin={onJoin}
          hasPermission={hasPermission}
          setHasPermission={value => setHasPermission(value)}
          localTracks={localTracks}
          setLocalTracks={setLocalTracks}
        />
        {!hasPermission && <NotAllowedContainer />}
      </div>
    </Container>
  );
}

/*
 *  -> check if camera permission is granted
 * -> if is granted redirect to the info page
 * -> if is not granted, show the modal
 * */
