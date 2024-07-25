"use client";

import styles from "./page.module.css";
import Client from "@/app/components/client";
import Preview from "@/app/components/preview";

export default function Home() {
  return (
    <main className={styles.main}>
      <Client>
        <Preview />
      </Client>
    </main>
  );
}
