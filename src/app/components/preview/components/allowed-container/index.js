import { forwardRef } from "react";
import styles from "./allowed-container.module.css";
import VideoContainer from "@/app/components/video-container";

function AllowedContainer({ hasPermission, onJoin }, ref) {
  return (
    <div className={styles.allowedContainer}>
      <h1>Preview</h1>
      <VideoContainer ref={ref} />
      <button disabled={!hasPermission} onClick={() => onJoin()}>
        JOIN
      </button>
    </div>
  );
}

export default forwardRef(AllowedContainer);
