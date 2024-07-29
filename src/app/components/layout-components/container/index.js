import styles from "./container.module.css";

export default function Container({ children, className = "" }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}
