import {
    T_overlayFabricData,
    T_point2D,
    T_shapeUpdateData,
    T_xrayClassData,
} from "@/lib/types/types";
import { getItemByName } from "@/lib/canvas/fabric-utils";
import { Canvas, FabricImage, FabricObject, Group, Rect } from "fabric";
import {
    E_colorCode,
    E_conditionStatus,
    E_opgClassId,
    E_rvgClassId,
    E_xrayType,
} from "@/lib/enums";
import { classDataRVG } from "@/lib/data/classDataRVG";
import { classDataOPG } from "@/lib/data/classDataOPG";
import { getBgImgDimensions } from "./bg-utils";
import { addDistanceLines } from "./distance-lines";
import { createClassLabelText } from "./label-text";
import { createMask } from "./mask-utils";
import { createSelectClip } from "./clip-utils";
import { getColorFromCodeCode, hexToRgba } from "../data/colorData";
import { removeAllObjects } from "./fabric-utils";
import { decodeName } from "./canvas-utils";
import { T_xrayContext } from "@/contexts/xrayContext";
import { FabricObjectMap } from "../init/globalVars";

export const updateOverlays = (updateData: T_shapeUpdateData) => {
    const { canvas, xrayContext } = updateData;
    if (!canvas) return;
    const { conditions } = xrayContext;

    let flag = false;
    conditions.forEach((condition) => {
        if (!FabricObjectMap[condition.id]) {
            flag = true;
            const group = getItemByName(canvas, condition.id) as Group;
            if (group) {
                const isHidden =
                    condition.isHidden ||
                    condition.status === E_conditionStatus.rejected;
                group.set("visible", isHidden ? false : true);
            }
        }
    });
    if (flag) canvas.requestRenderAll();
};

export const drawOverlays = (
    updateData: T_shapeUpdateData,
    onComplete: (overlayData: T_overlayFabricData[]) => void
) => {
    const { canvas, xrayContext } = updateData;
    if (!canvas) return;
    const { inferenceResponse, xrayType } = xrayContext;
    if (!inferenceResponse) return;

    removeAllObjects(canvas, ["xrayImgBackground"]);

    const { bbox, class_ids, masks, distances } = inferenceResponse.result;

    const bgImgObj = getItemByName(canvas, "xrayImgBackground") as FabricImage;
    const rectangleOverlayData: T_overlayFabricData[] = [];

    const { bgLeft, bgTop, bgWidth, bgHeight } = getBgImgDimensions(canvas);
    const classData = xrayType === E_xrayType.rvg ? classDataRVG : classDataOPG;

    bbox.forEach((rectPoints, index) => {
        const [x1, y1, x2, y2] = rectPoints;
        const classId = (class_ids[index] + "") as E_opgClassId | E_rvgClassId;
        if (classId === E_rvgClassId.tooth) {
            const colorCode = classData[classId].colorCode;
            addRectangle(
                canvas,
                {
                    x1: x1 + bgLeft,
                    y1: y1 + bgTop,
                    x2: x2 + bgLeft,
                    y2: y2 + bgTop,
                    classId,
                    index,
                    colorCode,
                    normalisedPoints: masks[index],
                    bgImgObj,
                    isEditable: false,
                    boundingWidth: bgWidth,
                    boundingHeight: bgHeight,
                    classData,
                    xrayContext,
                },
                (eventPayload) => {
                    rectangleOverlayData.push(eventPayload);
                    // if (rectangleOverlayData.length !== bbox.length) return;
                    // addDistanceLines(
                    //     { canvas, distances, class_ids, classData, bgImgObj },
                    //     (distanceOverlays) => {
                    //         onComplete([
                    //             ...rectangleOverlayData,
                    //             ...distanceOverlays,
                    //         ]);
                    //     }
                    // );
                }
            );
        }
    });

    bbox.forEach((rectPoints, index) => {
        const [x1, y1, x2, y2] = rectPoints;
        const classId = (class_ids[index] + "") as E_opgClassId | E_rvgClassId;
        if (classId !== E_rvgClassId.tooth) {
            const colorCode = classData[classId].colorCode;
            addRectangle(
                canvas,
                {
                    x1: x1 + bgLeft,
                    y1: y1 + bgTop,
                    x2: x2 + bgLeft,
                    y2: y2 + bgTop,
                    classId,
                    index,
                    colorCode,
                    normalisedPoints: masks[index],
                    bgImgObj,
                    isEditable: false,
                    boundingWidth: bgWidth,
                    boundingHeight: bgHeight,
                    classData,
                    xrayContext,
                },
                (eventPayload) => {
                    rectangleOverlayData.push(eventPayload);
                    if (rectangleOverlayData.length !== bbox.length) return;
                    addDistanceLines(
                        { canvas, distances, class_ids, classData, bgImgObj },
                        (distanceOverlays) => {
                            onComplete([
                                ...rectangleOverlayData,
                                ...distanceOverlays,
                            ]);
                        }
                    );
                }
            );
        }
    });
};

type T_addRectangleData = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    classId: E_opgClassId | E_rvgClassId;
    index: number;
    colorCode: E_colorCode;
    normalisedPoints: T_point2D[];
    bgImgObj: FabricImage;
    isEditable: boolean;
    boundingWidth: number;
    boundingHeight: number;
    classData: Record<string, T_xrayClassData>;
    xrayContext: T_xrayContext;
};

