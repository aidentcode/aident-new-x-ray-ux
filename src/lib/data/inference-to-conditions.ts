import { classDataOPG } from "./classDataOPG";
import { classDataRVG } from "./classDataRVG";
import {
    E_conditionMetricId,
    E_conditionStatus,
    E_opgClassId,
    E_rvgClassId,
    E_xrayType,
} from "../enums";
import {
    T_condition,
    T_conditionMetric,
    T_inferenceResponse,
    T_overlayFabricData,
    T_xrayClassData,
} from "../types/types";
import { roundForDisplay } from "../utils";

export const inferenceToConditions = (
    overlayFabricData: T_overlayFabricData[],
    inferenceResponse: T_inferenceResponse,
    xrayType: E_xrayType
): T_condition[] => {
    const conditions: T_condition[] = [];
    const classData = xrayType === E_xrayType.rvg ? classDataRVG : classDataOPG;
    const { result } = inferenceResponse;

    overlayFabricData.forEach((overlay, index) => {
        const {
            name,
            classId,
            clippedImageSrc,
            clippedImageSrc2,
            measurement,
            parentOverlayName,
        } = overlay;
        console.log("overlay.name=", name, name.split("-"));
        console.log("classId=", classId);
        console.log("index=", index);
        const classIndex = parseInt(name.split("-")[2]);
        console.log("classIndex=", classIndex);

        let label = classData[classId].label || "";
        if (name.split("-")[0] === "lineSegment") {
            label = `${measurement}mm critical distance ${
                !!parseInt(classId) ? "(" + label + ")" : ""
            }`;
        }

        const { areas, distances } = result || {};
        const area =
            classData[classId].showArea && areas && areas[classIndex]
                ? areas[classIndex]
                : undefined;
        const criticalTimeline = computeCriticalTimeline(
            classData[classId],
            (areas && areas[index]) || 0
        );

        let criticalDistance = "";
        const distanceData =
            distances && distances[classIndex]
                ? distances[classIndex]
                : undefined;
        if (distanceData) {
            console.log("classIndex=", classIndex);
            console.log("distanceData=", distanceData);
            console.log(
                "distanceData2=",
                distanceData ? distanceData[1] : undefined
            );
            console.log("distances=", distances);
            console.log("criticalDistance=", criticalDistance);

            criticalDistance = computeCriticalDistance(
                classId,
                distanceData ? distanceData[1] : undefined
            );
        }

        conditions.push({
            ...classData[classId],
            label,
            needToDraw: true,
            bbox: result.bbox[classIndex],
            masks: result.masks[classIndex],
            distance: result.distances[classIndex]
                ? result.distances[classIndex][1]
                : null,
            id: overlay.conditionId,
            area,
            criticalTimeline,
            criticalDistance,
            // status: "pending",
            isHidden: false,
            clippedImageSrc,
            clippedImageSrc2,
            status: E_conditionStatus.pending,
            parentOverlayName,
        });
    });

    conditions.sort((a, b) => a.label.localeCompare(b.label));
    // console.log("conditions=", conditions);

    return conditions;
};

const computeCriticalDistance = (
    classId: E_opgClassId | E_rvgClassId,
    criticalDistance?: number
) => {
    if (!criticalDistance) {
        return "";
    }
    //Currently only caries has critical distance
    console.log("classId=", classId);
    if (![E_opgClassId.caries, E_rvgClassId.caries].includes(classId)) {
        return "";
    }
    let distanceMsg = "";
    if (criticalDistance && criticalDistance < 0.5) {
        distanceMsg = `Involving pulp (${roundForDisplay(
            criticalDistance,
            2
        )}mm)`;
    } else if (criticalDistance >= 0.5 || criticalDistance <= 2.9) {
        distanceMsg = `Advanced (${roundForDisplay(criticalDistance, 2)}mm)`;
    } else if (criticalDistance >= 3) {
        distanceMsg = `Initial to Moderate (${roundForDisplay(
            criticalDistance,
            2
        )}mm)`;
    }
    return distanceMsg;
};

const computeCriticalTimeline = (classData: T_xrayClassData, area: number) => {
    const classId = classData.classId as E_opgClassId | E_rvgClassId;
    let criticalTimeline = "";
    //return "Typically, an attrition progresses at rate of 0.98 mm in a year";

    if ([E_opgClassId.abscess, E_rvgClassId.abscess].includes(classId)) {
        const diameter = Math.round(Math.sqrt(area / 3.14) * 2);
        if (diameter > 0 && diameter < 3) {
            criticalTimeline = "Diameter is 0 to 3 mm; needs RCT";
        } else if (diameter >= 3 && diameter <= 8) {
            criticalTimeline = "Diameter is 3 to 8 mm";
        } else if (diameter > 8) {
            criticalTimeline =
                "Diameter is more than 8 mm; needs surgical interventions";
        } else {
            criticalTimeline = "Unable to find";
        }
    }
    if ([E_opgClassId.attrition, E_rvgClassId.attrition].includes(classId)) {
        criticalTimeline =
            "Typically, an attrition progresses at rate of 0.98 mm in a year";
    }

    if ([E_opgClassId.furcation, E_rvgClassId.furcation].includes(classId)) {
        let length = 0;
        length = Math.round(Math.sqrt(area) * 1.32);
        criticalTimeline = "Furcation length is " + length + " mm";
        if (length > 0 && length < 3) {
            criticalTimeline = "Length is 0 to 2 mm; Grade A furcation";
        } else if (length >= 3 && length <= 7) {
            criticalTimeline = "Length is 3 to 7 mm; Grade B furcation";
        } else if (length > 7) {
            criticalTimeline = "Length is more than 7 mm; Grade C furcation";
        } else {
            criticalTimeline = "Unable to find";
        }
    }

    if ([E_opgClassId.boneLoss, E_rvgClassId.boneLoss].includes(classId)) {
        let length = 0;
        length = Math.round(Math.sqrt(area) * 1.32);
        if (length > 0 && length < 3) {
            criticalTimeline = "Length is  0 to 2 mm  Stage I bone loss";
        } else if (length >= 3 && length <= 4) {
            criticalTimeline = "Length is 2 to 4 mm; Stage II bone loss";
        } else if (length > 4 && length < 5) {
            criticalTimeline = "Length is 4 to 5 mm; Stage III bone loss";
        } else if (length > 5) {
            criticalTimeline = "Length is more than 5 mm; Stage IV bone loss";
        } else {
            criticalTimeline = "Unable to find";
        }
    }
    return criticalTimeline;
};

export const computeConditionMetrics = (condition: T_condition) => {
    const metrics: T_conditionMetric[] = [];
    if (condition.showArea) {
        metrics.push({
            id: E_conditionMetricId.area,
            label: "Area",
            value: `${roundForDisplay(condition.area || 0, 2)} mm²`,
        });
    }
    if (condition.criticalTimeline) {
        metrics.push({
            id: E_conditionMetricId.criticalTimeline,
            label: "Critical Timeline",
            value: condition.criticalTimeline,
        });
    }
    if (condition.criticalDistance) {
        metrics.push({
            id: E_conditionMetricId.criticalDistance,
            label: "Critical Distance",
            value: condition.criticalDistance,
        });
    }
    return metrics;
};
