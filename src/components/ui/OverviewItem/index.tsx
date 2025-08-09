import ColorIndicator from "../ColorIndicator";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./overviewItem.module.scss";
import clsx from "clsx";
import { T_overviewItem } from "@/lib/types/types";
import { useContext } from "react";
import XrayContext from "@/contexts/xrayContext";
import {
    // rejectOverview,
    setOverviewValue,
} from "@/lib/data/inference-to-overview";
import { E_conditionStatus, E_opgClassId } from "@/lib/enums";
import { E_rvgClassId } from "@/lib/enums";

export default function OverviewItem({
    item,
    hideVisibilityIcon,
    hideDeleteIcon,
    hideNumber,
}: {
    item: T_overviewItem;
    hideVisibilityIcon?: boolean;
    hideDeleteIcon?: boolean;
    hideNumber?: boolean;
}) {
    const xrayContext = useContext(XrayContext);

    const { label, colorCode, items, isHidden } = item;
    const number = items.filter(
        (x) => x.status !== E_conditionStatus.rejected
    ).length;

    const videos = items[0]?.treatmentVideos;

    const handleRejectAll = () => {
        // rejectOverview(
        //     item.classId as E_rvgClassId | E_opgClassId,
        //     xrayContext
        // );
        setOverviewValue(
            item.classId as E_rvgClassId | E_opgClassId,
            "status",
            E_conditionStatus.rejected,
            xrayContext
        );
    };

    const handleToggleHidden = () => {
        setOverviewValue(
            item.classId as E_rvgClassId | E_opgClassId,
            "isHidden",
            !isHidden,
            xrayContext
        );
    };

    return (
        <div
            className={clsx([
                styles.container,
                !number && styles.disabled,
                isHidden && styles.hidden,
            ])}
        >
            <div className={styles.left}>
                {!hideVisibilityIcon && (
                    <>
                        <CustomSvgIcon
                            iconId={
                                isHidden ? "visibility-off" : "visibility-on"
                            }
                            className={"size24"}
                            onClickCallback={handleToggleHidden}
                            tooltipText={`Toggle visibility of all "${label}"`}
                            tooltipPlacement="top"
                        />
                        <div className={styles["vertical-divider"]} />
                    </>
                )}
                <div className={styles.text}>{label || "--"}</div>
            </div>
            <div className={styles.right}>
                {!hideNumber && (
                    <ColorIndicator
                        colorCode={colorCode}
                        displayType={"number"}
                        number={number}
                    />
                )}
                {!!hideNumber && videos?.length && (
                    <ColorIndicator
                        colorCode={colorCode}
                        displayType={"video"}
                        videos={videos}
                    />
                )}

                {!hideDeleteIcon && (
                    <>
                        <div className={styles["vertical-divider"]} />
                        <CustomSvgIcon
                            iconId="delete2"
                            className={"size24"}
                            onClickCallback={handleRejectAll}
                            tooltipText={`Reject all "${label}"`}
                            tooltipPlacement="top"
                        />
                    </>
                )}
            </div>
        </div>
    );
}
