import { classDataOPG } from "./classDataOPG";
import { classDataRVG } from "./classDataRVG";
import { E_conditionStatus, E_xrayType } from "../enums";
import {
    T_condition,
    T_inferenceResponse,
    T_overlayFabricData,
} from "../types/types";

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
        } = overlay;

        let label = classData[classId].label || "";
        if (name.split("-")[0] === "lineSegment") {
            label = `${measurement}mm critical distance ${
                !!parseInt(classId) ? "(" + label + ")" : ""
            }`;
        }

        const { areas } = result || {};
        const area =
            classData[classId].showArea && areas && areas[index]
                ? areas[index]
                : undefined;

        conditions.push({
            ...classData[classId],
            label,
            needToDraw: true,
            bbox: result.bbox[index],
            masks: result.masks[index],
            distance: result.distances[index]
                ? result.distances[index][1]
                : null,
            id: overlay.conditionId,
            area,
            // status: "pending",
            isHidden: false,
            clippedImageSrc,
            clippedImageSrc2,
            status: E_conditionStatus.pending,
        });
    });

    conditions.sort((a, b) => a.label.localeCompare(b.label));
    // console.log("conditions=", conditions);

    return conditions;
};
