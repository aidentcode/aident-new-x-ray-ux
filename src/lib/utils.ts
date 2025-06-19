import { T_clamp } from "./types/types";

export const clamp = (v: number, min: number, max: number) => {
    return v > max ? max : v < min ? min : v;
};
export const clampMin = (v: number, min: number) => {
    return v < min ? min : v;
};
export const clampMax = (v: number, max: number) => {
    return v > max ? max : v;
};

export const clampCheck = (v: number, clamp: T_clamp) => {
    const tol = clamp.tol || 0;
    return v > clamp.max - tol ? 1 : v < clamp.min + tol ? -1 : 0;
};
export const roundForDisplay = (number: number, decimalPoints = 2) => {
    const multiplier = Math.pow(10, decimalPoints);
    // console.log("rounded=", Math.round(number * multiplier) / multiplier);
    return Math.round(number * multiplier) / multiplier;
};
