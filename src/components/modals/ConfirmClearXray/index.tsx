import { clsx } from "clsx";
import { Button } from "@mui/material";
import { E_modalType } from "@/lib/enums";
import CustomModal from "@/components/ui/CustomModal";

export default function ConfirmClearXray({
    onClose,
    onClearXray,
}: {
    onClose: () => void;
    onClearXray: () => void;
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
                        onClick={onClearXray}
                    >
                        Confirm
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
            <div className={"custom-modal-title"}>Are you sure?</div>
            <div className={"custom-modal-content"}>
                Any edits to the X-ray image as well as manually added
                conditions and distances will be cleared.
            </div>
        </CustomModal>
    );
}
