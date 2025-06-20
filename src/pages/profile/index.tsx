import Layout from "@/components/ui/Layout";
import styles from "./profile.module.scss";
import { E_headerDisplayType } from "@/lib/enums";
import hemisphereImg from "../../../public/assets/hemisphere2x_png.webp";
import Image from "next/image";
import { sampleUser } from "@/lib/data/sample-responses";
import { useState } from "react";
import clsx from "clsx";
import ProfileTabView from "@/components/ui/ProfileTabView";
import TransactionsTabView from "@/components/ui/TransactionsTabView";

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
                        {tabId === "profile" && <ProfileTabView />}
                        {tabId === "transactions" && <TransactionsTabView />}
                    </div>
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
                Profile
            </div>
            <div
                className={clsx([
                    styles.view,
                    tabId === "transactions" && styles.active,
                ])}
            >
                Transactions
            </div>
        </div>
    );
}
