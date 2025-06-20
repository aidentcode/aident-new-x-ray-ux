import { useEditor } from "@/hooks/useEditor";
import styles from "./xrayCanvas.module.scss";
import { FabricJSCanvas } from "fabricjs-react";
import { useResizeDetector } from "react-resize-detector";
import { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { T_shapeUpdateData } from "@/lib/types/types";
import XrayContext from "@/contexts/xrayContext";
import { FabricImage } from "fabric";
import ToolboxLayer from "../ui/ToolboxLayer";
import { validateInferenceResult } from "@/lib/data/validate-inference";
import ErrorModal from "../modals/ErrorModal";
import { handleResize, prepareCanvasForAPI } from "@/lib/canvas/canvas-utils";
import { initialiseBackgroundImage } from "@/lib/canvas/bg-utils";
import { drawOverlays, updateOverlays } from "@/lib/canvas/overlay-utils";
import { inferenceToConditions } from "@/lib/data/inference-to-conditions";
import { updateOverviews } from "@/lib/data/inference-to-overview";
import useEventListener from "@use-it/event-listener";
import { handleKeyDown, handleKeyUp } from "@/lib/keyboard-utils";
import { setShapeUpdateData } from "@/lib/global-cache";
import { FabricObjectMap } from "@/lib/init/globalVars";

export default function XrayCanvas() {
    const xrayContext = useContext(XrayContext);
    const {
        base64ImgFromFile,
        setBase64ImgFromCanvas,
        setOriginalState,
        originalState,
        inferenceResponse,
        setInferenceResponse,
        conditions,
        setConditions,
        xrayType,
    } = xrayContext;

    const canvasResizeDetector = useResizeDetector({
        handleHeight: true,
        handleWidth: true,
        skipOnMount: false,
        refreshMode: "debounce",
        refreshRate: 500,
    });
    const canvasContainerRef = canvasResizeDetector.ref;
    const {
        editor,
        canvas,
        initEditor,
        initCanvasBehavior,
        //restoreCanvasZoom,
        onReady,
    } = useEditor();

    useEventListener("keydown", (e) =>
        handleKeyDown(e as KeyboardEvent, xrayContext)
    );
    useEventListener("keyup", (e) => handleKeyUp(e as KeyboardEvent));

    useEffect(() => {
        if (
            canvas &&
            canvasResizeDetector.width &&
            canvasResizeDetector.height
        ) {
            console.log("resize canvas");
            canvas.setDimensions({
                width: canvasResizeDetector.width,
                height: canvasResizeDetector.height,
            });
            handleResize(canvas);
            //restoreCanvasZoom(canvas);
        }
    }, [
        canvas,
        //restoreCanvasZoom,
        canvasResizeDetector.width,
        canvasResizeDetector.height,
    ]);

    const updateData: T_shapeUpdateData | undefined = useMemo(() => {
        if (!canvas) return undefined;
        const t: T_shapeUpdateData = {
            canvas,
            xrayContext,
        };
        return t;
    }, [canvas, xrayContext]);
    if (updateData) {
        setShapeUpdateData(updateData);
    }

    useEffect(() => {
        if (!editor || !updateData || !!originalState) return;

        initEditor(editor);
        initCanvasBehavior(updateData);
        console.log("initialise editor");

        FabricImage.fromURL(base64ImgFromFile, {
            crossOrigin: "anonymous",
        }).then((xrayImgBackground: FabricImage) => {
            if (!xrayImgBackground || !canvas) return;
            // console.log("initialise xrayImgBackground");
            initialiseBackgroundImage(canvas, xrayImgBackground);
            //const originalState = canvas.toDatalessJSON(["name", "selectable"]);
            setOriginalState(canvas.toDatalessJSON(["name", "selectable"]));
            setBase64ImgFromCanvas(prepareCanvasForAPI(canvas));
        });
    }, [
        editor,
        updateData,
        initEditor,
        initCanvasBehavior,
        canvas,
        base64ImgFromFile,
        setBase64ImgFromCanvas,
        setOriginalState,
        originalState,
    ]);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
        setInferenceResponse(null);
    };

    if (inferenceResponse && updateData) {
        if (!validateInferenceResult(inferenceResponse) && !isErrorModalOpen) {
            setIsErrorModalOpen(true);
        } else {
            if (!conditions || !conditions.length) {
                // console.log("draw overlays");
                drawOverlays(updateData, (overlayData) => {
                    // console.log("overlayData", overlayData);
                    const conditions = inferenceToConditions(
                        overlayData,
                        inferenceResponse,
                        xrayType
                    );
                    setConditions(conditions);
                    updateOverviews(conditions, xrayContext);
                    conditions.forEach((condition) => {
                        FabricObjectMap[condition.id] = 1;
                    });
                });
            } else {
                updateOverlays(updateData);
            }
        }
    }

    return (
        <>
            {isErrorModalOpen && <ErrorModal onClose={closeErrorModal} />}

            <div className={styles.container}>
                <ToolboxLayer updateData={updateData} />

                <div
                    className={styles.canvasContainer}
                    ref={canvasContainerRef}
                >
                    <FabricJSCanvas
                        className={styles["shape-editor-canvas"]}
                        onReady={onReady}
                    />
                </div>
            </div>
        </>
    );
}
