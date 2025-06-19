import { E_colorCode } from "@/lib/enums";
import styles from "./colorIndicator.module.scss";
import clsx from "clsx";
import { T_treatmentVideo } from "@/lib/types/types";
import { useState } from "react";
import TutorialVideo from "@/components/modals/TutorialVideo";

type ColorIndicatorProps = {
    colorCode: E_colorCode;
    displayType: "video" | "number";
    number?: number;
    videos?: T_treatmentVideo[];
};

export default function ColorIndicator(props: ColorIndicatorProps) {
    const { colorCode, displayType, number, videos } = props;
    const lightTextColor = checkILightTextColor(colorCode);
    const videoId = videos?.[0]?.id;
    const [isModalOpen, setIsModalOpen] = useState("");
    const handleCloseModal = () => {
        setIsModalOpen("");
    };
    const handleOpenVideo = () => {
        setIsModalOpen("tutorial");
    };

    return (
        <>
            {isModalOpen === "tutorial" && (
                <TutorialVideo onClose={handleCloseModal} videoId={videoId} />
            )}
            <div
                className={clsx([
                    styles.container,
                    styles[displayType],
                    colorCode,
                    displayType === "number" && !number
                        ? styles["inactive"]
                        : styles["active"],
                    lightTextColor ? styles["light-text"] : styles["dark-text"],
                ])}
            >
                {displayType === "video" && (
                    <div
                        className={styles.videoContainer}
                        onClick={handleOpenVideo}
                    >
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 8 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 5L0.5 9.33013V0.669873L8 5Z"
                                fill={lightTextColor ? "#ffffff" : "#26252c"}
                            />
                        </svg>
                    </div>
                )}
                {displayType === "number" && (
                    <div className={styles.numberContainer}>
                        {number ? number : "-"}
                    </div>
                )}
            </div>
        </>
    );
}

function checkILightTextColor(colorCode: E_colorCode) {
    const lightTextColorCodes = [
        E_colorCode.red,
        E_colorCode.green,
        E_colorCode.darkGreen,
        E_colorCode.blue,
        E_colorCode.pink,
        E_colorCode.black,
        E_colorCode.brown,
        E_colorCode.gold,
    ];
    return lightTextColorCodes.indexOf(colorCode) >= 0 ? true : false;
}
