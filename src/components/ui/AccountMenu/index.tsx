import { E_userRole } from "@/lib/enums";
import styles from "./accountMenu.module.scss";
import { Logout } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";

type AccountMenuProps = {
    menuId: string;
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onLogout: () => void;
    userRole?: E_userRole;
};
export default function AccountMenu({
    menuId,
    open,
    anchorEl,
    onClose,
    onLogout,
}: AccountMenuProps) {
    return (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            open={open}
            onClose={onClose}
            onClick={onClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
                            left: 14,
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
            <MenuItem
                onClick={onClose}
                className={styles["menu-item"]}
                // TODO: make this visible once profile page is implemented
                style={{ display: "none" }}
            >
                <Link className={styles["menu-item-link"]} href={"/profile"}>
                    <ListItemIcon className={styles["icon"]}>
                        <AccountCircleOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <span className={styles["item-list"]}>My account</span>
                </Link>
            </MenuItem>
            <MenuItem onClick={onLogout} className={styles["menu-item"]}>
                <div className={styles["menu-item-link"]}>
                    <ListItemIcon className={styles["icon"]}>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <span className={styles["item-list"]}>Logout</span>
                </div>
            </MenuItem>
        </Menu>
    );
}
