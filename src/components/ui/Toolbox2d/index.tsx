import { useContext, useRef } from "react";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./toolbox2d.module.scss";
import Draggable from "react-draggable";
import clsx from "clsx";
import XrayContext from "@/contexts/xrayContext";

export default function Toolbox2d({
    disabled,
    onClickCallback,
}: {
    disabled?: boolean;
    onClickCallback?: (iconId: string) => void;
}) {
    const xrayContext = useContext(XrayContext);
    const { editMode, inferenceResponse } = xrayContext;

    const postInferenceDisabled = disabled || !inferenceResponse;
    const preInferenceDisabled = disabled || !!inferenceResponse;

    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = (iconId: string) => {
        // console.log("handleClick iconId=", iconId);
        if (onClickCallback) {
            onClickCallback(iconId);
        }
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
                <CustomSvgIcon
                    iconId="addCondition"
                    className={styles.toolboxIcon}
                    tooltipText="Insert a condition"
                    tooltipPlacement="right"
                    disabled={true || postInferenceDisabled}
                    onClickCallback={() => handleClick("addCondition")}
                />
                <div className={styles.marginDivider}></div>
                <CustomSvgIcon
                    iconId="drawLine"
                    className={styles.toolboxIcon}
                    tooltipText="Add a critical distance"
                    tooltipPlacement="right"
                    disabled={true || postInferenceDisabled}
                    onClickCallback={() => handleClick("drawLine")}
                />
                <div className={styles.horizontalDivider}></div>
                <CustomSvgIcon
                    iconId="flipHorizontal"
                    className={styles.toolboxIcon}
                    tooltipText="Flip horizontally"
                    tooltipPlacement="right"
                    disabled={preInferenceDisabled}
                    onClickCallback={() => handleClick("flipHorizontal")}
                />
                <div className={styles.marginDivider}></div>
                <CustomSvgIcon
                    iconId="flipVertical"
                    className={styles.toolboxIcon}
                    tooltipText="Flip vertically"
                    tooltipPlacement="right"
                    disabled={preInferenceDisabled}
                    onClickCallback={() => handleClick("flipVertical")}
                />
                <div className={styles.marginDivider}></div>
                <CustomSvgIcon
                    iconId="crop"
                    className={styles.toolboxIcon}
                    tooltipText="Crop"
                    tooltipPlacement="right"
                    disabled={true || preInferenceDisabled}
                    onClickCallback={() => handleClick("crop")}
                />
                <div className={styles.marginDivider}></div>
                <CustomSvgIcon
                    iconId="rotate"
                    className={styles.toolboxIcon}
                    tooltipText="Rotate"
                    tooltipPlacement="right"
                    disabled={preInferenceDisabled}
                    active={editMode === "rotate"}
                    onClickCallback={() => handleClick("rotate")}
                />
                <div className={styles.horizontalDivider}></div>
                <CustomSvgIcon
                    iconId="reset"
                    className={styles.toolboxIcon}
                    tooltipText="Restore original X-ray"
                    tooltipPlacement="right"
                    disabled={disabled}
                    onClickCallback={() => handleClick("reset")}
                />
                <div className={styles.horizontalDivider}></div>
                <div
                    className={clsx([
                        styles["header-container"],
                        "custom-drag-handle",
                    ])}
                >
                    <CustomSvgIcon
                        iconId="drag"
                        tooltipText="Drag to move"
                        tooltipPlacement="right"
                    />
                </div>
            </div>
        </Draggable>
    );
}
