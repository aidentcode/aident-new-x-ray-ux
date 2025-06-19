import { clsx } from "clsx";
import { Button } from "@mui/material";
import { E_modalType } from "@/lib/enums";
import CustomModal from "@/components/ui/CustomModal";

export default function ConfirmLogout({
    onClose,
    onLogout,
}: {
    onClose: () => void;
    onLogout: () => void;
}) {
    return (
        <CustomModal
            modalType={E_modalType.logout}
            onClose={onClose}
            actionBar={
                <>
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        disableRipple
                        className={clsx(["custom-button", "primary-button"])}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        disableRipple
                        className={clsx(["custom-button", "secondary-button"])}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </>
            }
        >
            <div className={"custom-modal-title"}>Confirm logout</div>
            <div className={"custom-modal-content"}>
                Are you sure you want to logout?
            </div>
        </CustomModal>
    );
}
