"use client";

import styles from "@/app/page.module.css";
import Client from "@/app/components/client";
import VideoCall from "@/app/components/video-call";

export default function Home() {
  return (
    <main className={styles.main}>
      <Client>
        <VideoCall />
      </Client>
    </main>
  );
}
