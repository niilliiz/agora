import { forwardRef } from "react";
import styles from "./allowed-container.module.css";

function AllowedContainer({ hasPermission, onJoin }, ref) {
  return (
    <div className={styles.allowedContainer}>
      <h1>Preview</h1>
      <div ref={ref} className={styles.videoContainer} />
      <button disabled={!hasPermission} onClick={() => onJoin()}>
        JOIN
      </button>
    </div>
  );
}

export default forwardRef(AllowedContainer);
