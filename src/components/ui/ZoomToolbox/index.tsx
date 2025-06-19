import { useRef } from "react";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./zoomToolbox.module.scss";
import Draggable from "react-draggable";
import clsx from "clsx";

export default function ZoomToolbox({ disabled }: { disabled?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

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
                <div
                    className={clsx([
                        styles["drag-icon"],
                        "custom-drag-handle",
                    ])}
                >
                    <CustomSvgIcon iconId="drag" tooltipText="Drag to move" />
                </div>
                <div className={styles.verticalDivider}></div>
                <CustomSvgIcon
                    iconId="zoom-plus"
                    className={styles.toolboxIcon}
                    tooltipText="Zoom In"
                    disabled={disabled}
                />
                <div className={styles.marginDivider}></div>
                <CustomSvgIcon
                    iconId="zoom-reset"
                    className={styles.toolboxIcon}
                    tooltipText="Reset zoom and pan"
                    disabled={disabled}
                />
                <div className={styles.marginDivider}></div>
                <CustomSvgIcon
                    iconId="zoom-minus"
                    className={styles.toolboxIcon}
                    tooltipText="Zoom Out"
                    disabled={disabled}
                />
            </div>
        </Draggable>
    );
}
