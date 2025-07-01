import { Canvas, Circle, FabricImage, Group, Line, Textbox } from "fabric";
import {
    T_distanceData,
    T_overlayFabricData,
    T_point2D,
    T_xrayClassData,
} from "../types/types";
import { createSelectClip } from "./clip-utils";
import { E_opgClassId, E_rvgClassId } from "../enums";
import { getColorFromCodeCode, hexToRgba } from "../data/colorData";
import { hexToRgb } from "@mui/material";

export const addDistanceLines = (
    data: {
        canvas: Canvas;
        distances: Array<T_distanceData | null>;
        class_ids: number[];
        classData: Record<string, T_xrayClassData>;
        bgImgObj: FabricImage;
    },
    callback: (distanceOverlays: T_overlayFabricData[]) => void
) => {
    const { canvas, distances, class_ids, classData, bgImgObj } = data;

    const distanceOverlays: T_overlayFabricData[] = [];
    if (!distances || !distances.length) {
        callback(distanceOverlays);
        return;
    }
    let count = 0;
    distances.forEach((distanceData, index) => {
        const classId = class_ids[index];
        const color = getColorFromCodeCode(classData[classId].colorCode);
        if (distanceData && distanceData.length) {
            addDistanceLine(
                canvas,
                {
                    lineData: distanceData2LineData(distanceData),
                    unit: "mm",
                    classId: classId.toString(),
                    index,
                    color,
                    bgImgObj,
                    classData,
                },
                (eventPayload) => {
                    count++;
                    distanceOverlays.push(eventPayload);
                    if (callback && count === distances.length) {
                        callback(distanceOverlays);
                    }
                }
            );
        } else {
            count++;
            if (callback && count === distances.length) {
                callback(distanceOverlays);
            }
        }
    });
};

type T_lineData = [
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    measurement: number
];
type T_addDistanceLineData = {
    lineData: T_lineData;
    unit: string;
    classId: string;
    index: number;
    color: string;
    bgImgObj: FabricImage;
    classData: Record<string, T_xrayClassData>;
};
export const addDistanceLine = (
    canvas: Canvas,
    data: T_addDistanceLineData,
    onAdd: (eventPayload: T_overlayFabricData) => void
) => {
    // console.log("addDistanceLine=", data);
    const { lineData, classId, index, color, unit, bgImgObj, classData } = data;
    let [x1, y1, x2, y2, measurement] = lineData;
    const width = x2 - x1;
    const height = y2 - y1;
    // console.log("x1,y1,x2,y2,measurement=", x1, y1, x2, y2, measurement);
    // console.log("bgImgObj=", bgImgObj.getBoundingRect());

    //TODO: This is since distance numbers are not normalised
    const bgImgBoundingRect = bgImgObj.getBoundingRect();
    x1 = x1 + bgImgBoundingRect.left;
    y1 = y1 + bgImgBoundingRect.top;
    x2 = x2 + bgImgBoundingRect.left;
    y2 = y2 + bgImgBoundingRect.top;

    const line = new Line([x1, y1, x2, y2], {
        name: ["line", classId, index].join("-"),
        stroke: color, // color of the border
        strokeWidth: 1, // thickness of the border
        perPixelTargetFind: true,
    });
    const middle = getMiddle(x1, y1, x2, y2); //{ x: (x1 + x2) * 0.5, y: (y1 + y2) * 0.5 };
    const lineLength = getDistance(x1, y1, x2, y2);
    // console.log("color=", color, hexToRgba(color, 0.5));
    const rgbaColor = hexToRgba(color, 0.5);
    // console.log("lineLength=", lineLength);
    const measurementText = new Textbox(`${measurement}${unit || "mm"}`, {
        name: ["measurementText", classId, index].join("-"),
        left: middle.x, // Adjust the position as needed
        //top: middle.y, // Adjust the position as needed
        top: lineLength < 40 ? Math.min(y1, y2) - 10 : middle.y, // Adjust the position as needed
        fontSize: 12, // Set the font size for the class_id and class_label text
        fontFamily: "sans-serif",
        fontWeight: 300,
        textBackgroundColor: `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a})`,
        fill: "white", // Set the color for the text (white will be visible on most colors)
        perPixelTargetFind: false,
        originX: "center",
        originY: "center",
        visible: false, //Not visible by default
    });
    const startPoint = new Circle({
        radius: 2,
        fill: color,
        left: x1 + 0.5,
        top: y1 + 0.5,
        originX: "center",
        originY: "center",
    });
    const endPoint = new Circle({
        radius: 2,
        fill: color,
        left: x2 + 0.5,
        top: y2 + 0.5,
        originX: "center",
        originY: "center",
    });

    const groupName = ["lineSegment", classId, index].join("-");
    const group = new Group([line, startPoint, endPoint, measurementText], {
        left: middle.x,
        top: middle.y,
        originX: "center",
        originY: "center",
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
    });
    group.set({
        name: groupName,
    });
    group.on("mouseover", () => {
        console.log("mouseover");
        measurementText.set({ visible: true });
        canvas.requestRenderAll();
    });
    group.on("mouseout", () => {
        console.log("mouseout");
        measurementText.set({ visible: false });
        canvas.requestRenderAll();
    });

    canvas.add(group);
    const eventPayload: T_overlayFabricData = {
        type: group.type,
        classId: classId as E_opgClassId | E_rvgClassId,
        index,
        measurement,
        name: groupName,
        conditionId: groupName,
        classLabel: classData[classId].label || "",
    };
    createSelectClip(
        canvas,
        {
            group,
            bgImgObj,
            left: x1,
            top: y1,
            width,
            height,
            paddingPct: 20,
            minWidth: 100,
            minHeight: 100,
        },
        (clipResult) => {
            if (onAdd) onAdd({ ...eventPayload, ...clipResult });
        }
    );
};

export const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
export const getMiddle = (x1: number, y1: number, x2: number, y2: number) => {
    return { x: (x1 + x2) * 0.5, y: (y1 + y2) * 0.5 };
};
export const distanceData2LineData = (distanceData: T_distanceData) => {
    // return distanceData;
    // console.log("distanceData=", distanceData);
    const [pointsData, distance] = distanceData;
    const getPoint = (pstr: T_point2D | string) => {
        return typeof pstr === "string"
            ? JSON.parse(pstr.split(" ").join(","))
            : [...pstr];
    };
    const p1 = getPoint(pointsData[0]),
        p2 = getPoint(pointsData[1]);
    return [...p1, ...p2, Math.round(1000 * distance) / 1000] as T_lineData;
};
