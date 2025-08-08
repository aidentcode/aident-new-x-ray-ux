import Layout from "@/components/ui/Layout";
import PageIcon from "@/components/ui/PageIcon";
import styles from "./home.module.scss";
import { E_headerDisplayType } from "@/lib/enums";
import hemisphereImg from "../../../public/assets/hemisphere2x_png.webp";
import Image from "next/image";
import { sampleUser } from "@/lib/data/sample-responses";
import LoadingAnimation3d from "@/components/3d/LoadingAnimation3d";
import HeartIcon from "@/components/ui/HeartIcon";

export default function Home() {
    return (
        <Layout
            title="Home"
            description="AiDent Home page"
            contentTitle=""
            showBack={false}
            user={sampleUser} //TODO: Connected to logged-in user
            headerDisplayType={E_headerDisplayType.Home}
        >
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.row}>
                        <PageIcon type="xray" />
                        <PageIcon type="scan" showComingSoon={true} />
                        <PageIcon type="aligner" showComingSoon={true} />
                    </div>
                    <div className={styles.row}>
                        <PageIcon type="lab" showComingSoon={true} />
                        <PageIcon type="crown" showComingSoon={true} />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.info}>
                        <div className={styles.infoTitle1}>
                            <span>UPGRADE</span>
                            <br />
                            TO <span>AI DENTISTRY</span>
                        </div>
                        <div className={styles.infoImage}>
                            <LoadingAnimation3d
                                zoom={0.5}
                                cameraPosition={[4, 4, 4]}
                                showText={false}
                            />
                        </div>
                        <div className={styles.infoTitle2}>
                            <span>GET</span> TO KNOW
                            <br />
                            <span>AIDENT</span>
                        </div>
                    </div>
                    <div className={styles.readMore1}>
                        <div className={styles.readMore1Icon}>
                            <HeartIcon />
                        </div>
                        <span className={styles.readMore1Text}>READ MORE</span>
                    </div>
                    <div className={styles.readMore2}>
                        EMBRACING
                        <br />
                        BETTER DENTAL HEALTH
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
