import styles from "./header.module.scss";
import { T_genericUser } from "@/lib/types/types";
import { E_headerDisplayType, E_xrayType } from "@/lib/enums";
import { AvatarWithFallback } from "../AvatarWithFallback";
import Image from "next/image";
import logo from "../../../../public/logo/AiDent-logo-2.png";
import CustomSvgIcon from "../CustomSvgIcon";
import PrimaryButton from "../PrimaryButton";
import CreditsDisplay from "../CreditsDisplay";
import XrayTypeSwitch from "../XrayTypeSwitch";
import CustomTooltip from "../CustomToolTip";
import { IconButton } from "@mui/material";
import { useContext, useState } from "react";
import AccountMenu from "../AccountMenu";
import TutorialVideo from "@/components/modals/TutorialVideo";
import ConfirmLogout from "@/components/modals/ConfirmLogout";
import ConfirmClearXray from "@/components/modals/ConfirmClearXray";
import XrayContext from "@/contexts/xrayContext";
import { sampleInteferenceResponseRVG_test1 } from "@/lib/data/sample-responses";
import { updateOverviews } from "@/lib/data/inference-to-overview";
import WaitModal from "@/components/modals/WaitModal";
import { getBgImgDimensions } from "@/lib/canvas/bg-utils";
import { getShapeUpdateData } from "@/lib/global-cache";
import router from "next/router";

// import { inference2Overview } from "@/lib/data/inference-to-overview";

// API Endpoint:
// https://182krwxtm7.execute-api.ap-south-1.amazonaws.com/temp
// key:
// vzj72Oo4El1AU3BfP5qiI3gbSCSHm68l7SMoH11H

