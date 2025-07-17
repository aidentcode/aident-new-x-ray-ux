import ColorIndicator from "../ColorIndicator";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./listItem.module.scss";
import clsx from "clsx";
import { T_condition } from "@/lib/types/types";
import Image from "next/image";
import { useContext, useRef, useEffect, useState } from "react";
import XrayContext from "@/contexts/xrayContext";
import { rejectCondition, toggleHidden } from "@/lib/canvas/condition-utils";
import ZoomedView from "../ZoomedView";
import { computeConditionMetrics } from "@/lib/data/inference-to-conditions";

type ListItemProps = {
    isSelected?: boolean;
    item: T_condition;
};

export default function ListItem({ isSelected, item }: ListItemProps) {
    const xrayContext = useContext(XrayContext);
    const { overviewHash } = xrayContext;
    const itemRef = useRef<HTMLDivElement>(null);

    const colorCode = item.colorCode;
    const itemIsHidden = overviewHash[item.classId]?.isHidden || item.isHidden;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleZoomClick = (event: React.MouseEvent<HTMLElement> | null) => {
        if (!event) return;
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (isSelected && itemRef.current) {
            itemRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [isSelected]);

    const handleRejectCondition = () => {
        rejectCondition(item, xrayContext);
    };

    const handleToggleHidden = () => {
        toggleHidden(item, xrayContext);
    };
    const metrics = computeConditionMetrics(item);

    return (
        <>
            <div
                ref={itemRef}
                className={clsx([
                    styles.container,
                    isSelected && styles["selected"],
                    itemIsHidden && styles["hidden"],
                ])}
            >
                {isSelected && (
                    <div
                        className={clsx([
                            styles["selectionIndicator"],
                            colorCode,
                        ])}
                    ></div>
                )}
                <div className={styles.left}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={item.clippedImageSrc || ""}
                            alt={item.label}
                            className={styles.img}
                            width={100}
                            height={100}
                            unoptimized
                            style={{
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div className={styles.imgContainer2}>
                        <Image
                            src={item.clippedImageSrc2 || ""}
                            alt={item.label}
                            className={styles.img}
                            width={100}
                            height={100}
                            unoptimized
                            style={{
                                objectFit: "contain",
                            }}
                        />
                    </div>
                    <div className={styles["bottom-right-container"]}>
                        <CustomSvgIcon
                            iconId="zoom-plus"
                            className={"size24"}
                            onClickCallback={handleZoomClick}
                            aria-controls={open ? "zoomed-view" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            tooltipText="Zoom"
                            tooltipPlacement="top"
                        />

                        {/* <IconButton
                            disableRipple
                            onClick={handleAccountClick}
                            size="small"
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                        </IconButton> */}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles["title-container"]}>
                        <div className={styles.title}>{item.label || "--"}</div>
                        <div className={styles["title-icon"]}>
                            <CustomSvgIcon
                                iconId={
                                    itemIsHidden
                                        ? "visibility-off"
                                        : "visibility-on"
                                }
                                className={"size24"}
                                onClickCallback={handleToggleHidden}
                                tooltipText={`Toggle visibility`}
                                tooltipPlacement="top"
                            />
                            <div className={styles["vertical-divider"]}></div>
                            <CustomSvgIcon
                                iconId="delete2"
                                className={"size24"}
                                onClickCallback={handleRejectCondition}
                                tooltipText={`Reject this "${item.label}"`}
                                tooltipPlacement="top"
                            />
                        </div>
                    </div>
                    <div
                        className={styles["content-container"]}
                        style={{ display: "none" }}
                    >
                        {metrics.map((metric) => (
                            <div
                                key={metric.id}
                                className={clsx([
                                    styles["content-item"],
                                    styles[metric.id],
                                ])}
                            >
                                <div className={styles["field"]}>
                                    {metric.label}
                                </div>
                                <div className={styles["value"]}>
                                    {metric.value}
                                </div>
                            </div>
                        ))}
                        {metrics.length === 0 && (
                            <div className={styles["content-item"]}>
                                <div className={styles["field"]}>
                                    No metrics to display
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles["text-container"]}>
                        {item.description || "--"}
                    </div>
                    <div className={styles["bottom-right-container"]}>
                        <ColorIndicator
                            colorCode={colorCode}
                            displayType="video"
                            videos={item.treatmentVideos}
                        />
                    </div>
                </div>
                <ZoomedView
                    menuId="zoomed-view"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    condition={item}
                />
            </div>
        </>
    );
}
