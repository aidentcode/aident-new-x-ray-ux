import LoadingAnimation3d from "@/components/3d/LoadingAnimation3d";
import WaitMsg from "@/components/ui/WaitMsg";
import { CircularProgress, Modal } from "@mui/material";
import styles from "./waitModal.module.scss";
import clsx from "clsx";

type WaitModalProps = {
    msg: string;
    showSpinner?: boolean;
    show3d?: boolean;
};
function WaitModal({
    msg,
    showSpinner = false,
    show3d = false,
}: WaitModalProps) {
    return (
        <>
            <Modal
                open={true}
                aria-labelledby="modal-loading"
                aria-describedby="modal-description-loading"
                className="custom-wait-modal"
            >
                <div
                    className={clsx([
                        styles.waitModalContent,
                        show3d && styles.show3d,
                    ])}
                >
                    {show3d && (
                        <>
                            <LoadingAnimation3d
                                zoom={0.5}
                                cameraPosition={[3, 3, 3]}
                            />
                            <CircularProgress
                                color="primary"
                                className={clsx([
                                    styles["loading-on-btn-3d"],
                                    styles["circle-1"],
                                ])}
                                size={36}
                                sx={{ marginBottom: "16px" }}
                            />
                            {/* <CircularProgress
                                color="primary"
                                className={clsx([
                                    styles["loading-on-btn-3d"],
                                    styles["circle-2"],
                                ])}
                                size={36}
                                sx={{ marginBottom: "16px" }}
                            /> */}
                            <WaitMsg msg={msg} showSpinner={false} />
                        </>
                    )}
                    {!show3d && <WaitMsg msg={msg} showSpinner={showSpinner} />}
                </div>
            </Modal>
        </>
    );
}
export default WaitModal;
