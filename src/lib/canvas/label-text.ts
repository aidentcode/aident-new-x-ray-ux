import { Textbox } from "fabric";
import { E_opgClassId, E_rvgClassId } from "../enums";

type T_classLabelTextData = {
    classLabel: string;
    classId: E_opgClassId | E_rvgClassId;
    index: number;
    top: number;
    left: number;
    backgroundColor: string;
    textColor?: string;
};
export const createClassLabelText = (data: T_classLabelTextData): Textbox => {
    const {
        classLabel,
        classId,
        index,
        top,
        left,
        backgroundColor,
        textColor,
    } = data;

    const classText = new Textbox(`${classLabel}`, {
        name: ["text", classId, index].join("-"),
        left, // Adjust the position as needed
        top, // Adjust the position as needed
        fontSize: 12, // Set the font size for the class_id and class_label text
        fontFamily: "sans-serif",
        fontWeight: 400,
        fill: textColor || "white", //color, // Set the color for the text (white will be visible on most colors)
        perPixelTargetFind: false,
        textBackgroundColor: backgroundColor,
        visible: true,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
        selectable: false,
    });
    return classText;
};
