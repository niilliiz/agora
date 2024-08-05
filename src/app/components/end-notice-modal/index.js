import Modal from "@/app/components/layout-components/modal";
import styles from "./end-notice-modal.module.css";

export default function EndNoticeModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.alarmIconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M23.541 31.9818V32.3151C23.541 33.2151 23.1743 34.0484 22.5743 34.6818C21.941 35.2818 21.0743 35.6484 20.2077 35.6484H19.8743C18.041 35.6484 16.541 34.1484 16.541 32.3151V31.9818C16.541 30.1484 18.041 28.6484 19.8743 28.6484H20.2077C22.041 28.6484 23.541 30.1484 23.541 31.9818Z"
              fill="white"
            ></path>
            <path
              d="M23.4599 7.17001V21.5844C23.4599 23.5664 21.9032 25.188 20.0005 25.188C18.0978 25.188 16.541 23.5664 16.541 21.5844V7.17001C16.541 5.18803 18.0978 3.56641 20.0005 3.56641C21.9032 3.56641 23.4599 5.18803 23.4599 7.17001Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <h2 className={styles.title}>End Session</h2>
        <p className={styles.description}>
          Please go back to Nexu application to submit your Prescription
        </p>
        <p className={styles.subDescription}>
          Provide your prescription, to receive your earnings.
        </p>
        <button className={styles.closeCTA} onClick={onClose}>
          Got it
        </button>
      </div>
    </Modal>
  );
}
