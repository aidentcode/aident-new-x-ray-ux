import styles from "./waitMsg.module.scss";
import { CircularProgress } from "@mui/material";

type WaitMsgProps = {
    msg: string;
    showSpinner?: boolean;
};
function WaitMsg({ msg, showSpinner = false }: WaitMsgProps) {
    return (
        <div className={styles["content-container"]}>
            {showSpinner && (
                <CircularProgress
                    color="primary"
                    className={styles["loading-on-btn"]}
                    size={24}
                    sx={{ marginBottom: "16px" }}
                />
            )}
            <div className={styles["msg-container"]}>{msg}</div>
        </div>
    );
}
export default WaitMsg;
