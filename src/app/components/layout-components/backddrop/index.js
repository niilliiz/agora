import styles from "./backdrop.module.css";
import { useEffect, useRef } from "react";

export default function Backdrop({ className = "", children, onAction }) {
  const backdropRef = useRef(null);

  function handleBackdropClicked(event) {
    if (event.target === backdropRef.current) {
      onAction();
    }
  }

  useEffect(() => {
    if (backdropRef.current) {
      backdropRef.current.addEventListener("click", handleBackdropClicked);
    }

    return () => {
      if (backdropRef.current) {
        backdropRef.current.removeEventListener("click", handleBackdropClicked);
      }
    };
  }, []);
  return (
    <div ref={backdropRef} className={`${styles.backdrop} ${className}`}>
      {children}
    </div>
  );
}
