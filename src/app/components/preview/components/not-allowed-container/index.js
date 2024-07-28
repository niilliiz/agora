import styles from "./not-allowed-container.module.css";

export default function NotAllowedContainer() {
  return (
    <div className={styles.notAllowedContainer}>
      <div className={styles.modalContainer}>
        1- close icon 2- warning icon 3- description about u should give permissions 4- ok, got it
        5- download application
      </div>
    </div>
  );
}
