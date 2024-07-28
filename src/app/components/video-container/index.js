import { forwardRef } from "react";
import styles from "./video-container.module.css";

function VideoContainer({ style = {}, className = "" }, ref) {
  const { width = "400", height = "400" } = style;
  return (
    <div
      className={`${styles.videoContainer} ${className}`}
      ref={ref}
      style={{ "--video_width": `${width}px`, "--video_height": `${height}px` }}
    />
  );
}

export default forwardRef(VideoContainer);
