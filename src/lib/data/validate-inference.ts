import { T_inferenceResponse } from "../types/types";

export const validateInferenceResult = (
    inferenceResponse: T_inferenceResponse | undefined
) => {
    if (!inferenceResponse) return false;
    const { result } = inferenceResponse;
    const { bbox, class_ids, masks } = result;
    if (
        !Array.isArray(bbox) ||
        !Array.isArray(class_ids) ||
        !Array.isArray(masks)
    )
        return false;

    if (bbox.length !== class_ids.length) return false;
    if (class_ids.length !== masks.length) return false;
    return true;
};
