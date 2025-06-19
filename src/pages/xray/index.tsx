import Layout from "@/components/ui/Layout";
import styles from "./xray.module.scss";
import TabSwitch from "@/components/ui/TabSwitch";
import XrayTypeSwitch from "@/components/ui/XrayTypeSwitch";
import CustomSvgIcon from "@/components/ui/CustomSvgIcon";
import { useContext, useState } from "react";
import TutorialVideo from "@/components/modals/TutorialVideo";
import WaitModal from "@/components/modals/WaitModal";
import ImageDropZone from "@/components/ui/ImageDropZone";
import { T_onFileLoad } from "@/lib/types/types";
import CopyPasteZone from "@/components/ui/CopyPasteZone";
import clsx from "clsx";
import XrayContext, { XrayProvider } from "@/contexts/xrayContext";
import ViewSwitch from "@/components/ui/ViewSwitch";
import SplitPane, { Pane } from "split-pane-react";
import { SplitPaneSash } from "@/components/ui/SplitPaneSash";
import "split-pane-react/esm/themes/default.css";
import ToothSelection from "@/components/ui/ToothSelection";
import XrayCanvas from "@/components/XrayCanvas";
import ToolboxLayer from "@/components/ui/ToolboxLayer";
import { sampleUser } from "@/lib/data/sample-responses";
import OverviewContainer from "@/components/ui/OverviewContainer";
import ConditionListContainer from "@/components/ui/ConditionListContainer";
import EmptyMessage from "@/components/ui/EmptyMessage";
import { E_conditionStatus } from "@/lib/enums";
import MainCanvas3d from "@/components/3d/MainCanvas3d";
import ColorIndicator from "@/components/ui/ColorIndicator";
import CustomTooltip from "@/components/ui/CustomToolTip";

export default function XrayPage() {
    //const [waitMsg, setWaitMsg] = useState("Loading...");
    const waitMsg = "";

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const handleToggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <>
            {waitMsg && <WaitModal msg={waitMsg} showSpinner={true} />}
            <XrayProvider>
                <Layout
                    title="X-Ray"
                    description="AiDent X-Ray page"
                    contentTitle=""
                    showBack={false}
                    user={sampleUser}
                >
                    <div className={styles.container}>
                        <div
                            className={clsx([
                                styles.right,
                                sidebarCollapsed && styles.collapsed,
                            ])}
                        >
                            <ConditionList
                                sidebarCollapsed={sidebarCollapsed}
                                onToggleSidebar={handleToggleSidebar}
                            />
                        </div>
                        <div
                            className={clsx([
                                styles.content,
                                sidebarCollapsed && styles.collapsed,
                            ])}
                        >
                            <div className={styles.top}>
                                <ViewSwitch />
                            </div>
                            <SplitPaneWrapper />
                        </div>
                    </div>
                </Layout>
            </XrayProvider>
        </>
    );
}

function ConditionList({
    sidebarCollapsed,
    onToggleSidebar,
}: {
    sidebarCollapsed: boolean;
    onToggleSidebar: () => void;
}) {
    const { imageSetup, conditions, tabId, setTabId, overviewItems } =
        useContext(XrayContext);
    const conditionCount = conditions.filter(
        (x) => x.status !== E_conditionStatus.rejected
    ).length;

    if (sidebarCollapsed) {
        return (
            <>
                <div className={styles.title} onClick={onToggleSidebar}>
                    <CustomSvgIcon iconId={"expandSidebar"} />
                </div>
                <div>
                    {overviewItems.map((item) => {
                        const { label, colorCode, items, isHidden } = item;
                        const number = items.filter(
                            (x) => x.status !== E_conditionStatus.rejected
                        ).length;
                        if (isHidden || !number) return <></>;

                        return (
                            <>
                                <CustomTooltip
                                    title={`${label}: ${number}`}
                                    key={item.classId}
                                    placement="left"
                                >
                                    <div
                                        className={styles.collapsedOverviewItem}
                                    >
                                        <ColorIndicator
                                            colorCode={colorCode}
                                            displayType={"number"}
                                            number={number}
                                        />
                                    </div>
                                </CustomTooltip>
                            </>
                        );
                    })}
                </div>
            </>
        );
    }

    return (
        <>
            <div className={styles.title}>
                <span>Conditions ({conditionCount})</span>
                <CustomSvgIcon
                    iconId={"collapseSidebar"}
                    onClickCallback={onToggleSidebar}
                />
            </div>
            <div className={styles.tabSwitch}>
                <TabSwitch
                    tabId={tabId}
                    onChange={(newTabId) => {
                        setTabId(newTabId);
                    }}
                />
            </div>
            <div className={styles.conditionContent}>
                {imageSetup ? (
                    tabId === "overview" ? (
                        <OverviewContainer />
                    ) : (
                        <ConditionListContainer />
                    )
                ) : (
                    <div className={styles.conditionEmpty}>
                        <EmptyMessage
                            message={
                                tabId === "overview"
                                    ? "Upload and scan an X-ray to see an overview of conditions."
                                    : "Upload and scan an X-ray to see the list of conditions."
                            }
                        />
                    </div>
                )}
            </div>
        </>
    );
}

