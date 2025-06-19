import { FabricJSEditor } from "fabricjs-react";
import { T_shapeUpdateData } from "../types/types";
import { Canvas, FabricImage } from "fabric";
import { getItemByName } from "./fabric-utils";
import { adjustBackgroundToAspectRatio, getBgImgDimensions } from "./bg-utils";
import paper from "paper";
import {
    getZoomData,
    handleMouseDownForZoom,
    handleMouseMoveForZoom,
    handleMouseUpForZoom,
    handleMouseWheelForZoom,
} from "./zoom-utils";

export const initializeEditor = (editor: FabricJSEditor | undefined) => {
    const canvas = editor?.canvas;
    if (!canvas) return;
    paper.setup([canvas.width || 1024, canvas.height || 512]);
    canvas.defaultCursor = "auto";
};

export const initialiseCanvasBehaviour = (updateData: T_shapeUpdateData) => {
    const { canvas } = updateData;
    attachCanvasEvents(updateData);

    //----Global canvas behaviour-----
    canvas.preserveObjectStacking = true;
    canvas.selectionColor = "#9e5aff10";
    canvas.selectionBorderColor = "#9e5aff";
    canvas.selectionLineWidth = 1;
    canvas.selection = true;
    canvas.fireRightClick = true;
    canvas.fireMiddleClick = true;
    canvas.stopContextMenu = true;
    canvas.centeredKey = "shiftKey";
    canvas.enableRetinaScaling = true;
};

export const attachCanvasEvents = (updateData: T_shapeUpdateData) => {
    const { canvas, xrayContext } = updateData;
    canvas.off();
    canvas.on("mouse:down", (opt) => {
        console.log("canvas click ", opt);
        const { target } = opt;
        if (!target) return;
        const name = target.get("name");
        if (name === "xrayImgBackground") {
            const { setSelectedConditionId } = xrayContext;
            setSelectedConditionId(null);
            canvas.discardActiveObject();
        }
    });

    canvas.on("mouse:down", (iEvt: any) => {
        // console.log("canvas mouse:down");
        handleMouseDownForZoom(iEvt, canvas);
        const { isDragging } = getZoomData();
        if (isDragging) return;
    });
    canvas.on("mouse:up", (iEvt: any) => {
        // console.log("canvas mouse:up");
        const { wasDragging } = handleMouseUpForZoom(iEvt, canvas);
        if (wasDragging) return;
    });
    canvas.on("mouse:move", (iEvt) => {
        // console.log("canvas mouse:move");
        const { isDragging, maybeDragging } = handleMouseMoveForZoom(
            iEvt,
            canvas
        );
        if (isDragging) return;
    });
    canvas.on("mouse:wheel", (opt) => {
        handleMouseWheelForZoom(opt, canvas, {
            maxZoom: 40,
            minZoom: 0.25,
            zoomToPoint: true,
            updateData,
        });
    });
};

export const prepareCanvasForAPI = (canvas: Canvas) => {
    const { bgLeft, bgTop, bgWidth, bgHeight } = getBgImgDimensions(canvas);
    const preparedForAPI = canvas.toDataURL({
        format: "jpeg",
        quality: 1,
        left: bgLeft,
        top: bgTop,
        height: bgHeight,
        width: bgWidth,
        multiplier: 1,
    });
    return preparedForAPI;
};
export const handleResize = (canvas: Canvas) => {
    const bgImg = getItemByName(canvas, "xrayImgBackground") as FabricImage;
    if (bgImg) {
        adjustBackgroundToAspectRatio(canvas, bgImg);
        bgImg.set({
            top: canvas.height / 2,
            left: canvas.width / 2,
        });
    }
};

export const decodeName = (name: string) => {
    const parts = name.split("-");
    const [type, classId, index] = parts;
    return {
        type,
        classId,
        index,
    };
};
