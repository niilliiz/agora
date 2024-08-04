import styles from "./timer.module.css";

export default function Timer({ className = "" }) {
  return <div className={`${styles.timerContainer} ${className}`}>timer</div>;
}
