import { T_shapeUpdateData } from "./types/types";

//Global variables that are Non-reactive are kept in this file
export const globalCache: {
    shapeUpdateData: T_shapeUpdateData | undefined;
} = {
    shapeUpdateData: undefined,
};

//-------Shape Update Data------------------
export const setShapeUpdateData = (shapeUpdateData: T_shapeUpdateData) => {
    globalCache.shapeUpdateData = shapeUpdateData;
};
export const getShapeUpdateData = () => {
    return globalCache.shapeUpdateData;
};
