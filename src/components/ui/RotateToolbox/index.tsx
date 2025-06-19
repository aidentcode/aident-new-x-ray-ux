import Draggable from "react-draggable";
import clsx from "clsx";
import styles from "./rotateToolbox.module.scss";
import { useContext, useRef } from "react";
import CustomSvgIcon from "../CustomSvgIcon";
import XrayContext from "@/contexts/xrayContext";
import { E_editMode } from "@/lib/enums";
import { Slider } from "@mui/material";
import { T_shapeUpdateData } from "@/lib/types/types";
import { getItemByName } from "@/lib/canvas/fabric-utils";
import { FabricImage } from "fabric";
import { roundForDisplay } from "@/lib/utils";

export default function RotateToolbox({
    disabled,
    updateData,
}: {
    disabled?: boolean;
    updateData: T_shapeUpdateData;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const xrayContext = useContext(XrayContext);
    const { setEditMode, rotationAngle, setRotationAngle } = xrayContext;

    const { canvas } = updateData;
    const xrayImgBackground = getItemByName(
        canvas,
        "xrayImgBackground"
    ) as FabricImage;

    const handleChange = (event: Event, newValue: number) => {
        // console.log("newValue=", newValue);
        const updatedRotationAngle = roundForDisplay(newValue, 1);
        setRotationAngle(updatedRotationAngle);
        xrayImgBackground.set("angle", updatedRotationAngle);
        canvas.requestRenderAll();
    };

    return (
        <Draggable
            nodeRef={containerRef as React.RefObject<HTMLElement>}
            handle=".custom-drag-handle"
            bounds="parent"
        >
            <div
                ref={containerRef}
                className={clsx([
                    styles.container,
                    disabled && styles.disabled,
                ])}
            >
                <div className={styles.titleContainer}>
                    <div
                        className={clsx([
                            styles["drag-icon"],
                            "custom-drag-handle",
                        ])}
                    >
                        <CustomSvgIcon
                            iconId="drag"
                            tooltipText="Drag to move"
                        />
                    </div>
                    <div className={styles.verticalDivider}></div>
                    <div className={styles.title}>Apply rotation</div>
                    <div className={styles.closeIcon}>
                        <CustomSvgIcon
                            iconId="close"
                            tooltipText="Close"
                            tooltipPlacement="top"
                            onClickCallback={() => {
                                setEditMode(E_editMode.none);
                            }}
                        />
                    </div>
                </div>
                <div className={styles.sliderContainer}>
                    <Slider
                        size="small"
                        value={rotationAngle}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        step={1}
                        min={-180}
                        max={180}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </Draggable>
    );
}
