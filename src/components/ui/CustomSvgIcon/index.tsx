import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { JSX } from "react";
import styles from "./customSvgIcon.module.scss";
import clsx from "clsx";
import CustomTooltip from "../CustomToolTip";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";

type CustomSvgIconProps = SvgIconProps & {
    iconId: string;
    tooltipText?: string;
    tooltipPlacement?: "top" | "bottom" | "left" | "right";
    onClickCallback?: (event: React.MouseEvent<HTMLElement> | null) => void;
    disabled?: boolean;
    active?: boolean;
};

export default function CustomSvgIcon(props: CustomSvgIconProps) {
    const {
        iconId,
        tooltipText,
        tooltipPlacement,
        onClickCallback,
        disabled,
        active,
        ...restProps
    } = props;

    let pathD: JSX.Element | null = null;
    let customIcon: JSX.Element | null = null;
    switch (iconId) {
        case "close": {
            customIcon = (
                <IconButton
                    className={clsx([styles["close-button"]])}
                    disableRipple
                    size="small"
                    id="basic-button"
                    onClick={onClickCallback}
                >
                    <Close className={clsx([styles["close-icon"]])} />
                </IconButton>
            );
            break;
        }
        case "download": {
            customIcon = (
                <IconButton
                    className={clsx([
                        styles["download-button"],
                        props.className,
                    ])}
                    disableRipple
                    size="small"
                    id="basic-button"
                    onClick={onClickCallback}
                >
                    <DownloadIcon className={clsx([styles["download-icon"]])} />
                </IconButton>
            );
            break;
        }

        case "youtube": {
            customIcon = (
                <div
                    className={clsx([
                        styles["youtube-icon"],
                        props.className,
                        disabled && styles.disabled,
                    ])}
                    onClick={onClickCallback}
                >
                    <CustomYoutubeIcon
                        className={clsx([
                            styles["stroke-path"],
                            props.className,
                        ])}
                    />
                </div>
            );
            break;
        }
        case "dropZone": {
            customIcon = (
                <div
                    className={clsx([
                        styles["drop-zone-icon"],
                        props.className,
                        disabled && styles.disabled,
                    ])}
                >
                    <CustomDropZoneIcon
                        className={clsx([
                            styles["stroke-path"],
                            props.className,
                        ])}
                    />
                </div>
            );
            break;
        }
        case "copyPaste": {
            customIcon = (
                <div
                    className={clsx([
                        styles["copy-paste-icon"],
                        props.className,
                        disabled && styles.disabled,
                    ])}
                >
                    <CustomCopyPasteIcon
                        className={clsx([
                            styles["stroke-path"],
                            props.className,
                        ])}
                    />
                </div>
            );
            break;
        }

        case "arrow-left": {
            pathD = (
                <path
                    d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z"
                    stroke="#727272"
                />
            );
            break;
        }
        case "delete": {
            pathD = (
                <path
                    d="M1 4.5V25C1 26.1046 1.89543 27 3 27H17C18.1046 27 19 26.1046 19 25V4.5M6 4V3.5C6 2.39543 6.89543 1.5 8 1.5H12C13.1046 1.5 14 2.39543 14 3.5V4M7 10V21.5M13 10V21.5"
                    stroke="#727272"
                />
            );
            break;
        }

        case "backward": {
            pathD = (
                <CustomBackwardIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "delete2": {
            pathD = (
                <CustomDeleteIcon
                    className={clsx([styles["fill-path"], props.className])}
                />
            );
            break;
        }
        case "visibility-on": {
            pathD = (
                <CustomVisibilityOnIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "visibility-off": {
            pathD = (
                <CustomVisibilityOffIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "zoom-plus": {
            pathD = (
                <CustomZoomPlusIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "zoom-minus": {
            pathD = (
                <CustomZoomMinusIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "zoom-reset": {
            pathD = (
                <CustomZoomResetIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "drag": {
            pathD = (
                <CustomDragIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "reset": {
            pathD = (
                <CustomResetIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "rotate": {
            pathD = (
                <CustomRotateIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "crop": {
            pathD = (
                <CustomCropIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "flipVertical": {
            pathD = (
                <CustomFlipVerticalIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "flipHorizontal": {
            pathD = (
                <CustomFlipHorizontalIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "drawLine": {
            pathD = (
                <CustomDrawLineIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "addCondition": {
            pathD = (
                <CustomAddConditionIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "collapseSidebar": {
            pathD = (
                <CustomCollapseSidebarIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
        case "expandSidebar": {
            pathD = (
                <CustomExpandSidebarIcon
                    className={clsx([styles["stroke-path"], props.className])}
                />
            );
            break;
        }
    }

    const iconJsx = customIcon ?? (
        <div
            className={clsx([
                styles.container,
                styles[props.className || ""] ?? "",
                styles[iconId] ?? "",
                disabled && styles.disabled,
                active && styles.active,
            ])}
            onClick={onClickCallback}
        >
            <SvgIcon
                fontSize="inherit"
                className={clsx([styles["main-icon"], styles[iconId] ?? ""])}
                // style={{ width: 24, height: 24 }}
                {...restProps}
            >
                {pathD}
            </SvgIcon>
        </div>
    );

    return tooltipText ? (
        <CustomTooltip
            title={tooltipText}
            placement={tooltipPlacement ?? "bottom"}
        >
            {iconJsx}
        </CustomTooltip>
    ) : (
        iconJsx
    );
}

function CustomYoutubeIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 46 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M44.08 5.84C43.8424 4.89082 43.3586 4.02114 42.6773 3.31881C41.9961 2.61648 41.1415 2.10637 40.2 1.84C36.76 1 23 1 23 1C23 1 9.24001 1 5.80001 1.92C4.85851 2.18637 4.00397 2.69648 3.32271 3.39881C2.64145 4.10114 2.15759 4.97082 1.92001 5.92C1.29044 9.41111 0.982486 12.9526 1.00001 16.5C0.977573 20.0741 1.28555 23.6426 1.92001 27.16C2.18193 28.0797 2.67663 28.9163 3.3563 29.589C4.03598 30.2616 4.87766 30.7476 5.80001 31C9.24001 31.92 23 31.92 23 31.92C23 31.92 36.76 31.92 40.2 31C41.1415 30.7336 41.9961 30.2235 42.6773 29.5212C43.3586 28.8189 43.8424 27.9492 44.08 27C44.7047 23.5352 45.0127 20.0207 45 16.5C45.0225 12.9259 44.7145 9.3574 44.08 5.84Z"
                stroke="#6A5B68"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.5 23.04L30 16.5L18.5 9.96V23.04Z"
                stroke="#6A5B68"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomDropZoneIcon({ className }: { className?: string }) {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M43.75 31.2504V39.5837C43.75 40.6888 43.311 41.7486 42.5296 42.53C41.7482 43.3114 40.6884 43.7504 39.5833 43.7504H10.4167C9.3116 43.7504 8.25179 43.3114 7.47039 42.53C6.68899 41.7486 6.25 40.6888 6.25 39.5837V31.2504M14.5833 20.8337L25 31.2504M25 31.2504L35.4167 20.8337M25 31.2504V6.25037"
                stroke="url(#paint0_linear_89_3553)"
                strokeWidth="2.88608"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_89_3553"
                    x1="6.32911"
                    y1="6.32948"
                    x2="50.6329"
                    y2="46.5194"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#E6BE67" />
                    <stop offset="1" stopColor="#E88CBB" />
                </linearGradient>
            </defs>
        </svg>
    );
}
function CustomCopyPasteIcon({ className }: { className?: string }) {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10.4166 31.2503H8.33329C7.22822 31.2503 6.16842 30.8113 5.38701 30.0299C4.60561 29.2485 4.16663 28.1887 4.16663 27.0837V8.33366C4.16663 7.22859 4.60561 6.16878 5.38701 5.38738C6.16842 4.60598 7.22822 4.16699 8.33329 4.16699H27.0833C28.1884 4.16699 29.2482 4.60598 30.0296 5.38738C30.811 6.16878 31.25 7.22859 31.25 8.33366V10.417M22.9166 18.7503H41.6666C43.9678 18.7503 45.8333 20.6158 45.8333 22.917V41.667C45.8333 43.9682 43.9678 45.8337 41.6666 45.8337H22.9166C20.6154 45.8337 18.75 43.9682 18.75 41.667V22.917C18.75 20.6158 20.6154 18.7503 22.9166 18.7503Z"
                stroke="url(#paint0_linear_89_3556)"
                strokeWidth="2.88608"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_89_3556"
                    x1="4.25453"
                    y1="4.2549"
                    x2="53.481"
                    y2="48.9103"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#E6BE67" />
                    <stop offset="1" stopColor="#E88CBB" />
                </linearGradient>
            </defs>
        </svg>
    );
}

function CustomBackwardIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12.5 1.5L1 12.5M24 12.5H1M12.5 23.5L1 12.5"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CustomDeleteIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M14 0.5C15.4865 0.5 16.7199 1.58118 16.958 3H23C23.5523 3 24 3.44772 24 4C24 4.55228 23.5523 5 23 5H22V25C22 26.6569 20.6569 28 19 28H5C3.34315 28 2 26.6569 2 25V5H1C0.447715 5 0 4.55228 0 4C0 3.44772 0.447715 3 1 3H7.04199C7.28007 1.58118 8.51353 0.5 10 0.5H14ZM4 5V25C4 25.5523 4.44772 26 5 26H19C19.5523 26 20 25.5523 20 25V5H4ZM9 9C9.55228 9 10 9.44772 10 10V21.5C10 22.0523 9.55228 22.5 9 22.5C8.44772 22.5 8 22.0523 8 21.5V10C8 9.44772 8.44772 9 9 9ZM15 9C15.5523 9 16 9.44772 16 10V21.5C16 22.0523 15.5523 22.5 15 22.5C14.4477 22.5 14 22.0523 14 21.5V10C14 9.44772 14.4477 9 15 9ZM10 2.5C9.63003 2.5 9.30773 2.70133 9.13477 3H14.8652C14.6923 2.70133 14.37 2.5 14 2.5H10Z"
                fill="#D7D7D7"
            />
        </svg>
    );
}
function CustomVisibilityOnIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M1.33331 12C1.33331 12 6.66665 1.33337 16 1.33337C25.3333 1.33337 30.6666 12 30.6666 12C30.6666 12 25.3333 22.6667 16 22.6667C6.66665 22.6667 1.33331 12 1.33331 12Z"
                stroke="#D9D9D9"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 16C18.2091 16 20 14.2092 20 12C20 9.7909 18.2091 8.00004 16 8.00004C13.7908 8.00004 12 9.7909 12 12C12 14.2092 13.7908 16 16 16Z"
                stroke="#D9D9D9"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomVisibilityOffIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M23.92 23.92C21.6408 25.6574 18.8655 26.6199 16 26.6667C6.66665 26.6667 1.33331 16 1.33331 16C2.99183 12.9092 5.29216 10.2089 8.07998 8.08004M13.2 5.65337C14.1178 5.43855 15.0574 5.33116 16 5.33337C25.3333 5.33337 30.6666 16 30.6666 16C29.8573 17.5142 28.8921 18.9397 27.7866 20.2534M18.8266 18.8267C18.4604 19.2197 18.0188 19.5349 17.5282 19.7535C17.0375 19.9722 16.5078 20.0897 15.9708 20.0992C15.4337 20.1087 14.9002 20.0099 14.4021 19.8087C13.9041 19.6075 13.4516 19.3081 13.0718 18.9282C12.6919 18.5484 12.3925 18.096 12.1913 17.5979C11.9901 17.0998 11.8913 16.5663 11.9008 16.0293C11.9103 15.4922 12.0279 14.9625 12.2465 14.4718C12.4651 13.9812 12.7803 13.5396 13.1733 13.1734M1.33331 1.33337L30.6666 30.6667"
                stroke="#D0CFD0"
                strokeWidth="2.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CustomZoomPlusIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10.3302 10.7736L7.93635 8.37971M4.82708 3.61949V6.92138M3.17613 5.27044H6.47802M9.22959 5.27044C9.22959 7.70188 7.25852 9.67295 4.82708 9.67295C2.39563 9.67295 0.424561 7.70188 0.424561 5.27044C0.424561 2.83899 2.39563 0.86792 4.82708 0.86792C7.25852 0.86792 9.22959 2.83899 9.22959 5.27044Z"
                stroke="#C7C6C9"
                strokeWidth="0.55"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomZoomMinusIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M27.625 27.625L21.2812 21.2812M8.66667 13.0417L17.4167 13.0417M24.7083 13.0417C24.7083 19.485 19.485 24.7083 13.0417 24.7083C6.59834 24.7083 1.375 19.485 1.375 13.0417C1.375 6.59834 6.59834 1.375 13.0417 1.375C19.485 1.375 24.7083 6.59834 24.7083 13.0417Z"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomZoomResetIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g clipPath="url(#clip0_80_2112)">
                <path
                    d="M22.2454 4.15013L15.8025 8.76484M15.8025 8.76484L20.4172 15.2077M15.8025 8.76484L24.0531 10.394C26.5955 10.8165 28.9317 12.0539 30.7098 13.9197C32.4878 15.7854 33.6113 18.1785 33.911 20.7383C34.2107 23.2981 33.6704 25.886 32.3714 28.1121C31.0724 30.3381 29.0852 32.0816 26.7092 33.0801C24.3331 34.0785 21.6969 34.2776 19.1978 33.6475C16.6987 33.0174 14.4721 31.5922 12.8535 29.5866C11.2348 27.5811 10.3118 25.1037 10.2235 22.5279C10.1352 19.9522 10.8864 17.4174 12.3639 15.3057"
                    stroke="#C7C6C9"
                    strokeWidth="1.81144"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <path
                d="M36.625 36.625L31 31"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <clipPath id="clip0_80_2112">
                    <rect
                        width="31.7002"
                        height="31.7002"
                        fill="white"
                        transform="translate(25.7715) rotate(54.3879)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}

function CustomDragIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle
                cx="27.5472"
                cy="15.4718"
                r="1.88679"
                transform="rotate(90 27.5472 15.4718)"
                fill="#D9D9D9"
            />
            <circle
                cx="27.5472"
                cy="25.283"
                r="1.88679"
                transform="rotate(90 27.5472 25.283)"
                fill="#D9D9D9"
            />
            <circle
                cx="20"
                cy="15.4718"
                r="1.88679"
                transform="rotate(90 20 15.4718)"
                fill="#D9D9D9"
            />
            <circle
                cx="20"
                cy="25.283"
                r="1.88679"
                transform="rotate(90 20 25.283)"
                fill="#D9D9D9"
            />
            <circle
                cx="12.4528"
                cy="15.4718"
                r="1.88679"
                transform="rotate(90 12.4528 15.4718)"
                fill="#D9D9D9"
            />
            <circle
                cx="12.4528"
                cy="25.283"
                r="1.88679"
                transform="rotate(90 12.4528 25.283)"
                fill="#D9D9D9"
            />
        </svg>
    );
}

function CustomResetIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 26 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M13.2454 1.15037L6.80251 5.76509M6.80251 5.76509L11.4172 12.208M6.80251 5.76509L15.0531 7.39423C17.5955 7.81678 19.9317 9.05416 21.7097 10.9199C23.4878 12.7857 24.6113 15.1788 24.911 17.7386C25.2107 20.2984 24.6704 22.8863 23.3714 25.1123C22.0724 27.3383 20.0852 29.0819 17.7092 30.0803C15.3331 31.0787 12.6969 31.2779 10.1978 30.6478C7.69874 30.0177 5.47211 28.5925 3.85345 26.5869C2.23479 24.5813 1.31177 22.104 1.22348 19.5282C1.13519 16.9524 1.8864 14.4177 3.36393 12.306"
                stroke="#C7C6C9"
                strokeWidth="1.81144"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomRotateIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 33 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect
                x="1"
                y="9"
                width="19"
                height="19"
                rx="1.85714"
                stroke="#C7C6C9"
                strokeWidth="2"
            />
            <path
                d="M31.5 20.0001L27.7881 24.0447M27.7881 24.0447L24 20.0001M27.7881 24.0447L27.4993 14.7639C27.4969 11.9183 26.5698 9.15062 24.8576 6.87778C23.1454 4.60494 20.741 2.9501 18.0065 2.16262C15.2721 1.37513 12.3558 1.49766 9.69702 2.51173"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomCropIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M1.125 6.89625L18 6.75C18.5967 6.75 19.169 6.98705 19.591 7.40901C20.0129 7.83097 20.25 8.40326 20.25 9V25.875M6.89625 1.125L6.75 18C6.75 18.5967 6.98705 19.169 7.40901 19.591C7.83097 20.0129 8.40326 20.25 9 20.25H25.875"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomFlipVerticalIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 28 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M24.0006 19.1258L24.0014 25.0113C24.0016 27.2209 22.2104 29.0121 20.0008 29.0118L8.0543 29.0103C5.84556 29.01 4.05509 27.2195 4.05481 25.0108L4.05407 19.1232"
                stroke="#C7C6C9"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M24.0006 11.6884L24.0014 5.80288C24.0016 3.59334 22.2104 1.80209 20.0008 1.80237L8.0543 1.80391C5.84556 1.80419 4.05509 3.59466 4.05481 5.80341L4.05407 11.691"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.0697 15.1439L26.9278 15.1439"
                stroke="#C7C6C9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomFlipHorizontalIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 31 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M19.1259 24.0006L25.0115 24.0014C27.221 24.0016 29.0123 22.2104 29.012 20.0009L29.0104 8.05432C29.0101 5.84557 27.2197 4.05511 25.0109 4.05483L19.1233 4.05409"
                stroke="#C7C6C9"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.6886 24.0006L5.80301 24.0014C3.59347 24.0016 1.80222 22.2104 1.8025 20.0009L1.80404 8.05432C1.80432 5.84557 3.59479 4.05511 5.80354 4.05483L11.6911 4.05409"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.1439 1.06972L15.1439 26.9278"
                stroke="#C7C6C9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomDrawLineIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M1.11438 24.8856C2.15578 25.927 3.84422 25.927 4.88562 24.8856C5.92702 23.8442 5.92702 22.1558 4.88562 21.1144C3.84422 20.073 2.15578 20.073 1.11438 21.1144C0.0729838 22.1558 0.0729838 23.8442 1.11438 24.8856ZM21.1144 4.88562C22.1558 5.92702 23.8442 5.92702 24.8856 4.88562C25.927 3.84422 25.927 2.15578 24.8856 1.11438C23.8442 0.0729846 22.1558 0.0729856 21.1144 1.11438C20.073 2.15578 20.073 3.84422 21.1144 4.88562ZM3 23L3.35355 23.3536L23.3536 3.35356L23 3L22.6464 2.64645L2.64645 22.6464L3 23Z"
                fill="#C7C6C9"
            />
        </svg>
    );
}

function CustomAddConditionIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 32 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M5.00002 11.5C5.00002 7.36246 10.5 6.49997 14.5 8.99999C21.875 3.50001 23.5 10.5 23.5 10.5C23.5 10.5 25.4792 29.2212 23.225 32C19.8064 36.2141 19 20.45 15.5 20.45C13.875 19.9 11 34 7.5 33.5C3.99998 33 5.62504 21.5 5.50002 20.45C5.375 19.4 5.50002 18.2625 5.50002 17.5L5.00002 11.5Z"
                stroke="#D9D9D9"
                strokeOpacity="0.89"
                strokeMiterlimit="10"
                strokeLinecap="round"
            />
            <path
                d="M14.5 8.99999C21.875 3.50001 23.5 10.5 23.5 10.5C23.5 10.5 23.7592 13.1184 23.9503 16.5H15.5L13.5 15.5L12.5 13.5V8.06003C13.1859 8.28805 13.862 8.60125 14.5 8.99999Z"
                fill="#9747FF"
                stroke="#D9D9D9"
                strokeOpacity="0.89"
                strokeMiterlimit="10"
                strokeLinecap="round"
            />
            <rect
                x="12.5"
                y="0.5"
                width="19"
                height="16"
                rx="3.5"
                fill="#E6BE67"
                fillOpacity="0.59"
                stroke="#C7C6C9"
            />
        </svg>
    );
}

function CustomCollapseSidebarIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12 1L23.5 12L12 23M1 1V23"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function CustomExpandSidebarIcon({ className }: { className?: string }) {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12.5 1L1 12L12.5 23M23.5 1V23"
                stroke="#C7C6C9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