export const addRectangle = (
    canvas: Canvas,
    data: T_addRectangleData,
    onAdd: (result: T_overlayFabricData) => void
) => {
    const {
        x1,
        y1,
        x2,
        y2,
        classId,
        index,
        colorCode,
        normalisedPoints,
        bgImgObj,
        isEditable,
        boundingWidth,
        boundingHeight,
        classData,
        xrayContext,
    } = data;

    const { xrayType, setSelectedConditionId, setTabId } = xrayContext;

    const color = getColorFromCodeCode(colorCode);

    const strokeWidth = 0.5;

    const width = x2 - x1;
    const height = y2 - y1;
    const rect = new Rect({
        name: ["rect", classId, index].join("-"),
        left: x1, // x-coordinate of top-left corner
        top: y1, // y-coordinate of top-left corner
        width: width, // width of rectangle
        height: height, // height of rectangle
        fill: "transparent", // make it transparent inside
        stroke: color, // color of the border
        strokeWidth, // thickness of the border
        perPixelTargetFind: true,
        visible: false,
        selectable: false,
    });

    // canvas.add(rect);
    const classLabel = classData[classId].label || "";
    const groupItems: FabricObject[] = [rect];

    let mask: FabricObject | null = null;
    if (normalisedPoints) {
        const { smoothedPath } = createMask(canvas, {
            normalisedPoints,
            classId,
            index,
            color,
            left: x1,
            top: y1,
            boundingWidth,
            boundingHeight,
        });
        mask = smoothedPath;
        if (mask) groupItems.push(mask);
        //groupItems.push(polygon);
    }
    let classText: FabricObject | null = null;
    if (classLabel) {
        classText = createClassLabelText({
            classId,
            index,
            classLabel,
            backgroundColor: color,
            textColor: classData[classId].textColorCode
                ? getColorFromCodeCode(classData[classId].textColorCode)
                : undefined,
            top: y1 + strokeWidth - 1 + 0.25 * height,
            left: x1 + strokeWidth - 1 + 0.25 * width,
        });
        if (classText) {
            classText.set({
                visible: false,
            });
            groupItems.push(classText);
        }
    }

    const groupName = ["classGroup", classId, index].join("-");
    const group = new Group(groupItems, {
        left: x1,
        top: y1,
        perPixelTargetFind: true,
        selectable: true,
        hasControls: false,
        borderColor: "transparent",
        lockScalingX: isEditable ? false : true,
        lockScalingY: isEditable ? false : true,
        lockRotation: isEditable ? false : true,
        lockMovementX: isEditable ? false : true,
        lockMovementY: isEditable ? false : true,
    });

    group.set({
        name: groupName,
        lockUniScaling: isEditable ? false : true,
        // visible: checkDefaultVisibility(xrayType, classId),
        perPixelTargetFind: true,
        opacity: checkDefaultVisibility(xrayType, classId) ? 1 : 0.01,
    });

    group.off();
    group.on("selected", (e) => {
        console.log("selected", e);
        console.log("groupName", groupName);
        setSelectedConditionId(groupName);
        setTabId("list");
        canvas.requestRenderAll();
    });
    group.on("mouseover", (e) => {
        const target = e.target as Group;
        if (!target) return;
        const name = target.get("name");
        const { classId } = decodeName(name);
        const classDataItem = classData[classId];
        const color = getColorFromCodeCode(classDataItem.colorCode);
        const t1 = hexToRgba(color, 0.6);
        const rgbaColorString1 = `rgba(${t1.r}, ${t1.g}, ${t1.b}, ${t1.a})`;
        if (mask) {
            mask.set({
                fill: rgbaColorString1,
                strokeWidth: 1,
            });
        }
        if (classText) {
            classText.set({ visible: true });
        }

        group.set({
            opacity: 1,
        });

        canvas.requestRenderAll();
    });
    group.on("mouseout", (e) => {
        const target = e.target as FabricObject;
        if (!target) return;
        // console.log("mouseout", target);
        const name = target.get("name");
        const { classId } = decodeName(name);
        const classDataItem = classData[classId];
        const color = getColorFromCodeCode(classDataItem.colorCode);
        const t1 = hexToRgba(color, 0.5);
        const rgbaColorString1 = `rgba(${t1.r}, ${t1.g}, ${t1.b}, ${t1.a})`;

        if (mask) {
            mask.set({
                fill: rgbaColorString1,
                strokeWidth: 0.5,
            });
        }
        if (classText) {
            classText.set({ visible: false });
        }

        group.set({
            opacity: checkDefaultVisibility(
                xrayType,
                classId as E_opgClassId | E_rvgClassId
            )
                ? 1
                : 0.01,
        });

        canvas.requestRenderAll();
    });

    canvas.add(group);

    const rectangleResult: T_overlayFabricData = {
        type: group.type,
        classId,
        index,
        classLabel,
        name: groupName,
        conditionId: groupName,
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
            if (onAdd) onAdd({ ...rectangleResult, ...clipResult });
        }
    );
};

const checkDefaultVisibility = (
    xrayType: E_xrayType,
    classId: E_opgClassId | E_rvgClassId
) => {
    let classIds: Array<E_opgClassId | E_rvgClassId> = [];
    if (xrayType === E_xrayType.rvg) {
        classIds = [E_rvgClassId.tooth, E_rvgClassId.unknown];
    } else {
        classIds = [E_opgClassId.unknown];
    }

    return classIds.includes(classId) ? false : true;
};
