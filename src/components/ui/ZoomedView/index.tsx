import { E_userRole } from "@/lib/enums";
import styles from "./zoomedView.module.scss";
import { Menu } from "@mui/material";
import { T_condition } from "@/lib/types/types";
import Image from "next/image";

type ZoomedViewProps = {
    condition: T_condition;
    menuId: string;
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    userRole?: E_userRole;
};
export default function ZoomedView({
    condition,
    menuId,
    open,
    anchorEl,
    onClose,
}: ZoomedViewProps) {
    return (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            open={open}
            onClose={onClose}
            onClick={onClose}
            // transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            className={styles.container}
            MenuListProps={{
                sx: {
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        minWidth: 200,
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 20,
                            height: 20,
                            ml: 0,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                },
            }}
        >
            <div className={styles.imgContainer}>
                <Image
                    src={condition.clippedImageSrc || ""}
                    alt={condition.label}
                    className={styles.img}
                    width={100}
                    height={100}
                    unoptimized
                    style={{
                        objectFit: "contain",
                    }}
                />
            </div>
        </Menu>
    );
}
