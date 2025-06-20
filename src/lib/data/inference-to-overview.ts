import { T_xrayContext } from "@/contexts/xrayContext";
import {
    E_conditionStatus,
    E_opgClassId,
    E_rvgClassId,
    E_xrayType,
} from "../enums";
import {
    T_inferenceResponse,
    T_condition,
    T_overviewItem,
    T_xrayClassData,
} from "../types/types";
import { classDataOPG } from "./classDataOPG";
import { classDataRVG } from "./classDataRVG";
import { FabricObjectMap } from "../init/globalVars";

export const updateOverviews = (
    conditions: T_condition[],
    xrayContext: T_xrayContext
) => {
    const { xrayType, setOverviewItems, setOverviewHash } = xrayContext;
    const { overviewItems, overviewHash } = conditions2Overview(
        conditions,
        xrayType
    );
    setOverviewItems(overviewItems);
    setOverviewHash(overviewHash);
};

export const conditions2Overview = (
    conditions: T_condition[],
    xrayType: E_xrayType
) => {
    const classData = xrayType === E_xrayType.rvg ? classDataRVG : classDataOPG;
    const overviewHash: Record<string, T_overviewItem> =
        getEmptyOverviewHash(classData);

    conditions.forEach((condition) => {
        if (condition.status !== E_conditionStatus.rejected) {
            const classId = condition.classId;
            if (overviewHash[classId]) {
                overviewHash[classId].items.push(condition);
            } else {
                overviewHash[classId] = {
                    ...classData[classId],
                    items: [condition],
                    isHidden: false,
                    status: E_conditionStatus.pending,
                };
            }
        }
    });

    const overviewItems: T_overviewItem[] = [];
    Object.values(overviewHash).forEach((item) => {
        overviewItems.push(item);
    });
    overviewItems.sort((a, b) => a.label.localeCompare(b.label));

    return { overviewItems, overviewHash };
};
export const inference2Overview = (
    inferenceResponse: T_inferenceResponse,
    xrayType: E_xrayType
) => {
    const classData = xrayType === E_xrayType.rvg ? classDataRVG : classDataOPG;

    const { result } = inferenceResponse;
    const { class_ids } = result;

    const overviewHash: Record<string, T_overviewItem> =
        getEmptyOverviewHash(classData);
    class_ids.forEach((class_id) => {
        if (overviewHash[class_id]) {
            overviewHash[class_id].items.push(classData[class_id]);
        } else {
            overviewHash[class_id] = {
                ...classData[class_id],
                items: [classData[class_id]],
                isHidden: false,
                status: E_conditionStatus.pending,
            };
        }
    });

    const overviewItems: T_overviewItem[] = [];

    Object.values(overviewHash).forEach((item) => {
        overviewItems.push(item);
    });
    overviewItems.sort((a, b) => a.label.localeCompare(b.label));

    return { overviewItems, overviewHash };
};

export const setOverviewValue = (
    classId: E_rvgClassId | E_opgClassId,
    key: keyof T_overviewItem,
    value: string | number | boolean,
    xrayContext: T_xrayContext
) => {
    const {
        overviewHash,
        setOverviewHash,
        overviewItems,
        setOverviewItems,
        conditions,
        setConditions,
    } = xrayContext;

    const newOverviewItems: T_overviewItem[] = overviewItems.map((item) => {
        if (item.classId === classId) {
            return { ...item, [key]: value };
        }
        return item;
    });

    const newOverviewHash: Record<string, T_overviewItem> = {};
    Object.entries(overviewHash).forEach(([key, value]) => {
        if (key === classId) {
            newOverviewHash[key] = {
                ...value,
                [key]: value,
            };
        } else {
            newOverviewHash[key] = value;
        }
    });
    const newConditions = conditions.map((condition) => {
        if (condition.classId === classId) {
            FabricObjectMap[condition.id] = 0;
            return { ...condition, [key]: value };
        }
        return condition;
    });
    setConditions(newConditions);
    setOverviewItems(newOverviewItems);
    setOverviewHash(newOverviewHash);
};

const getEmptyOverviewHash = (classData: Record<string, T_xrayClassData>) => {
    const overviewHash: Record<string, T_overviewItem> = {};
    Object.values(classData).forEach((item) => {
        overviewHash[item.classId] = {
            ...item,
            items: [],
            isHidden: false,
            status: E_conditionStatus.pending,
        };
    });
    return overviewHash;
};
