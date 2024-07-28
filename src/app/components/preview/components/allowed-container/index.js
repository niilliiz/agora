import { forwardRef } from "react";
import styles from "./allowed-container.module.css";
import VideoContainer from "@/app/components/video-container";
import MediaController from "@/app/components/media-controller";

function AllowedContainer({ hasPermission, onJoin }, ref) {
  return (
    <div className={styles.allowedContainer}>
      <div className={styles.mediaContainer}>
        <VideoContainer ref={ref} />
        <MediaController />
      </div>
      <div className={styles.infoContainer}>
        <button disabled={!hasPermission} onClick={() => onJoin()}>
          JOIN
        </button>
      </div>
    </div>
  );
}

export default forwardRef(AllowedContainer);
