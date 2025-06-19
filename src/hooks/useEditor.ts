import { useCallback, useMemo } from "react";
import { FabricJSEditor, useFabricJSEditor } from "fabricjs-react";

import { initialiseCanvasBehaviour } from "@/lib/canvas/canvas-utils";
import { initializeEditor } from "@/lib/canvas/canvas-utils";
import { T_shapeUpdateData } from "@/lib/types/types";
import { restoreZoom } from "@/lib/canvas/zoom-utils";
import { Canvas } from "fabric";
export const useEditor = () => {
    const { editor, onReady, selectedObjects } = useFabricJSEditor();
    const canvas = editor?.canvas;

    // Memoize the editor initialization
    const initEditor = useCallback((editor: FabricJSEditor | undefined) => {
        initializeEditor(editor);
    }, []);

    // Memoize the canvas behavior initialization
    const initCanvasBehavior = useCallback((updateData: T_shapeUpdateData) => {
        initialiseCanvasBehaviour(updateData);
    }, []);

    // Memoize the zoom restoration
    const restoreCanvasZoom = useCallback((canvas: Canvas | undefined) => {
        if (canvas) {
            console.log("restoreZoom");
            restoreZoom(canvas);
        }
    }, []);

    // Memoize the editor and canvas objects
    const editorState = useMemo(
        () => ({
            editor,
            canvas,
            onReady,
            selectedObjects,
            initEditor,
            initCanvasBehavior,
            restoreCanvasZoom,
        }),
        [
            editor,
            canvas,
            onReady,
            selectedObjects,
            initEditor,
            initCanvasBehavior,
            restoreCanvasZoom,
        ]
    );

    return editorState;
};
