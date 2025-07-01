import styles from "./comingsoon.module.scss";
import logo from "../../../public/logo/AiDent-logo-2.png";
import Image from "next/image";

export default function ComingSoon() {
    return (
        <div className={styles.container}>
            <div className={styles.logoHeader}>
                <Image src={logo} alt="logo" width={120} height={120} />
            </div>
            <div className={styles["text-container-1"]}>
                <div className={styles["line1"]}>
                    <span
                        className={styles["bold-text"]}
                        style={{ paddingRight: "4px" }}
                    >
                        UPGRADE
                    </span>
                    TO <span className={styles["bold-text"]}>AI DENTISTRY</span>
                </div>
                <div className={styles["line2"]}></div>
            </div>
            <div className={styles["border-line"]}></div>
            <div className={styles["text-container-2"]}>
                <span className={styles["soon-text"]}>COMING</span>
                <span className={styles["coming-text"]}>SOON</span>
                <span className={styles["soon-text"]}>...</span>
            </div>
            <div className={styles["border-line"]}></div>
            <div className={styles["text-container-3"]}>
                Reach out to us at contact@aidentglobal.com for any queries
            </div>
        </div>
    );
}
