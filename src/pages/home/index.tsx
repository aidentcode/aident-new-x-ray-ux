import Layout from "@/components/ui/Layout";
import PageIcon from "@/components/ui/PageIcon";
import styles from "./home.module.scss";
import { E_headerDisplayType } from "@/lib/enums";
import hemisphereImg from "../../../public/assets/hemisphere2x_png.webp";
import Image from "next/image";
import { sampleUser } from "@/lib/data/sample-responses";
import LoadingAnimation3d from "@/components/3d/LoadingAnimation3d";

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
                                cameraPosition={[3, 3, 3]}
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

function HeartIcon() {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 58 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="0.559326"
                y="0.116699"
                width="56.824"
                height="56.824"
                rx="11.3648"
                fill="#E6BE67"
            />
            <path
                d="M29.852 41.0443C29.369 41.2148 28.5735 41.2148 28.0905 41.0443C23.9707 39.6379 14.7653 33.7708 14.7653 23.8266C14.7653 19.437 18.3026 15.8855 22.6638 15.8855C25.2493 15.8855 27.5364 17.1356 28.9713 19.0676C30.4061 17.1356 32.7074 15.8855 35.2787 15.8855C39.64 15.8855 43.1773 19.437 43.1773 23.8266C43.1773 33.7708 33.9718 39.6379 29.852 41.0443Z"
                fill="#26252C"
            />
        </svg>
    );
}
