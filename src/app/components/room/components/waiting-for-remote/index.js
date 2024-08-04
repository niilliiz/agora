import waitingPic from "../../../../../../public/img/waiting/waiting.svg";

import styles from "./waiting-for-remote.module.css";
import Image from "next/image";

const duration = 30;
export default function WaitingForRemoteUser() {
  return (
    <div className={styles.waitingContainer}>
      <Image src={waitingPic} alt="Waiting avatar" width="120" height="120" />
      <p className={styles.description}>We are trying to reach James Rodrigo to join the session</p>
      <p className={styles.detail}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M14.8333 7.99996C14.8333 11.7739 11.7739 14.8333 7.99996 14.8333C4.22601 14.8333 1.16663 11.7739 1.16663 7.99996C1.16663 4.22601 4.22601 1.16663 7.99996 1.16663C11.7739 1.16663 14.8333 4.22601 14.8333 7.99996Z"
            stroke="white"
          />
          <path d="M8 3.33337V8.00004L10.6667 10.6667" stroke="white" stroke-linecap="round" />
        </svg>
        <span>{duration} minutes duration</span>
      </p>
    </div>
  );
}
