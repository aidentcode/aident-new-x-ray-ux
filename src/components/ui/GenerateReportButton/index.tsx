import { useContext, useRef } from "react";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./generateReportButton.module.scss";
import Draggable from "react-draggable";
import clsx from "clsx";
import { Stack } from "@mui/material";
import XrayContext from "@/contexts/xrayContext";
import CustomTooltip from "../CustomToolTip";
import { T_shapeUpdateData } from "@/lib/types/types";
import { E_xrayType } from "@/lib/enums";
import { printRVGImage } from "@/lib/print-rvg-utils";
import { printOPGImage } from "@/lib/print-opg-utils";

export default function GenerateReportButton({
    updateData,
    disabled,
}: {
    updateData?: T_shapeUpdateData;
    disabled?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const xrayContext = useContext(XrayContext);
    const { xrayType } = xrayContext;

    const startReport = () => {
        if (!updateData) {
            return;
        }
        const { canvas } = updateData;
        canvas.toCanvasElement().toBlob(function (blob: Blob | null) {
            // Also print image
            const img = new Image();
            img.onload = function () {
                // console.log("img onload=", img);
                if (xrayType === E_xrayType.rvg) {
                    printRVGImage(img, xrayContext);
                } else {
                    printOPGImage(img, xrayContext);
                }
            };
            if (blob) {
                img.src = URL.createObjectURL(blob);
            }
        });
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
                <div
                    className={clsx([
                        styles["drag-icon"],
                        "custom-drag-handle",
                    ])}
                >
                    <CustomSvgIcon iconId="drag" tooltipText="Drag to move" />
                </div>
                <div className={styles.verticalDivider}></div>

                <CustomTooltip
                    title={disabled ? "" : "Generate and download report"}
                    placement={"top"}
                >
                    <Stack
                        className={clsx([
                            styles.downloadButton,
                            disabled && styles.disabled,
                        ])}
                        onClick={startReport}
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                    >
                        <div
                            className={clsx([
                                styles.switchText,
                                disabled && styles.disabledText,
                            ])}
                        >
                            Generate Report
                        </div>
                        <CustomSvgIcon
                            iconId="download"
                            tooltipText=""
                            className={styles.downloadIcon}
                        />
                    </Stack>
                </CustomTooltip>
            </div>
        </Draggable>
    );
}
