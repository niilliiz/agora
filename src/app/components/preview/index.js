import styles from "./preview.module.css";
import MediaControllers from "@/app/components/media-controllers";

export default function Preview() {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.videoContainer}>
        <div className={styles.localVideoContainer}></div>
        <MediaControllers />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}></div>
        <button className={styles.join}></button>
      </div>
    </div>
  );
}
