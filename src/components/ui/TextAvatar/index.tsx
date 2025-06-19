import clsx from "clsx";
import styles from "./textAvatar.module.scss";

type TextAvatarProps = {
    fullName?: string;
    email: string;
    forceUpperCase?: boolean;
    isHovering?: boolean;
};
export default function TextAvatar({
    fullName,
    email,
    forceUpperCase = true,
    isHovering,
}: TextAvatarProps) {
    let parts: string[] = [],
        toUpperCase = forceUpperCase;
    if (fullName) {
        parts = fullName.split(" ");
        toUpperCase = true;
    } else {
        const t = email.split("@")[0];
        parts = t.split(".");
        if (parts.length === 1) {
            parts = t.split("_");
        }
        if (parts.length === 1) {
            parts = t.split("-");
        }
    }
    let label = "";
    if (parts.length > 1) {
        label = [parts[0].slice(0, 1), parts[1].slice(0, 1)].join("");
    } else if (parts.length === 1) {
        label = parts[0].slice(0, 2);
    }

    if (toUpperCase) label = label.toUpperCase();
    else label = label.toLowerCase();

    return (
        <div
            className={clsx([
                styles.container,
                isHovering && styles.active,
                "backward",
            ])}
        >
            {label}
        </div>
    );
}
