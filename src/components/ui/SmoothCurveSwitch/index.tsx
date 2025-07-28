import { useContext, useRef } from "react";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./smoothCurveSwitch.module.scss";
import Draggable from "react-draggable";
import clsx from "clsx";
import {
    FormGroup,
    Stack,
    styled,
    Switch,
    Theme,
    Typography,
} from "@mui/material";
import XrayContext from "@/contexts/xrayContext";
import { FabricObjectMap } from "@/lib/init/globalVars";

const AntSwitch = styled(Switch)(({ theme }: { theme: Theme }) => ({
    width: 28,
    height: 20,
    padding: 0,
    display: "flex",
    "&:active": {
        "& .MuiSwitch-thumb": {
            width: 19,
        },
        "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(9px)",
        },
    },
    "& .MuiSwitch-switchBase": {
        padding: 2,
        color: "#463d4b", //icon-background
        "&.Mui-checked": {
            transform: "translateX(12px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#eda9a2",
                ...theme.applyStyles("dark", {
                    backgroundColor: "#eda9a2",
                }),
            },
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
        width: 12,
        height: 16,
        borderRadius: 6,
        transition: theme.transitions.create(["width"], {
            duration: 200,
        }),
    },
    "& .MuiSwitch-track": {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: "rgba(0,0,0,.25)",
        boxSizing: "border-box",
        ...theme.applyStyles("dark", {
            backgroundColor: "rgba(255,255,255,.35)",
        }),
    },
}));

export default function SmoothCurveSwitch({
    disabled,
}: {
    disabled?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const xrayContext = useContext(XrayContext);
    const {
        smoothCurves,
        setSmoothCurves,
        imageSetup,
        conditions,
        setConditions,
    } = xrayContext;

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
                <FormGroup style={{ opacity: !imageSetup ? 0.5 : 1.0 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                    >
                        <AntSwitch
                            defaultChecked={false}
                            inputProps={{ "aria-label": "ant design" }}
                            onChange={() => {
                                conditions.forEach((condition) => {
                                    FabricObjectMap[condition.id] = 0;
                                });
                                setConditions([]);
                                setSmoothCurves(!smoothCurves);
                            }}
                            value={smoothCurves}
                            disabled={!imageSetup}
                        />
                        <div
                            className={clsx([
                                styles.switchText,
                                !!smoothCurves && styles.disabledText,
                            ])}
                        >
                            Smooth curves
                        </div>
                    </Stack>
                </FormGroup>
            </div>
        </Draggable>
    );
}
