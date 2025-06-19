import { T_shapeUpdateData } from "@/lib/types/types";
import { Group, Line, Textbox } from "fabric";

declare const FabricObjectMap: Record<string, number>;

export const drawScale = (updateData: T_shapeUpdateData) => {
    const canvas = updateData.canvas;
    if (!canvas) return;
    FabricObjectMap["scale"] = 1;
    const canvasHeight = canvas.getHeight();

    console.log("drawScale", FabricObjectMap);

    const hLine = new Line([0, 0, 80, 0], {
        stroke: "white",
        name: "hLine",
        strokeWidth: 0.5,
    });
    const vLine0 = new Line([0, 0.25, 0, -10], {
        stroke: "white",
        name: "vLine",
        strokeWidth: 0.5,
    });
    const vLine1 = new Line([20, 0.25, 20, -7], {
        stroke: "white",
        name: "vLine",
        strokeWidth: 0.5,
    });
    const vLine2 = new Line([40, 0.25, 40, -10], {
        stroke: "white",
        name: "vLine",
        strokeWidth: 0.5,
    });
    const vLine3 = new Line([60, 0.25, 60, -7], {
        stroke: "white",
        name: "vLine",
        strokeWidth: 0.5,
    });
    const vLine4 = new Line([80, 0.25, 80, -10], {
        stroke: "white",
        name: "vLine",
        strokeWidth: 0.5,
    });
    const text = new Textbox("8mm", {
        fontSize: 10,
        fill: "#d1b1c1",
        name: "text",
        width: 30,
        height: 10,
        left: 85,
        top: -11,
        textAlign: "center",
        fontFamily: "Arial",
        fontWeight: "normal",
    });
    const group = new Group([
        hLine,
        vLine0,
        vLine1,
        vLine2,
        vLine3,
        vLine4,
        text,
    ]);
    group.set("name", "scale");
    group.set("selectable", false);
    group.set("left", 30);
    group.set("top", canvasHeight * 0.5 - 50);
    group.set("originX", "center");
    group.set("originY", "center");

    canvas.add(group);
};
