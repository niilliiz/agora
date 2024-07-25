"use client";
import styles from "./page.module.css";
import Client from "@/app/components/client";
// import PreviewOLD from "src/app/components/preview-old";
import VideoCall from "@/app/components/video-call";
import PreviewPage from "@/app/components/preview";
import PreviewOLD from "@/app/components/preview-old";

export default function Home() {
  return (
    <main className={styles.main}>
      <Client>
        <PreviewPage />

        {/*<VideoCall />*/}
      </Client>
    </main>
  );
}
