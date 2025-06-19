import { Canvas, Circle, FabricImage, Group, Line, Textbox } from "fabric";
import {
    T_distanceData,
    T_overlayFabricData,
    T_point2D,
    T_xrayClassData,
} from "../types/types";
import { createSelectClip } from "./clip-utils";
import { E_opgClassId, E_rvgClassId } from "../enums";
import { getColorFromCodeCode } from "../data/colorData";

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
    const [x1, y1, x2, y2, measurement] = lineData;
    const width = x2 - x1;
    const height = y2 - y1;

    const line = new Line([x1, y1, x2, y2], {
        name: ["line", classId, index].join("-"),
        stroke: color, // color of the border
        strokeWidth: 1, // thickness of the border
        perPixelTargetFind: true,
    });
    const middle = getMiddle(x1, y1, x2, y2); //{ x: (x1 + x2) * 0.5, y: (y1 + y2) * 0.5 };
    const measurementText = new Textbox(`${measurement}${unit || "mm"}`, {
        name: ["measurementText", classId, index].join("-"),
        left: middle.x, // Adjust the position as needed
        top: middle.y, // Adjust the position as needed
        fontSize: 12, // Set the font size for the class_id and class_label text
        fontFamily: "sans-serif",
        fontWeight: 300,
        textBackgroundColor: color,
        fill: "white", // Set the color for the text (white will be visible on most colors)
        perPixelTargetFind: false,
        originX: "center",
        originY: "center",
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
