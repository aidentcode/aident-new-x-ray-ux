import { T_shapeUpdateData } from "@/lib/types/types";
import { E_fabricMouseClickCode } from "../enums";
import { clamp } from "../utils";
import { Canvas, Point, TMat2D } from "fabric";

type T_fabricMouseEvent = Event & MouseEvent;
type T_fabricWheelEvent = Event & WheelEvent;
type T_zoomOptions = {
    maxZoom: number;
    minZoom: number;
    zoomToPoint: boolean;
    updateData: T_shapeUpdateData;
};
type T_zoomData = {
    isDragging: boolean;
    wasDragging?: boolean;
    maybeDragging?: boolean;
    lastPosX: number;
    lastPosY: number;
    prevZoom: number;

    //Temporarily disabled canvas values while dragging. Should be restored to previous values
    isDrawingMode?: boolean;
    selection?: boolean;
};

const zoomData: T_zoomData = {
    isDragging: false,
    maybeDragging: false,
    lastPosX: 0,
    lastPosY: 0,
    prevZoom: 1,
};

export const handleMouseUpForZoom = (iEvt: fabric.IEvent, canvas: Canvas) => {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    if (canvas.viewportTransform)
        canvas.setViewportTransform(canvas.viewportTransform);

    const wasDragging = zoomData.isDragging;
    zoomData.isDragging = false;
    zoomData.maybeDragging = false;

    if (zoomData.isDrawingMode !== undefined)
        canvas.isDrawingMode = zoomData.isDrawingMode;
    if (zoomData.isDrawingMode !== undefined)
        canvas.selection = !!zoomData.selection;
    //else canvas.selection = true;
    return { ...zoomData, wasDragging };
};

export const handleMouseMoveForZoom = (iEvt: any, canvas: Canvas) => {
    if (!zoomData.isDragging) {
        if (zoomData.maybeDragging) {
            zoomData.maybeDragging = false;
            return { ...zoomData, maybeDragging: true };
        } else {
            return zoomData;
        }
    }
    const e = iEvt.e as T_fabricMouseEvent;
    const vpt = canvas.viewportTransform;
    if (!vpt) return zoomData;
    vpt[4] += e.clientX - zoomData.lastPosX;
    vpt[5] += e.clientY - zoomData.lastPosY;
    canvas.requestRenderAll();
    zoomData.lastPosX = e.clientX;
    zoomData.lastPosY = e.clientY;
    return zoomData;
};

export const handleMouseDownForZoom = (iEvt: any, canvas: Canvas) => {
    const evt = iEvt.e as T_fabricMouseEvent;
    if (
        evt.altKey === true ||
        evt.button === E_fabricMouseClickCode.RIGHT_CLICK
    ) {
        //------preserve canvas state------
        zoomData.selection = canvas.selection;
        canvas.selection = false;
        zoomData.isDrawingMode = canvas.isDrawingMode;
        canvas.isDrawingMode = false;

        zoomData.isDragging = true;
        zoomData.lastPosX = evt.clientX;
        zoomData.lastPosY = evt.clientY;
    } else {
        zoomData.maybeDragging = true;
    }
    return zoomData;
};

export const handleMouseDownForPan = (iEvt: any, canvas: Canvas) => {
    const evt = iEvt.e as T_fabricMouseEvent;
    //------preserve canvas state------
    zoomData.selection = canvas.selection;
    canvas.selection = false;
    zoomData.isDrawingMode = canvas.isDrawingMode;
    canvas.isDrawingMode = false;

    zoomData.isDragging = true;
    zoomData.lastPosX = evt.clientX;
    zoomData.lastPosY = evt.clientY;
    return zoomData;
};

export const getZoomData = () => {
    return zoomData;
};

export const isDefaultZoom = (canvas: Canvas): boolean => {
    const defaultZoom = getZoomDefault(canvas);
    if (canvas.getZoom() !== defaultZoom.zoom) return false;
    const vpt = canvas.viewportTransform;
    if (!vpt) return false;
    // console.log("canvas.viewportTransform=", vpt);
    for (let i = 0; i < vpt.length; i++) {
        if (vpt[i] !== defaultZoom.viewPortTransform[i]) {
            return false;
        }
    }
    return true;
};

export const handleMouseWheelForZoom = (
    iEvt: any,
    canvas: Canvas,
    opts: T_zoomOptions
) => {
    const e = iEvt.e as T_fabricWheelEvent;
    e.preventDefault();
    e.stopPropagation();

    let { maxZoom, minZoom, zoomToPoint } = opts;
    //const updateData = opts.updateData;
    if (!maxZoom) maxZoom = 60;
    if (!minZoom) minZoom = 0.01;
    if (zoomToPoint === undefined) zoomToPoint = true;
    const delta = e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > maxZoom) zoom = maxZoom;
    if (zoom < minZoom) zoom = minZoom;
    if (zoomToPoint) {
        const fabricPoint = new Point(e.offsetX, e.offsetY);
        canvas.zoomToPoint(fabricPoint, zoom);
    } else canvas.setZoom(zoom);

    //adjustZoomIndependantObjects(canvas, zoom, updateData);
};

export const restoreZoom = (
    canvas: Canvas
    //, updateData?: T_shapeUpdateData
) => {
    const { zoom, viewPortTransform } = getZoomDefault(canvas);
    canvas.setZoom(zoom);
    canvas.setViewportTransform(viewPortTransform);
    // console.log("restore zoom and pan", canvas.width, canvas.getWidth());
    //if (updateData) adjustZoomIndependantObjects(canvas, zoom, updateData);
};

export const getZoomDefault = (canvas: Canvas) => {
    const X_PAN_VALUE = canvas.width ? canvas.width * 0.5 : 0;
    const Y_PAN_VALUE = canvas.height ? canvas.height * 0.5 + 28 : 0;
    return {
        zoom: 1,
        viewPortTransform: [1, 0, 0, 1, X_PAN_VALUE, Y_PAN_VALUE] as TMat2D,
    };
};

export const getZoomIndependantScale = (zoom: number) => {
    return clamp(zoom >= 1 ? 1 / (zoom * 0.5) : 1, 0.1, 1);
};
export const getZoomIndependantStroke = (zoom: number, defaultStroke = 0.5) => {
    const s = getZoomIndependantScale(zoom);
    return {
        strokeWidth: s * defaultStroke,
        strokeDashArray: [2 * s, 1 * s],
    };
};
export const getZoomIndependantHighlightStroke = (
    zoom: number,
    defaultStroke = 0.5
) => {
    const s = getZoomIndependantScale(zoom);
    return {
        strokeWidth: s * defaultStroke,
    };
};
export const getSizeDependantHighlightStroke = (
    path: fabric.Path,
    idealStrokeWidth: number = 6
) => {
    const { width, height } = path.getBoundingRect(true);
    const size = Math.max(width, height);
    // console.log("size=", size);
    if (size >= 3 * idealStrokeWidth) return idealStrokeWidth;
    else return 0;
};
