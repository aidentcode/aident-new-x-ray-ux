import { Close } from "@mui/icons-material";
import { Button, IconButton, Snackbar } from "@mui/material";

type SnackBarWrapperProps = {
    isOpen: boolean;
    msg: string;
    autoHideDuration: number;
    actionBtnTxt?: string;
    onAction?: () => void;
    onClose: () => void;
};
export default function SnackBarWrapper({
    isOpen,
    msg,
    autoHideDuration,
    actionBtnTxt,
    onAction,
    onClose,
}: SnackBarWrapperProps) {
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        onClose();
    };
    const action = (
        <>
            {actionBtnTxt && (
                <Button
                    color="secondary"
                    size="small"
                    onClick={() => {
                        if (onAction) onAction();
                    }}
                >
                    {actionBtnTxt}
                </Button>
            )}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={onClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={isOpen}
            autoHideDuration={autoHideDuration || 2000}
            onClose={handleClose}
            message={msg}
            action={action}
        />
    );
}
