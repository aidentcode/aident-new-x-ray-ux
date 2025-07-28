import { Canvas, FabricImage, Group, Rect } from "fabric";

type T_createClipData = {
    group: Group;
    bgImgObj: FabricImage;
    left: number;
    top: number;
    width: number;
    height: number;
    paddingPct: number;
    minWidth: number;
    minHeight: number;
};
export type T_clipResult = {
    clippedImageSrc: string;
    clippedImageSrc2: string;
};
export const createSelectClip = (
    canvas: Canvas,
    {
        group,
        bgImgObj,
        left,
        top,
        width,
        height,
        paddingPct,
        minWidth,
        minHeight,
    }: T_createClipData,
    onCreate: (result: T_clipResult) => void
) => {
    if (!bgImgObj) return;
    const clipResult = {
        clippedImageSrc: "",
        clippedImageSrc2: "",
    };
    const groupCanvas = group.toCanvasElement({ width });
    const clip = (clippedImage: FabricImage) => {
        const canvasAR = canvas.width / canvas.height;
        const bgImgAR = bgImgObj.width / bgImgObj.height;
        let offsetTop = 0,
            offsetLeft = 0;

        let scaleFactor = 1;
        if (canvasAR < bgImgAR) {
            //when scaled to width
            scaleFactor = bgImgObj.width / canvas.width;
            offsetTop = (canvas.height - bgImgObj.height / scaleFactor) * 0.5;
        } else {
            //when scaled to height
            scaleFactor = bgImgObj.height / canvas.height;
            offsetLeft = (canvas.width - bgImgObj.width / scaleFactor) * 0.5;
        }

        let paddingWidth = (width * paddingPct) / 100;
        let paddingHeight = (height * paddingPct) / 100;
        if (width + paddingWidth < minWidth) {
            paddingWidth = minWidth - width;
        }
        if (height + paddingHeight < minHeight) {
            paddingHeight = minHeight - height;
        }

        const clipLeft = left - 0.5 * canvas.width - 0.5 * paddingWidth;
        const clipTop = top - 0.5 * canvas.height - 0.5 * paddingHeight; //-37.5 * 2;
        const clipWidth = width + paddingWidth;
        const clipHeight = height + paddingHeight; //37.5 * 4;

        clippedImage.set({
            clipPath: new Rect({
                //clip path is relative to the center of the bgImg irrespective of the origin of the bgImg
                left: clipLeft * scaleFactor,
                top: clipTop * scaleFactor,
                width: clipWidth * scaleFactor,
                height: clipHeight * scaleFactor,
            }),
        });

        const clippedCanvas = clippedImage.toCanvasElement({
            left: clipLeft + canvas.width * 0.5 - offsetLeft,
            top: clipTop + canvas.height * 0.5 - offsetTop,
            width: clipWidth,
            height: clipHeight,
            enableRetinaScaling: true,
            multiplier: 1,
        });
        clipResult.clippedImageSrc = clippedCanvas.toDataURL();
        clipResult.clippedImageSrc2 = groupCanvas.toDataURL();
    };
    bgImgObj.clone().then((clonedObj: FabricImage) => {
        clip(clonedObj);
        if (onCreate) onCreate(clipResult);
    });
};
