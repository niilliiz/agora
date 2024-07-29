import styles from "./header.module.css";
import Container from "@/app/components/layout-components/container";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <h6 className={styles.title}>
          Doki is now <strong className={styles.bold}>✨Nexu✨</strong>
          <span className={styles.subtitle}>New name, Same trusted experience!</span>
        </h6>
        <a href="#" className={styles.headerCTA}>
          <span>Get to know Nexu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2.9999 12.0001C2.9999 11.8012 3.07892 11.6104 3.21957 11.4697C3.36022 11.3291 3.55099 11.2501 3.7499 11.2501L18.4396 11.2501L12.9693 5.7807C12.8996 5.71101 12.8443 5.62829 12.8066 5.53724C12.7689 5.4462 12.7495 5.34862 12.7495 5.25007C12.7495 5.15152 12.7689 5.05394 12.8066 4.9629C12.8443 4.87185 12.8996 4.78913 12.9693 4.71945C13.039 4.64976 13.1217 4.59449 13.2127 4.55678C13.3038 4.51906 13.4014 4.49965 13.4999 4.49965C13.5984 4.49965 13.696 4.51906 13.7871 4.55678C13.8781 4.59449 13.9608 4.64976 14.0305 4.71945L20.7805 11.4694C20.8503 11.5391 20.9056 11.6218 20.9433 11.7129C20.9811 11.8039 21.0005 11.9015 21.0005 12.0001C21.0005 12.0986 20.9811 12.1962 20.9433 12.2873C20.9056 12.3783 20.8503 12.461 20.7805 12.5307L14.0305 19.2807C13.8898 19.4214 13.6989 19.5005 13.4999 19.5005C13.3009 19.5005 13.11 19.4214 12.9693 19.2807C12.8285 19.14 12.7495 18.9491 12.7495 18.7501C12.7495 18.551 12.8285 18.3602 12.9693 18.2194L18.4396 12.7501L3.7499 12.7501C3.55099 12.7501 3.36022 12.6711 3.21957 12.5304C3.07892 12.3897 2.9999 12.199 2.9999 12.0001Z"
              fill="white"
            />
          </svg>
        </a>
      </Container>
    </header>
  );
}
