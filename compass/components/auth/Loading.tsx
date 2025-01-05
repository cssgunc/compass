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
                <h1 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">
                    Loading...
                </h1>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-700"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