type HeaderProps = {
    title: string;
    showBack: boolean;
    user: T_genericUser;
    headerDisplayType: E_headerDisplayType;
};
export default function Header({
    title,
    showBack,
    user,
    headerDisplayType,
}: HeaderProps) {
    const [waitMsg, setWaitMsg] = useState("");
    const xrayContext = useContext(XrayContext);
    const {
        setImageSetup,
        setBase64ImgFromFile,
        setOriginalState,
        xrayType,
        base64ImgFromCanvas,
        // inferenceResponse,
        setInferenceResponse,
        // setOverviewItems,
        // setOverviewHash,
        setConditions,
        // xrayType,
    } = xrayContext;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [isModalOpen, setIsModalOpen] = useState("");
    const startLogout = () => {
        setIsModalOpen("logout");
    };
    const startClearXray = () => {
        setIsModalOpen("clearXray");
    };
    const handleClearXray = () => {
        setIsModalOpen("");
        setImageSetup(false);
        setBase64ImgFromFile("");
        setOriginalState(null);
        setInferenceResponse(null);
        setConditions([]);
        updateOverviews([], xrayContext);
    };
    const handleCloseModal = () => {
        setIsModalOpen("");
    };
    const handleLogout = async () => {
        setIsModalOpen("");
        console.log("TODO: handleLogout");
    };
    const handleLogoClick = () => {
        router.push("/home");
    };

    const handleStartScan = async () => {
        const shapeUpdateData = getShapeUpdateData();
        const canvas = shapeUpdateData?.canvas;
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }

        const base64Img = base64ImgFromCanvas;
        const { bgWidth, bgHeight } = getBgImgDimensions(canvas);
        const startIndex = base64Img.indexOf(",") + 1;
        const base64Data = base64Img.substring(startIndex);

        const endpoint_name =
            xrayType === E_xrayType.rvg
                ? "ai-dent-rvg-prod-ep"
                : "ai-dent-opg-prod-ep";

        const obj = {
            body: base64Data,
            endpoint_name,
            image_width: bgWidth,
            image_height: bgHeight,
        };

        const apiUrl =
            "https://182krwxtm7.execute-api.ap-south-1.amazonaws.com/temp/inference";

        setWaitMsg("Starting scan...");
        try {
            const response = await fetch(apiUrl, {
                //mode: "no-cors",
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "HaTwDQzzu7a1y3XtfPgnF8QyPnm7sfgG3Hj96d2Q",
                    //"x-api-key": "vzj72Oo4El1AU3BfP5qiI3gbSCSHm68l7SMoH11H",
                    // "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(obj),
            });
            console.log("API response 1 = ", response);
            const inferenceResponse = await response.json();
            console.log("API response 2= ", inferenceResponse);
            setWaitMsg("");
            // console.log("API response = ", inferenceResponse);
            // setInferenceResponse({ ...inferenceResponse });
        } catch (error) {
            console.error("Error starting scan: ", error);
            setWaitMsg("");
            setInferenceResponse(null);
        }
    };

    const handleStartScanTest = async () => {
        console.log("TODO: handleStartScan");
        setWaitMsg("Starting scan...");
        setTimeout(() => {
            setWaitMsg("");
            setConditions([]);
            setInferenceResponse({
                ...sampleInteferenceResponseRVG_test1,
            });
        }, 5000);
    };

    let rightContent = null;
    let leftContent = null;
    switch (headerDisplayType) {
        case E_headerDisplayType.Home: {
            rightContent = (
                <>
                    <Image
                        src={logo}
                        alt="logo"
                        width={50}
                        height={50}
                        className={styles["logo-img"]}
                    />
                </>
            );
            break;
        }
        case E_headerDisplayType.AfterXRay: {
            leftContent = (
                <>
                    <div className={styles["vertical-divider"]}></div>
                    <XrayTypeSwitch />
                </>
            );
            rightContent = (
                <>
                    <CreditsDisplay />
                    <div className={styles["vertical-divider"]}></div>
                    <PrimaryButton
                        btnTitle="Start scan"
                        onClick={() => {
                            // handleStartScanTest();
                            handleStartScan();
                        }}
                        disabled={false}
                    />
                    <div className={styles["vertical-divider"]}></div>
                    <CustomSvgIcon
                        iconId="delete2"
                        tooltipText="Clear existing X-ray and start over"
                        onClickCallback={startClearXray}
                    />
                    <div className={styles["vertical-divider"]}></div>
                    <Image
                        src={logo}
                        alt="logo"
                        width={50}
                        height={50}
                        className={styles["logo-img"]}
                        onClick={handleLogoClick}
                    />
                </>
            );
            break;
        }
        case E_headerDisplayType.BeforeXRay: {
            leftContent = (
                <>
                    <div className={styles["vertical-divider"]}></div>
                    <XrayTypeSwitch />
                </>
            );
            rightContent = (
                <>
                    <CreditsDisplay />
                    <div className={styles["vertical-divider"]}></div>
                    <PrimaryButton
                        btnTitle="Start scan"
                        onClick={() => {}}
                        disabled={true}
                    />
                    <div className={styles["vertical-divider"]}></div>
                    <CustomSvgIcon iconId="delete2" disabled={true} />
                    <div className={styles["vertical-divider"]}></div>
                    <Image
                        src={logo}
                        alt="logo"
                        width={50}
                        height={50}
                        className={styles["logo-img"]}
                        onClick={handleLogoClick}
                    />
                </>
            );
            break;
        }
    }

    return (
        <>
            {waitMsg && (
                <WaitModal msg={waitMsg} showSpinner={true} show3d={true} />
            )}
            {isModalOpen === "logout" && (
                <ConfirmLogout
                    onClose={handleCloseModal}
                    onLogout={handleLogout}
                />
            )}
            {isModalOpen === "clearXray" && (
                <ConfirmClearXray
                    onClose={handleCloseModal}
                    onClearXray={handleClearXray}
                />
            )}
            {isModalOpen === "tutorial" && (
                <TutorialVideo onClose={handleCloseModal} />
            )}
            <div className={styles.container}>
                <div className={styles.left}>
                    {showBack && (
                        <CustomSvgIcon
                            iconId="backward"
                            tooltipText="Go back"
                        />
                    )}
                    <CustomTooltip title="My Account" placement="bottom">
                        <IconButton
                            disableRipple
                            onClick={handleAccountClick}
                            size="small"
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <AvatarWithFallback
                                name={user.clinic_name}
                                email={user.email_id}
                                image={user.image}
                            />
                        </IconButton>
                    </CustomTooltip>
                    {leftContent}
                    <div className={styles["vertical-divider"]}></div>
                    <CustomSvgIcon
                        iconId="youtube"
                        tooltipText="Watch 1 minute video and learn how to use the platform"
                        onClickCallback={() => {
                            setIsModalOpen("tutorial");
                        }}
                    />
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.right}>{rightContent}</div>
                <AccountMenu
                    menuId="account-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onLogout={startLogout}
                />
            </div>
        </>
    );
}
