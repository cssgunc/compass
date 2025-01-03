// components/Loading.js
import styles from "./Loading.module.css";
import Image from "next/image";

const Loading = () => {
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.loadingContent}>
                <Image
                    src="/logo.png"
                    alt="Compass Center logo."
                    width={100}
                    height={91}
                    style={{ height: "auto", width: "auto" }}
                    priority
                />
                <h1 className={styles.loadingTitle}>Loading...</h1>
                <div className={styles.loadingSpinner}></div>
            </div>
        </div>
    );
};

export default Loading;
