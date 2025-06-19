import clsx from "clsx";
import styles from "./xrayTypeSwitch.module.scss";
import CustomTooltip from "../CustomToolTip";
import { useContext } from "react";
import XrayContext from "@/contexts/xrayContext";
import { E_xrayType } from "@/lib/enums";

export default function XrayTypeSwitch() {
    const xrayContext = useContext(XrayContext);
    const { xrayType, setXrayType } = xrayContext;

    const handleClick = () => {
        setXrayType(
            xrayType === E_xrayType.rvg ? E_xrayType.opg : E_xrayType.rvg
        );
    };

    return (
        <CustomTooltip
            title={`Switch X-Ray Type`}
            className="custom-tooltip"
            placement="bottom"
        >
            <div className={styles.container} onClick={handleClick}>
                <div
                    className={clsx([
                        styles.xrayType,
                        xrayType === E_xrayType.rvg && styles.active,
                    ])}
                >
                    RVG
                </div>
                <div
                    className={clsx([
                        styles.xrayType,
                        xrayType === E_xrayType.opg && styles.active,
                    ])}
                >
                    OPG
                </div>
            </div>
        </CustomTooltip>
    );
}
