// components/Loading.js
import styles from "./LoadingIcon.module.css";

const LoadingIcon = () => {
    return (
        <div className={styles.loadingOverlay}>
            <div className={styles.loadingContent}>
                <div className={styles.loader}></div>
            </div>
        </div>
    );
};

export default LoadingIcon;
