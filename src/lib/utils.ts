import { Vector3 } from "three";
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
export const rnd1 = (number: number) => {
    return roundForDisplay(number, 1);
};
export const rnd2 = (number: number) => {
    return roundForDisplay(number, 2);
};
export const rnd3 = (number: number) => {
    return roundForDisplay(number, 3);
};
export const rnd4 = (number: number) => {
    return roundForDisplay(number, 4);
};
export const vrnd1 = (v: Vector3) => {
    return new Vector3(rnd1(v.x), rnd1(v.y), rnd1(v.z));
};
export const vrnd2 = (v: Vector3) => {
    return new Vector3(rnd2(v.x), rnd2(v.y), rnd2(v.z));
};
