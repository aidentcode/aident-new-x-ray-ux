import clsx from "clsx";
import styles from "./tabSwitch.module.scss";
import CustomTooltip from "../CustomToolTip";

export default function TabSwitch({
    tabId,
    onChange,
}: {
    tabId: string;
    onChange: (tabId: string) => void;
}) {
    return (
        <CustomTooltip
            title={`Switch tab`}
            className="custom-tooltip"
            placement="left"
        >
            <div
                className={styles.container}
                onClick={() => {
                    const newTabId = tabId === "overview" ? "list" : "overview";
                    onChange(newTabId);
                }}
            >
                <div
                    className={clsx([
                        styles.view,
                        tabId === "overview" && styles.active,
                    ])}
                >
                    Overview
                </div>
                <div
                    className={clsx([
                        styles.view,
                        tabId === "list" && styles.active,
                    ])}
                >
                    List
                </div>
            </div>
        </CustomTooltip>
    );
}