function SplitPaneWrapper() {
    const xrayContext = useContext(XrayContext);
    const { splitScreenSizes, setSplitScreenSizes, imageSetup, tooth3dView } =
        xrayContext;
    const handleSizeChange = (sizes: number[]) => {
        setSplitScreenSizes(sizes);
    };

    return (
        <SplitPane
            split="vertical"
            sizes={splitScreenSizes}
            onChange={handleSizeChange}
            sashRender={(index, active) =>
                SplitPaneSash({
                    index,
                    active,
                    split: "vertical",
                })
            }
            performanceMode={true}
            allowResize={true}
        >
            <Pane
                minSize={"0px"}
                maxSize="100%"
                className={styles["pane-container"]}
            >
                <div className={styles.view2d}>
                    {!imageSetup && (
                        <>
                            <ToolboxLayer />
                            <DropXrayZone />
                        </>
                    )}
                    {imageSetup && <XrayCanvas />}
                </div>
            </Pane>
            <Pane
                minSize={"0px"}
                maxSize="100%"
                className={styles["pane-container"]}
            >
                <div className={styles.view3d}>
                    {tooth3dView ? <MainCanvas3d /> : <ToothSelection />}
                </div>
            </Pane>
        </SplitPane>
    );
}

function DropXrayZone() {
    const xrayContext = useContext(XrayContext);
    const { imageSetup, setImageSetup, setBase64ImgFromFile } = xrayContext;

    const [isModalOpen, setIsModalOpen] = useState("");
    const handleCloseModal = () => {
        setIsModalOpen("");
    };

    const onImgLoad = (data: T_onFileLoad[]) => {
        console.log("img load data=", data);
        const base64FromFile = data[0].result as string;
        if (base64FromFile) {
            setBase64ImgFromFile(base64FromFile);
            setImageSetup(true);
        }
    };

    if (imageSetup) return <></>;

    return (
        <>
            {isModalOpen === "tutorial" && (
                <TutorialVideo onClose={handleCloseModal} />
            )}
            <div className={styles.dropContainer}>
                <div className={styles.switchContainer}>
                    <XrayTypeSwitch />
                </div>
                <div className={styles.dropContainer2}>
                    <div className={clsx([styles.col, styles.col1])}>
                        <ImageDropZone
                            onLoad={onImgLoad}
                            accept={{
                                "image/png": [".png"],
                                "image/jpeg": [".jpg", ".jpeg"],
                            }}
                            ctaMsg={
                                <>
                                    Import shapes by dragging &apos;n&apos;
                                    dropping files here. Click to browse and
                                    select files.
                                </>
                            }
                            maxSizeInBytes={10 * 1024 * 1024}
                            hideValidationMsg={true}
                        />
                    </div>
                    <div className={clsx([styles.col, styles.col2])}>
                        <CopyPasteZone />
                    </div>
                </div>
                <div className={styles.sizeMsg}>
                    .png, .jpeg/.jpg, .bmp or .tiff upto 10MB
                </div>
                <div
                    className={styles.learnContainer}
                    onClick={() => {
                        setIsModalOpen("tutorial");
                    }}
                >
                    <span>Learn how to use - Watch 1 min video</span>
                    <CustomSvgIcon
                        iconId="youtube"
                        className={styles.videoIcon}
                    />
                </div>
            </div>
        </>
    );
}
