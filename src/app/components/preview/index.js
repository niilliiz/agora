import styles from "./preview.module.css";
import { useState } from "react";
import NotAllowedContainer from "@/app/components/preview/components/not-allowed-container";
import AllowedContainer from "@/app/components/preview/components/allowed-container";

export default function Preview({ onJoin }) {
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <div className={styles.previewContainer}>
      <AllowedContainer
        onJoin={onJoin}
        hasPermission={hasPermission}
        setHasPermission={value => setHasPermission(value)}
      />
      {!hasPermission && <NotAllowedContainer />}
    </div>
  );
}

/*
 *  -> check if camera permission is granted
 * -> if is granted redirect to the info page
 * -> if is not granted, show the modal
 * */
