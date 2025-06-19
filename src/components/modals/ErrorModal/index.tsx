import { clsx } from "clsx";
import { Button } from "@mui/material";
import { E_modalType } from "@/lib/enums";
import CustomModal from "@/components/ui/CustomModal";

export default function ErrorModal({ onClose }: { onClose: () => void }) {
    return (
        <CustomModal
            modalType={E_modalType.error}
            onClose={onClose}
            actionBar={
                <>
                    <Button
                        variant="contained"
                        color="secondary"
                        disableElevation
                        disableRipple
                        className={clsx(["custom-button", "primary-button"])}
                        onClick={onClose}
                    >
                        Okay
                    </Button>
                </>
            }
        >
            <div className={"custom-modal-title"}>Something went wrong</div>
            <div className={"custom-modal-content"}>
                AI could not diagnose. Recheck RVG or OPG settings as well as
                the X-ray image. If this persists, please contact support
            </div>
        </CustomModal>
    );
}
