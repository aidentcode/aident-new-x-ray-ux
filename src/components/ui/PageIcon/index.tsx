import Image from "next/image";
import styles from "./pageIcon.module.scss";
import clsx from "clsx";
import xrayPageIcon from "../../../../public/page-icons/Torus Knot 3 256_png.webp";
import scanPageIcon from "../../../../public/page-icons/Sharp Rectangle with Circle 256_png.webp";
import alignerPageIcon from "../../../../public/page-icons/3 Cube 256_png.webp";
import labPageIcon from "../../../../public/page-icons/Plus 256_png.webp";
import crownPageIcon from "../../../../public/page-icons/Sharp Cone 256_png.webp";
import ribbonImg from "../../../../public/assets/ribbon-group_png.webp";
import { useRouter } from "next/router";

type PageIconProps = {
    type: "xray" | "scan" | "aligner" | "lab" | "crown";
    showComingSoon?: boolean;
};

export default function PageIcon(props: PageIconProps) {
    const router = useRouter();

    const { type, showComingSoon } = props;
    let title = "";
    let img = xrayPageIcon;

    switch (type) {
        case "xray":
            title = "AI X-RAYS";
            img = xrayPageIcon;
            break;
        case "scan":
            title = "AI ORAL SCANS";
            img = scanPageIcon;
            break;
        case "aligner":
            title = "AI ALIGNER MONITORING";
            img = alignerPageIcon;
            break;
        case "lab":
            title = "AI LAB VIRTUAL SETUP";
            img = labPageIcon;
            break;
        case "crown":
            title = "AI CROWN DESIGN";
            img = crownPageIcon;
            break;
    }

    const handleClick = () => {
        router.push(`/${type}`);
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <div
                className={clsx([
                    styles["icon-container"],
                    showComingSoon && styles["coming-soon"],
                ])}
            >
                {showComingSoon && (
                    <>
                        <Image
                            src={img}
                            alt={type}
                            width={80}
                            height={80}
                            className={styles.imgIcon}
                        />
                        <div className={styles["ribbon-container"]}>
                            <Image
                                src={ribbonImg}
                                alt={"ribbon"}
                                width={80}
                                className={styles.ribbonImg}
                            />
                            <div className={styles["coming-soon-text"]}>
                                Coming soon!
                            </div>
                        </div>
                    </>
                )}
                {!showComingSoon && (
                    <Image src={img} alt={type} width={100} height={100} />
                )}
            </div>
            <div className={styles.title}>{title}</div>
        </div>
    );
}
