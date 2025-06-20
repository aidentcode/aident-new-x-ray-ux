import Layout from "@/components/ui/Layout";
import styles from "./profile.module.scss";
import { E_headerDisplayType } from "@/lib/enums";
import hemisphereImg from "../../../public/assets/hemisphere2x_png.webp";
import Image from "next/image";
import { sampleUser } from "@/lib/data/sample-responses";
import { useState } from "react";
import clsx from "clsx";
import CreditsDisplay from "@/components/ui/CreditsDisplay";

export default function Profile() {
    const [tabId, setTabId] = useState<"profile" | "transactions">("profile");

    const handleTabChange = (newTabId: "profile" | "transactions") => {
        setTabId(newTabId);
    };

    return (
        <Layout
            title="Profile"
            description="AiDent Home page"
            contentTitle=""
            showBack={true}
            user={sampleUser} //TODO: Connected to logged-in user
            headerDisplayType={E_headerDisplayType.Profile}
        >
            <div className={styles.container}>
                <div className={styles.content}>
                    <TabSwitch
                        tabId={tabId}
                        handleTabChange={handleTabChange}
                    />
                    <div className={styles.tabContent}>
                        {tabId === "profile" && <ProfileTab />}
                        {tabId === "transactions" && <div>Transactions</div>}
                    </div>
                    {/* <div className={styles.profileTitle}></div>
                    <div className={styles.profileSubtitle}>
                        {sampleUser.email_id}
                    </div> */}
                </div>

                <Image
                    src={hemisphereImg}
                    alt="hemisphere"
                    width={100}
                    height={100}
                    className={styles.hemisphereImg}
                />
            </div>
        </Layout>
    );
}

function ProfileTab() {
    return (
        <div className={styles.profileTab}>
            <div className={styles.packageDetails}>
                <div className={styles.profileTabTitle}>Current package</div>
                <div className={styles.scale1_5}>
                    <CreditsDisplay />
                </div>
                <div className={styles.detailRowContainer}>
                    <div className={styles.detailRow}>
                        <div className={styles.detailRowTitle}>Expires on:</div>
                        <div className={styles.detailRowValue}>2025-07-20</div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailRowTitle}>
                            Total scans:
                        </div>
                        <div className={styles.detailRowValue}>3</div>
                    </div>
                </div>
            </div>
            <div className={styles.userDetails}></div>
        </div>
    );
}

function TabSwitch({
    tabId,
    handleTabChange,
}: {
    tabId: "profile" | "transactions";
    handleTabChange: (newTabId: "profile" | "transactions") => void;
}) {
    return (
        <div
            className={styles.tabSwitch}
            onClick={() => {
                const newTabId =
                    tabId === "profile" ? "transactions" : "profile";
                handleTabChange(newTabId);
            }}
        >
            <div
                className={clsx([
                    styles.view,
                    tabId === "profile" && styles.active,
                ])}
            >
                Overview
            </div>
            <div
                className={clsx([
                    styles.view,
                    tabId === "transactions" && styles.active,
                ])}
            >
                List
            </div>
        </div>
    );
}
