import { E_colorCode, E_xrayType } from "@/lib/enums";
import styles from "./toothToolbox.module.scss";
import ColorIndicator from "../ColorIndicator";
import PrimaryButton from "../PrimaryButton";
import XrayContext from "@/contexts/xrayContext";
import { useContext } from "react";
import { classDataOPG } from "@/lib/data/classDataOPG";
import { classDataRVG } from "@/lib/data/classDataRVG";
import { decodeName } from "@/lib/canvas/canvas-utils";

export default function ToothToolbox() {
    const {
        splitScreenSizes,
        setSplitScreenSizes,
        imageSetup,
        xrayType,
        selectedConditionId,
        conditions,
    } = useContext(XrayContext);

    const handleViewIn3D = () => {
        if (!imageSetup) {
            return;
        }
        setSplitScreenSizes(
            splitScreenSizes[0] === "100%" ? ["50%", "50%"] : ["100%", "0%"]
        );
    };
    const { classId } = decodeName(selectedConditionId || "");
    const classData = xrayType === E_xrayType.rvg ? classDataRVG : classDataOPG;
    const classDataItem = classData[classId];
    // console.log("conditions=", conditions);
    // console.log("selectedConditionId=", selectedConditionId);
    // console.log("classId", classId);
    const teethList = conditions.filter((x) => x.classId === classId);
    // console.log("teethList", teethList);
    const toothNumber =
        (teethList.findIndex((x) => x.id === selectedConditionId) || 0) + 1;

    return (
        <div className={styles.container}>
            <div className={styles["title-container"]}>
                <ColorIndicator
                    colorCode={E_colorCode.white}
                    displayType="video"
                />
                <div className={styles["vertical-divider"]}></div>
                <div
                    className={styles.title}
                >{`${classDataItem.label} ${toothNumber}`}</div>
                <div className={styles["title-icon"]}>
                    <PrimaryButton
                        btnTitle="View in 3D"
                        onClick={handleViewIn3D}
                        disabled={false}
                        className={styles["view-in-3d-button"]}
                    />
                </div>
            </div>
            <div className={styles["content-container"]}>
                {/* <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem /> */}
            </div>
        </div>
    );
}
