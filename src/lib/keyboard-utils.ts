import { T_xrayContext } from "@/contexts/xrayContext";

let holdKey: string | undefined;

export const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "MetaLeft" || event.code === "ControlLeft") {
        holdKey = undefined;
    }
    if (
        (event.code === "KeyX" && holdKey) ||
        event.code === "Backspace" ||
        event.key === "Backspace"
    ) {
    }
};

export const handleKeyDown = async (
    event: KeyboardEvent,
    xrayContext: T_xrayContext
) => {
    const { selectedConditionId, setSelectedConditionId } = xrayContext;
    if (event.code === "Escape") {
        if (selectedConditionId) {
            setSelectedConditionId(null);
        }
    }
};
