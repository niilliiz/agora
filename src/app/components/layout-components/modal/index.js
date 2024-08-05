import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import Backdrop from "@/app/components/layout-components/backddrop";

export default function Modal({ isOpen, onClose, children }) {
  function handleClickOnModalContainer(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    const closeOnEscapeKey = e => (e.key === "Escape" ? onClose() : null);

    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Backdrop onAction={onClose}>
      <div className="modalContainer" onClick={handleClickOnModalContainer}>
        {children}
      </div>
    </Backdrop>,
    document.body,
  );
}
