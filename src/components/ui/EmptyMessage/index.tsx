import styles from "./emptyMessage.module.scss";

export default function EmptyMessage({ message }: { message?: string }) {
    return (
        <div className={styles.conditionEmpty}>
            {message || "No data available"}
        </div>
    );
}
