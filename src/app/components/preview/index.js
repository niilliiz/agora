import styles from "./preview.module.css";

export default function Preview({ onJoin }) {
  return (
    <div className={styles.previewContainer}>
      <h1>Preview</h1>
      <button onClick={() => onJoin()}>JOIN</button>
    </div>
  );
}
