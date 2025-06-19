import styles from "./splitPaneSash.module.scss";
import clsx from "clsx";

type SplitPaneSashProps = {
    index: number;
    active: boolean;
    split: "horizontal" | "vertical";
};
export function SplitPaneSash({ active, split }: SplitPaneSashProps) {
    return (
        <div
            className={clsx([
                styles["split-pane-sash"],
                active ? styles["active-sash"] : "",
                styles[split],
            ])}
        >
            {/* {active} */}
        </div>
    );
}
