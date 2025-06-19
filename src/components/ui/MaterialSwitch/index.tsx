import { useContext } from "react";
import styles from "./materialSwitch.module.scss";
import XrayContext from "@/contexts/xrayContext";
import CircleIcon from "@mui/icons-material/Circle";
import LanguageIcon from "@mui/icons-material/Language";
import clsx from "clsx";

export default function MaterialSwitch() {
    const xrayContext = useContext(XrayContext);
    const { toothMaterial, setToothMaterial } = xrayContext;

    return (
        <div className={styles.container}>
            <div
                className={clsx([
                    styles.view,
                    styles.solid,
                    toothMaterial === "solid" && styles.active,
                ])}
                onClick={() => setToothMaterial("solid")}
            >
                <CircleIcon className={styles.icon} />
            </div>
            <div
                className={clsx([
                    styles.view,
                    styles.wireframe,
                    toothMaterial === "wireframe" && styles.active,
                ])}
                onClick={() => setToothMaterial("wireframe")}
            >
                <LanguageIcon className={styles.icon} />
            </div>
        </div>
    );
}
