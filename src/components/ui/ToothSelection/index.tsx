import clsx from "clsx";
import styles from "./toothSelection.module.scss";
import CustomTooltip from "../CustomToolTip";
import { JSX } from "@emotion/react/jsx-runtime";
import { useContext } from "react";
import XrayContext from "@/contexts/xrayContext";
import { E_tooth3dId, E_tooth3dPosition } from "@/lib/enums";

export default function ToothSelection() {
    return (
        <div className={styles.container1}>
            <div className={styles["main-title"]}>
                Select the tooth by position
                <br /> to view in 3D
            </div>
            <div className={styles.combo}>
                <div className={styles.top}>
                    <div className={styles.title}>Upper</div>
                    <ToothSelectionPart
                        placement={E_tooth3dPosition["top-left"]}
                    />
                    <ToothSelectionPart
                        placement={E_tooth3dPosition["top-right"]}
                    />
                </div>
                <div className={styles.bottom}>
                    <div className={styles.title}>Lower</div>
                    <ToothSelectionPart
                        placement={E_tooth3dPosition["bottom-left"]}
                    />
                    <ToothSelectionPart
                        placement={E_tooth3dPosition["bottom-right"]}
                    />
                </div>
                <MolarMarker className={styles.molarMarker} />
                <div className={styles.molarMarkerText}>Molars</div>
                <PremolarMarker className={styles.premolarMarker} />
                <div className={styles.premolarMarkerText}>Premolars</div>
                <CanineMarker className={styles.canineMarker} />
                <div className={styles.canineMarkerText}>Canine</div>
                <IncisorMarker className={styles.incisorMarker} />
                <div className={styles.incisorMarkerText}>Incisors</div>
            </div>
        </div>
    );
}

function ToothSelectionPart({ placement }: { placement: E_tooth3dPosition }) {
    const xrayContext = useContext(XrayContext);
    const { setTooth3dView } = xrayContext;

    const arr: Array<{
        id: string;
        title: string;
        icon: JSX.Element;
    }> = [
        {
            id: E_tooth3dId["tooth-incisor-1"],
            title: "Lateral Incisor",
            icon: <ToothIncisor2 />,
        },
        {
            id: E_tooth3dId["tooth-incisor-2"],
            title: "Central Incisor",
            icon: <ToothIncisor1 />,
        },
        {
            id: E_tooth3dId["tooth-canine-1"],
            title: "Canine",
            icon: <ToothCanine1 />,
        },
        {
            id: E_tooth3dId["tooth-premolar-1"],
            title: "First Premolar",
            icon: <ToothPremolar1 />,
        },
        {
            id: E_tooth3dId["tooth-premolar-2"],
            title: "Second Premolar",
            icon: <ToothPremolar2 />,
        },
        {
            id: E_tooth3dId["tooth-molar-1"],
            title: "First Molar",
            icon: <ToothMolar1 />,
        },
        {
            id: E_tooth3dId["tooth-molar-2"],
            title: "Second Molar",
            icon: <ToothMolar2 />,
        },
        {
            id: E_tooth3dId["tooth-molar-3"],
            title: "Third Molar",
            icon: <ToothMolar3 />,
        },
    ];

    const tooltipPlacement = "top";
    return (
        <div className={clsx([styles.container2, styles[placement]])}>
            {arr.map((item) => (
                <CustomTooltip
                    key={item.id}
                    title={item.title}
                    placement={tooltipPlacement ?? "bottom"}
                >
                    <div
                        className={clsx([styles["tooth"], styles[item.id]])}
                        onClick={() => {
                            setTooth3dView({
                                toothId: item.id as E_tooth3dId,
                                toothPosition: placement,
                            });
                        }}
                    >
                        {item.icon}
                    </div>
                </CustomTooltip>
            ))}
        </div>
    );
}

