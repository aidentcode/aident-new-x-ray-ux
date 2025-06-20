import { T_condition } from "../types/types";
import { E_conditionStatus } from "../enums";
import { T_xrayContext } from "@/contexts/xrayContext";
import { updateOverviews } from "../data/inference-to-overview";
import { FabricObjectMap } from "../init/globalVars";

export const rejectCondition = (
    item: T_condition,
    xrayContext: T_xrayContext
) => {
    const { conditions, setConditions } = xrayContext;

    const newConditions = conditions.map((condition) => {
        if (condition.id === item.id) {
            delete FabricObjectMap[condition.id];
            return { ...condition, status: E_conditionStatus.rejected };
        }
        return condition;
    });
    setConditions(newConditions);
    updateOverviews(newConditions, xrayContext);
};

export const toggleHidden = (item: T_condition, xrayContext: T_xrayContext) => {
    const { conditions, setConditions } = xrayContext;

    const newConditions = conditions.map((condition) => {
        if (condition.id === item.id) {
            FabricObjectMap[condition.id] = 0;
            return { ...condition, isHidden: !condition.isHidden };
        }
        return condition;
    });
    setConditions(newConditions);
    updateOverviews(newConditions, xrayContext);
};
