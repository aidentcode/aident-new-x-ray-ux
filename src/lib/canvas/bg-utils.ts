import { Canvas, FabricImage } from "fabric";
import { deleteItemByName, getItemByName } from "./fabric-utils";

export const initialiseBackgroundImage = (
    canvas: Canvas,
    bgImg: FabricImage
) => {
    adjustBackgroundToAspectRatio(canvas, bgImg);
    bgImg.set({
        name: "xrayImgBackground",
        selectable: false,
        angle: 0,
        originX: "center",
        originY: "center",
        top: canvas.height / 2,
        left: canvas.width / 2,
    });
    deleteItemByName(canvas, "xrayImgBackground");
    canvas.add(bgImg);
};

export const adjustBackgroundToAspectRatio = (
    canvas: Canvas,
    bgImg: FabricImage
) => {
    const canvasAR = canvas.width / canvas.height;
    const bgImgAR = bgImg.width / bgImg.height;

    if (canvasAR < bgImgAR) {
        bgImg.scaleToWidth(canvas.width);
    } else {
        bgImg.scaleToHeight(canvas.height);
    }
};
export const getBgImgDimensions = (canvas: Canvas) => {
    const canvasAR = canvas.width / canvas.height;
    const bgImg = getItemByName(canvas, "xrayImgBackground") as FabricImage;
    // console.log("bgImg", bgImg);
    if (!bgImg)
        return {
            bgTop: 0,
            bgLeft: 0,
            bgWidth: canvas.width,
            bgHeight: canvas.height,
        };
    const bgImgAR = bgImg.width / bgImg.height;

    let bgLeft = 0,
        bgTop = 0,
        bgWidth = canvas.width,
        bgHeight = canvas.height;
    if (canvasAR < bgImgAR) {
        bgHeight = canvas.width / bgImgAR;
        bgTop = (canvas.height - bgHeight) * 0.5;
    } else {
        bgWidth = bgImgAR * canvas.height;
        bgLeft = (canvas.width - bgWidth) * 0.5;
    }
    return { bgTop, bgLeft, bgWidth, bgHeight };
};
