import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./customModal.module.scss";
import { Button } from "@mui/material";
import clsx from "clsx";
import { E_modalType } from "@/lib/enums";
import CustomSvgIcon from "../CustomSvgIcon";

type ModalProps = {
    onClose: (ctaLocation?: string) => void;
    children: ReactNode;
    actionBar?: ReactNode;
    hideClose?: boolean;
    disableCloseOnBgClick?: boolean;
    modalType?: E_modalType;
};

function CustomModal({
    onClose,
    children,
    actionBar,
    hideClose,
    disableCloseOnBgClick,
    modalType,
}: ModalProps) {
    useEffect(() => {
        //This is to make sure that body can't be scrolled when modal is open
        const t = document.getElementsByTagName("html");
        if (t && t.length) {
            t[0].classList.add("overflow-hidden");
        }
        document.body.classList.add("overflow-hidden");
        return () => {
            const t = document.getElementsByTagName("html");
            if (t && t.length) {
                t[0].classList.remove("overflow-hidden");
            }
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleBgClick = () => {
        if (!disableCloseOnBgClick) {
            onClose("modal-background");
        }
    };
    return ReactDOM.createPortal(
        <div className={clsx([styles.container])}>
            <div className={styles.bg} onClick={handleBgClick}></div>
            <div
                className={clsx([
                    styles["content-container"],
                    styles["type-" + modalType],
                ])}
            >
                {!hideClose && (
                    <CustomSvgIcon
                        iconId="close"
                        tooltipText="Close"
                        tooltipPlacement="top"
                        onClickCallback={() => onClose("close-icon")}
                    />
                )}

                <div className={styles["content"]}>{children}</div>
                {actionBar && (
                    <div className={styles["action"]}>{actionBar}</div>
                )}
                {!actionBar && modalType === E_modalType.logout && (
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        disableRipple
                        className={clsx(["custom-button", "secondary-button"])}
                        onClick={() => onClose("okay-button")}
                    >
                        Okay
                    </Button>
                )}
            </div>
        </div>,
        document.querySelector(".modal-container") as Element
    );
}

export default CustomModal;
