"use client";
import styles from "./page.module.css";
import Client from "@/app/components/client";
import Preview from "src/app/components/preview-old";
import VideoCall from "@/app/components/video-call";
import Example from "@/app/components/example";

// import AgoraRTC from "agora-rtc-sdk-ng";
// AgoraRTC.setLogLevel(0);

export default function Home() {
  return (
    <main className={styles.main}>
      {/*<Example />*/}
      <Client>
        <VideoCall />
        {/*<Preview />*/}
      </Client>
    </main>
  );
}
