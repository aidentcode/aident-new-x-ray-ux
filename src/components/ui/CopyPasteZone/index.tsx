import styles from "./copyPasteZone.module.scss";

import CustomSvgIcon from "../CustomSvgIcon";

export default function CopyPasteZone() {
    return (
        <div className={styles.container}>
            <CustomSvgIcon iconId="copyPaste" />
            <div className={styles.title}>
                Click here to copy-paste from the clipboard
            </div>
        </div>
    );
}
