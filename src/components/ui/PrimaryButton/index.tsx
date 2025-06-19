import clsx from "clsx";
import styles from "./primaryButton.module.scss";

export default function PrimaryButton({
    btnTitle,
    onClick,
    disabled,
    className,
}: {
    btnTitle: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}) {
    return (
        <button
            className={clsx(styles.button, className, {
                [styles.disabled]: disabled,
            })}
            onClick={onClick}
        >
            {btnTitle}
        </button>
    );
}
