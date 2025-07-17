import { E_conditionMetricId, E_xrayType } from "@/lib/enums";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./conditionToolbox.module.scss";
import ColorIndicator from "../ColorIndicator";
import { useContext } from "react";
import XrayContext from "@/contexts/xrayContext";
import { classDataRVG } from "@/lib/data/classDataRVG";
import { classDataOPG } from "@/lib/data/classDataOPG";
import { decodeName } from "@/lib/canvas/canvas-utils";
import { rejectCondition, toggleHidden } from "@/lib/canvas/condition-utils";
import { T_condition, T_conditionMetric } from "@/lib/types/types";
import { roundForDisplay } from "@/lib/utils";
import clsx from "clsx";
import { computeConditionMetrics } from "@/lib/data/inference-to-conditions";

export default function ConditionToolbox() {
    const xrayContext = useContext(XrayContext);
    const { selectedConditionId, xrayType } = xrayContext;
    const { conditions } = xrayContext;

    const classData = xrayType === E_xrayType.rvg ? classDataRVG : classDataOPG;
    const { classId } = decodeName(selectedConditionId || "");
    const classDataItem = classData[classId];
    const selectedCondition = conditions.find(
        (condition) => condition.id === selectedConditionId
    );

    const handleRejectCondition = () => {
        if (selectedCondition) {
            rejectCondition(selectedCondition, xrayContext);
        }
    };

    const handleToggleHidden = () => {
        if (selectedCondition) {
            toggleHidden(selectedCondition, xrayContext);
        }
    };

    if (!selectedCondition) return null;

    //console.log("selectedCondition = ", selectedCondition);
    const metrics = computeConditionMetrics(selectedCondition);

    return (
        <div className={styles.container}>
            <div className={styles["title-container"]}>
                <ColorIndicator
                    colorCode={selectedCondition.colorCode}
                    displayType="video"
                    videos={selectedCondition.treatmentVideos}
                />
                <div className={styles["vertical-divider"]}></div>
                <div className={styles.title}>{`${classDataItem.label}`}</div>
                <div className={styles["title-icon"]}>
                    <CustomSvgIcon
                        iconId="visibility-on"
                        className={"size24"}
                        onClickCallback={handleToggleHidden}
                        tooltipText={`Toggle visibility`}
                        tooltipPlacement="top"
                    />
                    <div className={styles["vertical-divider"]}></div>
                    <CustomSvgIcon
                        iconId="delete2"
                        className={"size24"}
                        onClickCallback={handleRejectCondition}
                        tooltipText={`Reject this "${selectedCondition.label}"`}
                        tooltipPlacement="top"
                    />
                </div>
            </div>
            <div className={styles["content-container"]}>
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className={clsx([
                            styles["content-item"],
                            styles[metric.id],
                        ])}
                    >
                        <div className={styles["field"]}>{metric.label}</div>
                        <div className={styles["value"]}>{metric.value}</div>
                    </div>
                ))}
                {metrics.length === 0 && (
                    <div className={styles["content-item"]}>
                        <div className={styles["field"]}>
                            No metrics to display
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
