"use client";
import styles from "./page.module.css";
import VideoCall from "@/app/components/video-call";
import Client from "@/app/components/client";
import Preview from "@/app/components/preview";

// import AgoraRTC from "agora-rtc-sdk-ng";
// AgoraRTC.setLogLevel(0);

export default function Home() {
  return (
    <main className={styles.main}>
      <Client>
        {/*<VideoCall />*/}
        <Preview />
      </Client>
    </main>
  );
}
