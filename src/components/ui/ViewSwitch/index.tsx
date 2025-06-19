import clsx from "clsx";
import styles from "./viewSwitch.module.scss";
import CustomTooltip from "../CustomToolTip";
import XrayContext from "@/contexts/xrayContext";
import { useContext } from "react";

export default function ViewSwitch() {
    const {
        splitScreenSizes,
        setSplitScreenSizes,
        imageSetup,
        setTooth3dView,
    } = useContext(XrayContext);

    const view = splitScreenSizes[0] === "100%" ? "2d" : "3d";

    const handleViewSwitch = () => {
        if (!imageSetup) {
            return;
        }
        const show3D = splitScreenSizes[0] === "100%";
        const value = show3D ? ["50%", "50%"] : ["100%", "0%"];
        setSplitScreenSizes(value);
        setTooth3dView(undefined);
    };

    return (
        <CustomTooltip
            title={`Switch view`}
            className="custom-tooltip"
            placement="bottom"
        >
            <div
                className={clsx([
                    styles.container,
                    !imageSetup && styles.disabled,
                ])}
                onClick={handleViewSwitch}
            >
                <div
                    className={clsx([
                        styles.view,
                        styles.left,
                        view === "2d" ? styles.active : styles.inactive,
                    ])}
                >
                    2D
                </div>
                <div
                    className={clsx([
                        styles.view,
                        styles.right,
                        view === "3d" ? styles.active : styles.inactive,
                    ])}
                >
                    3D
                </div>
            </div>
        </CustomTooltip>
    );
}