function IncisorMarker({ className }: { className?: string }) {
    return (
        <svg
            width="148"
            height="13"
            viewBox="0 0 148 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M28.5 0.5H128.5V6.5M0 12.5H128.5V6.5M147.5 6.5H128.5"
                stroke="#696969"
            />
        </svg>
    );
}

function CanineMarker({ className }: { className?: string }) {
    return (
        <svg
            width="94"
            height="2"
            viewBox="0 0 94 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M0 1H94" stroke="#696969" />
        </svg>
    );
}

function PremolarMarker({ className }: { className?: string }) {
    return (
        <svg
            width="76"
            height="29"
            viewBox="0 0 76 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M16 1H57.5V15M0.5 28H57.5V15M76 15H57.5"
                stroke="#696969"
            />
        </svg>
    );
}

function MolarMarker({ className }: { className?: string }) {
    return (
        <svg
            width="48"
            height="61"
            viewBox="0 0 48 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M9.5 0.5H31.5V30M0 60H31.5V30M48 30H31.5"
                stroke="#696969"
            />
        </svg>
    );
}

function ToothCanine1({ className }: { className?: string }) {
    return (
        <svg
            width="41"
            height="39"
            viewBox="0 0 41 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M27.6235 30.8792C23.3148 33.6709 19.417 34.022 17.144 33.7677L16.7118 33.7086C13.1666 33.1439 9.36521 30.594 7.61017 25.6897L7.44619 25.208C6.8942 23.4858 6.36976 21.3735 6.07398 19.3979C5.79233 17.5166 5.7339 15.8557 5.99169 14.7725L6.0475 14.5639C6.50446 13.035 6.82778 12.1575 7.33734 11.4616C7.77486 10.8643 8.38215 10.3598 9.45144 9.721L9.93847 9.43837C11.094 8.78592 12.7125 8.42774 14.2798 8.25331C15.6386 8.10211 16.898 8.09505 17.6678 8.12861L17.9667 8.14543C21.4784 8.38803 25.039 8.92202 27.8873 10.6299L28.1614 10.7988C30.5092 12.2943 32.3802 13.3101 33.6951 14.6243C34.8615 15.79 35.5677 17.182 35.5661 19.3996L35.5563 19.8538C35.3829 24.019 32.1134 27.8621 28.022 30.6167L27.6235 30.8792Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M26.4285 16.4352C26.4285 16.4352 28.5333 21.9599 25.0255 25.4118C21.1503 29.2252 17.3083 26.7929 17.3083 26.7929"
                stroke="#D7D7D7"
                strokeOpacity="0.33"
                strokeWidth="1.24431"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ToothPremolar1({ className }: { className?: string }) {
    return (
        <svg
            width="40"
            height="39"
            viewBox="0 0 40 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M27.0878 30.5219C22.749 33.3331 19.9125 33.6776 17.8019 33.4272L17.3895 33.3689C15.5871 33.0818 13.1546 31.9319 10.945 30.1554C8.87877 28.494 7.08146 26.3441 6.18665 23.9659L6.01991 23.4875C4.98367 20.2545 4.68358 17.5375 5.20722 15.3463L5.322 14.9149C5.75762 13.4573 6.24127 12.5804 6.9071 11.8802C7.57865 11.1741 8.47322 10.6062 9.83884 9.83293L17.3371 7.82016L27.3246 9.15727C29.8219 9.9181 31.5454 10.9401 32.6307 12.3295C33.6479 13.6318 34.1691 15.3397 34.1422 17.6609L34.1291 18.1337C33.9502 22.4265 31.3911 27.514 27.4712 30.264L27.0878 30.5219Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M19.1457 23.1477L13.3621 24.3575C13.0883 24.4142 12.8192 24.2413 12.7611 23.9718C12.7031 23.7023 12.8782 23.4378 13.152 23.3804L19.1175 22.1333L20.5021 18.3951L18.996 13.474L18.9767 13.3742C18.9554 13.1431 19.1013 12.9215 19.3358 12.8518C19.5706 12.7824 19.8168 12.8884 19.9286 13.093L19.9678 13.1853L21.3878 17.8274L27.1717 16.6195L27.2741 16.6083C27.5098 16.6068 27.7226 16.7684 27.7736 17.0041C27.8317 17.2738 27.6567 17.5391 27.3828 17.5965L21.4171 18.8426L20.0315 22.5809L21.5387 27.5028L21.0522 27.6463L20.5668 27.7906L19.1457 23.1477Z"
                fill="#D7D7D7"
                fillOpacity="0.33"
            />
            <path
                d="M21.1988 28.1241C20.9306 28.2036 20.6476 28.0546 20.5668 27.7906L21.5387 27.5028C21.6192 27.7667 21.4668 28.0445 21.1988 28.1241Z"
                fill="#D7D7D7"
                fillOpacity="0.33"
            />
        </svg>
    );
}

function ToothPremolar2({ className }: { className?: string }) {
    return (
        <svg
            width="40"
            height="38"
            viewBox="0 0 40 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M26.7552 30.1459C22.4164 32.9571 19.58 33.3017 17.4694 33.0512L17.057 32.9929C15.2546 32.7058 12.822 31.5559 10.6125 29.7794C8.54625 28.1181 6.74894 25.9681 5.85413 23.5899L5.68739 23.1115C4.65115 19.8785 4.35106 17.1615 4.8747 14.9703L4.98948 14.5389C5.4251 13.0814 5.90875 12.2044 6.57458 11.5042C7.24613 10.7981 8.1407 10.2302 9.50633 9.45695L17.0046 7.44419L26.992 8.78129C29.4894 9.54212 31.2129 10.5641 32.2982 11.9535C33.3154 13.2559 33.8366 14.9638 33.8097 17.285L33.7966 17.7577C33.6177 22.0505 31.0586 27.138 27.1386 29.888L26.7552 30.1459Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M19.9987 28.6823C19.6863 28.7325 19.3891 28.5567 19.2804 28.2766L19.2467 28.1498L18.3956 23.0358L12.0761 23.5264L11.9434 23.5234C11.6408 23.4866 11.3957 23.2442 11.3707 22.9334C11.3425 22.5783 11.6123 22.2672 11.9731 22.2391L18.5313 21.731L20.5219 17.9667L19.6103 12.4802L19.6024 12.3495C19.6146 12.0496 19.8387 11.7893 20.1513 11.739C20.4637 11.6888 20.7609 11.8646 20.8696 12.1447L20.9033 12.2715L21.7544 17.3855L28.0739 16.8959L28.2066 16.8979C28.5094 16.9347 28.7544 17.1779 28.7793 17.4888C28.8075 17.8439 28.5376 18.1541 28.1769 18.1822L21.6177 18.6913L19.6281 22.4536L20.5397 27.9421L20.5476 28.0728C20.5352 28.3724 20.3112 28.632 19.9987 28.6823Z"
                fill="#D7D7D7"
                fillOpacity="0.33"
            />
        </svg>
    );
}

function ToothMolar1({ className }: { className?: string }) {
    return (
        <svg
            width="41"
            height="39"
            viewBox="0 0 41 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M28.3124 30.6639C26.0072 32.1574 24.1382 32.8116 22.5888 33.0583C21.2327 33.2741 20.0884 33.184 19.0524 33.0352L18.6144 32.968C16.7635 32.6731 13.9847 31.6644 11.4566 30.0542C8.99957 28.4893 6.8853 26.4245 6.0229 24.0109L5.94352 23.7769C5.02478 20.9105 5.60969 18.2793 6.26606 16.0075L6.54753 15.0565C6.98628 13.5885 7.50409 12.5145 8.22026 11.6249C8.91874 10.7574 9.83743 10.0286 11.1402 9.2826L18.5299 8.10347L28.5514 9.29935C31.4986 10.2063 34.7472 12.6791 34.7636 17.277L34.7543 17.7321C34.6614 19.962 34.0781 22.5417 32.9931 24.899C31.9746 27.1115 30.5338 29.088 28.6874 30.4086L28.3124 30.6639Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M12.4194 18.4591L19.3405 17.9564L25.0285 14.0429L22.0103 20.1937L22.6097 26.9988L18.7068 21.3508L12.4194 18.4591Z"
                fill="#D7D7D7"
                fillOpacity="0.33"
            />
        </svg>
    );
}

function ToothMolar2({ className }: { className?: string }) {
    return (
        <svg
            width="42"
            height="41"
            viewBox="0 0 42 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M29.3275 31.76C27.0342 33.2457 25.1769 33.8147 23.6377 33.9822C22.4746 34.1088 21.4712 34.0105 20.54 33.8732L19.6297 33.7295C17.7413 33.4287 14.7734 32.5759 12.0753 31.1341C9.44263 29.7271 7.19601 27.8297 6.33595 25.4595L6.2569 25.2285C5.73765 23.6085 5.72095 21.7431 5.93919 19.9469C6.10229 18.6049 6.39353 17.329 6.68134 16.2641L6.96333 15.2744C7.40449 13.7984 7.89909 12.7287 8.59076 11.8448C9.26878 10.9785 10.1684 10.2509 11.4831 9.50086L19.0222 7.47637C22.2282 7.4784 24.7333 7.59038 28.6938 8.70804L29.5137 8.94749C32.3786 9.81186 35.7595 13.2606 35.7785 18.0281L35.7696 18.4936C35.6766 20.7257 35.0922 23.3916 34.0047 25.8353C32.9831 28.1308 31.541 30.1792 29.7012 31.5042L29.3275 31.76Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M12.8703 24.1059L17.4566 18.7738L16.3295 11.8761L21.7469 16.3902L28.755 15.2808L24.1687 20.6129L25.2958 27.5105L19.8784 22.9965L12.8703 24.1059Z"
                fill="#D7D7D7"
                fillOpacity="0.33"
            />
        </svg>
    );
}

function ToothMolar3({ className }: { className?: string }) {
    return (
        <svg
            width="42"
            height="40"
            viewBox="0 0 42 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M31.2747 30.4494C27.0333 33.1975 23.1958 32.517 20.8716 32.4224L20.4267 32.4128C18.5088 32.4139 15.6577 32.0781 13.0376 30.9203C10.5119 29.8042 8.23993 27.9451 7.1642 24.9089L7.06338 24.6118C6.05921 21.4786 6.32231 17.5396 6.93963 15.1173L7.06784 14.6543C7.50902 13.1781 8.00365 12.1085 8.69527 11.2247C9.37131 10.3608 10.2682 9.63555 11.5769 8.88766L20.5173 6.85714C23.7165 6.85717 25.3879 6.86297 29.2474 7.96853L30.0573 8.20711C32.869 9.05555 35.8902 12.5773 35.8845 17.4019L35.875 17.8731C35.7783 20.1964 35.634 22.6992 34.9965 24.962C34.4021 27.0718 33.3933 28.919 31.6363 30.2001L31.2747 30.4494Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M17.6188 25.7079C17.6188 25.7079 18.9136 22.4113 18.1361 20.5284C17.3586 18.6455 14.0943 17.1726 14.0943 17.1726C14.0943 17.1726 17.6799 17.3659 19.259 16.0563C20.8382 14.7466 21.2527 11.2359 21.2527 11.2359C21.2527 11.2359 22.1738 14.652 23.9273 15.7255C25.6808 16.799 29.2013 16.1021 29.2013 16.1021C29.2013 16.1021 26.185 18.02 25.6896 19.9931C25.1941 21.9662 26.9554 25.0463 26.9554 25.0463C26.9554 25.0463 24.1701 22.8155 22.1104 22.9615C20.0507 23.1075 17.6188 25.7079 17.6188 25.7079Z"
                fill="#D7D7D7"
                fillOpacity="0.33"
            />
        </svg>
    );
}

function ToothIncisor2({ className }: { className?: string }) {
    return (
        <svg
            width="39"
            height="38"
            viewBox="0 0 39 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M26.4706 30.2868C24.1546 31.7874 21.6749 32.8789 19.4934 33.548C17.4231 34.183 15.6983 34.4142 14.655 34.3074L14.4548 34.281C12.7327 34.0065 11.2112 32.9262 9.88307 31.1874C8.63614 29.5551 7.59503 27.3859 6.7581 24.9006L6.59393 24.3997C6.06441 22.7476 5.8819 20.6829 5.92968 18.7068C5.97148 16.9785 6.18779 15.3669 6.4721 14.2184L6.59811 13.7553C7.05501 12.2266 7.37758 11.3492 7.88706 10.6534C8.32455 10.056 8.93195 9.55156 10.0012 8.91279L10.4882 8.63016C11.6261 7.98767 12.8739 7.79934 14.0529 7.7944C14.9715 7.79057 15.7539 7.89064 16.4476 7.96569L17.1141 8.02754C20.3861 8.25363 22.6092 9.12319 25.3327 10.797L25.8845 11.1427C28.1709 12.5991 30.6216 14.2164 32.4756 16.1119C34.2089 17.8841 35.3546 19.8317 35.4085 22.0503L35.4051 22.4974C35.3211 24.5152 34.2847 25.7238 32.6408 26.8093C31.8036 27.3621 30.836 27.864 29.7717 28.4195C28.8505 28.9003 27.8667 29.4168 26.8885 30.0221L26.4706 30.2868Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M29.419 20.3753C29.419 20.3753 25.7548 24.3425 22.7691 25.9842C19.6339 27.708 13.9847 28.6614 13.9847 28.6614"
                stroke="#D7D7D7"
                strokeOpacity="0.33"
                strokeWidth="1.24431"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ToothIncisor1({ className }: { className?: string }) {
    return (
        <svg
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M8.21143 29.5591C7.00243 29.5434 5.91814 29.436 5.02197 29.2534C4.22829 29.0917 3.61809 28.878 3.20166 28.6431L3.03467 28.5415C1.59469 27.5814 0.911902 25.6042 0.737793 22.8882C0.587511 20.5431 0.826457 17.8262 1.13037 15.1353L1.26318 13.9849C1.70345 10.2554 2.84586 6.81593 4.40771 4.85693L4.56006 4.67236C5.65861 3.38453 6.48921 2.50028 7.43018 1.88623C8.23436 1.36149 9.15116 1.01497 10.4399 0.831543L11.0161 0.763184C13.7246 0.498083 15.9405 1.25418 17.2778 1.93115L17.5337 2.06494C20.3095 3.57183 21.7375 5.59779 23.4429 8.25732L24.1958 9.43604C25.7491 11.8655 27.3736 14.3221 28.313 16.8022C29.1854 19.1055 29.4336 21.3464 28.5083 23.5317L28.3081 23.9683C27.3407 25.9116 25.6699 26.7057 23.5161 27.1714C22.4283 27.4066 21.2648 27.5482 20.0278 27.7222C18.9595 27.8724 17.8486 28.0449 16.7563 28.3247L16.2896 28.4517C13.5017 29.2528 10.6302 29.5904 8.21143 29.5591Z"
                fill="#333333"
                stroke="#D7D7D7"
                strokeWidth="1.38293"
            />
            <path
                d="M22.7038 20.1272C22.7038 20.1272 17.1068 22.356 14.4061 22.8942C10.9488 23.5832 6.80011 23.5839 6.80011 23.5839"
                stroke="#D7D7D7"
                strokeOpacity="0.33"
                strokeWidth="1.24431"
                strokeLinejoin="round"
            />
        </svg>
    );
}
