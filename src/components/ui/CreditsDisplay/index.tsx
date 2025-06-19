import { sampleUser } from "@/lib/data/sample-responses";
import styles from "./creditsDisplay.module.scss";

export default function CreditsDisplay() {
    // TODO: get user from session
    const user = sampleUser;
    const defaultCredit = Number(user.defaultCredit || 0);
    const maxCredit = 50;

    const percentage1 = defaultCredit / maxCredit;
    const percentage2 = 1.0;
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    return (
        <div className={styles.container}>
            <div className={styles.pie}>
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <defs>
                        <linearGradient
                            id="customGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                style={{ stopColor: "#e6be67" }}
                            />
                            <stop
                                offset="100%"
                                style={{ stopColor: "#eea8a6" }}
                            />
                        </linearGradient>
                    </defs>
                    <circle
                        cx="20"
                        cy="20"
                        r={radius}
                        fill="none"
                        stroke="#26252C"
                        strokeWidth="4"
                        strokeDasharray={`${
                            percentage2 * circumference
                        } ${circumference}`}
                        transform="rotate(-90 20 20)"
                        strokeLinecap="round"
                    />

                    <circle
                        cx="20"
                        cy="20"
                        r={radius}
                        fill="none"
                        stroke="url(#customGradient)"
                        strokeWidth="4"
                        strokeDasharray={`${
                            percentage1 * circumference
                        } ${circumference}`}
                        transform="rotate(-90 20 20)"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <div className={styles.points}>
                <span>{defaultCredit}</span>
                <br /> points
            </div>
        </div>
    );
}
