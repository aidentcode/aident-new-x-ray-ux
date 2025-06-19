import { Avatar } from "@mui/material";
import clsx from "clsx";
import styles from "./avatarWithFallback.module.scss";
import TextAvatar from "../TextAvatar";

type AvatarWithFallbackProps = {
    name?: string;
    userName?: string;
    email: string;
    image?: string;
    forceUpperCase?: boolean;
    isHovering?: boolean;
};
export function AvatarWithFallback({
    name,
    userName,
    email,
    image,
    forceUpperCase,
    isHovering,
}: AvatarWithFallbackProps) {
    return (
        <>
            {!!image && (
                <Avatar
                    alt="avatar"
                    src={image}
                    className={clsx([styles["avatar"], "backward"])}
                />
            )}
            {!image && (
                <TextAvatar
                    fullName={name || userName}
                    email={email}
                    forceUpperCase={forceUpperCase}
                    isHovering={isHovering}
                />
            )}
        </>
    );
}
