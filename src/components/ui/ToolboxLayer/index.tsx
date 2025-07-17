import { useContext } from "react";
import XrayContext from "@/contexts/xrayContext";
import styles from "./toolboxLayer.module.scss";
import ZoomToolbox from "../ZoomToolbox";
import Toolbox2d from "../Toolbox2d";
import { T_shapeUpdateData } from "@/lib/types/types";
import { getItemByName } from "@/lib/canvas/fabric-utils";
import { FabricImage } from "fabric";
import { E_editMode, E_rvgClassId, E_xrayType } from "@/lib/enums";
import RotateToolbox from "../RotateToolbox";
import ConditionToolbox from "../ConditionToolbox";
import ToothToolbox from "../ToothToolbox";
import { decodeName } from "@/lib/canvas/canvas-utils";
import SmoothCurveSwitch from "../SmoothCurveSwitch";

type ToolboxLayerProps = {
    updateData?: T_shapeUpdateData;
};
export default function ToolboxLayer({ updateData }: ToolboxLayerProps) {
    const {
        imageSetup,
        setEditMode,
        originalState,
        editMode,
        selectedConditionId,
        xrayType,
        //setBase64ImgFromCanvas
    } = useContext(XrayContext);

    const { classId } = decodeName(selectedConditionId || "");
    const { canvas } = updateData || {};
    let left = 0;
    let top = 0;
    const heightScale = classId === E_rvgClassId.tooth ? 0.5 : 1;
    if (selectedConditionId && canvas) {
        const t = getItemByName(canvas, selectedConditionId);
        if (t && "left" in t && "top" in t) {
            left = (t.left || 0) + 10;
            top = (t.top || 0) + t.getScaledHeight() * heightScale + 10;
        }
    }

    const handleToolboxClick = (iconId: string) => {
        if (!updateData) return;
        const { canvas } = updateData;
        console.log("iconId=", iconId);
        setEditMode(E_editMode.none);
        switch (iconId) {
            case "addCondition":
                break;
            case "drawLine":
                break;
            case "flipHorizontal": {
                const xrayImgBackground = getItemByName(
                    canvas,
                    "xrayImgBackground"
                ) as FabricImage;
                if (xrayImgBackground) {
                    xrayImgBackground.set("flipX", !xrayImgBackground.flipX);
                    canvas.requestRenderAll();
                    //setBase64ImgFromCanvas(prepareCanvasForAPI(canvas));
                }
                break;
            }
            case "flipVertical": {
                const xrayImgBackground = getItemByName(
                    canvas,
                    "xrayImgBackground"
                ) as FabricImage;
                if (xrayImgBackground) {
                    xrayImgBackground.set("flipY", !xrayImgBackground.flipY);
                    canvas.requestRenderAll();
                    //setBase64ImgFromCanvas(prepareCanvasForAPI(canvas));
                }
                break;
            }
            case "crop":
                break;
            case "rotate":
                if (editMode === E_editMode.rotate) {
                    setEditMode(E_editMode.none);
                } else {
                    setEditMode(E_editMode.rotate);
                }
                break;
            case "reset": {
                if (originalState) {
                    canvas.clear();
                    canvas.loadFromJSON(originalState).then(() => {
                        canvas.renderAll();
                        canvas.setZoom(1);
                    });
                }
                break;
            }
        }
    };

    return (
        <>
            <div className={styles.left}>
                <Toolbox2d
                    disabled={!imageSetup}
                    onClickCallback={handleToolboxClick}
                />
            </div>
            <div className={styles.leftBottom}>
                {/* <ZoomToolbox disabled={!imageSetup} /> */}
                <SmoothCurveSwitch disabled={!imageSetup} />
            </div>
            <div className={styles.bottom}>
                {editMode === "rotate" && updateData && (
                    <RotateToolbox
                        disabled={!imageSetup}
                        updateData={updateData}
                    />
                )}
            </div>
            <div
                style={{
                    position: "absolute",
                    top: `${top}px`,
                    left: `${left}px`,
                    zIndex: 1000,
                }}
            >
                {xrayType === E_xrayType.rvg && (
                    <>
                        {classId === E_rvgClassId.tooth && <ToothToolbox />}
                        {classId !== E_rvgClassId.tooth && <ConditionToolbox />}
                    </>
                )}
                {xrayType === E_xrayType.opg && <>{<ConditionToolbox />}</>}
            </div>
        </>
    );
}
