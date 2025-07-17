import { Canvas, Path, Point, Polygon } from "fabric";
import { E_opgClassId, E_rvgClassId, E_xrayType } from "../enums";
import { T_point2D } from "../types/types";
import { hexToRgba } from "../data/colorData";
import paper from "paper";
import { T_xrayContext } from "@/contexts/xrayContext";

type T_createMaskData = {
    normalisedPoints: T_point2D[];
    classId: E_opgClassId | E_rvgClassId;
    index: number;
    color: string;
    left: number;
    top: number;
    boundingWidth: number;
    boundingHeight: number;
    xrayContext: T_xrayContext;
};

export const createMask = (canvas: Canvas, data: T_createMaskData) => {
    const {
        normalisedPoints,
        classId,
        index,
        color,
        left,
        top,
        boundingWidth,
        boundingHeight,
        xrayContext,
    } = data;

    const points = normalisedPoints.map((point) => {
        const [x, y] = point;
        const adjustedX = x * boundingWidth;
        const adjustedY = y * boundingHeight;

        // Create a Fabric.js point
        return new Point(adjustedX, adjustedY);
    });
    // Create the polygon
    const polygonName = ["mask", classId, index].join("-");
    const smoothedPathName = ["smoothMask", classId, index].join("-");

    const t1 = hexToRgba(color, 0.1);
    const rgbaColorString1 = `rgba(${t1.r}, ${t1.g}, ${t1.b}, ${t1.a})`;
    //console.log("rgbaColorString1=", rgbaColorString1);

    const pathOptions = {
        stroke: color,
        fill: rgbaColorString1,
        strokeWidth: 2,
        perPixelTargetFind: true,
        left,
        top,
    };
    const polygon = new Polygon(points, { ...pathOptions, stroke: "black" });
    polygon.set({
        name: polygonName,
        selectable: false,
    });

    const paperPath = new paper.Path();
    for (let i = 0; i < points.length; i++) {
        const paperPoint = new paper.Point(points[i].x, points[i].y);
        paperPath.add(paperPoint);
    }
    paperPath.closed = true;

    if (xrayContext.smoothCurves) {
        paperPath.simplify(1.25);
        //-- Other options for smoothing:
        paperPath.smooth({ type: "geometric", factor: 0.2 });
        // paperPath.smooth({ type: "catmull-rom", factor: 0.0 });
        // paperPath.smooth({ type: "catmull-rom", factor: 0.5 });
        //paperPath.smooth({ type: "catmull-rom", factor: 1.0 });
    }
    const smoothedPath = paperPath2FabricPath(paperPath, pathOptions);
    smoothedPath.set({
        name: smoothedPathName,
        selectable: false,
        strokeWidth: 2,
    });

    return { polygon, smoothedPath };
};

export const checkDefaultVisibility = (
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

export const paperPath2FabricPath = (
    path: paper.Path | paper.PathItem | paper.CompoundPath,
    options?: fabric.IPathOptions
): Path => {
    const svg = path.exportSVG() as SVGElement;
    const svgPath = svg.getAttribute("d");
    if (!svgPath) return new Path("");
    const fabricPath = new Path(svgPath, options as any);
    return fabricPath;
};
