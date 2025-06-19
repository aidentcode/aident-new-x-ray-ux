import CustomModal from "@/components/ui/CustomModal";
import { E_modalType } from "@/lib/enums";
import { clsx } from "clsx";
import styles from "./tutorialVideo.module.scss";
import Video from "@/components/ui/Video";

export default function TutorialVideo({
    onClose,
    videoId,
}: {
    onClose: () => void;
    videoId?: string;
}) {
    return (
        <CustomModal modalType={E_modalType.tutorial} onClose={onClose}>
            <div className={clsx(["custom-modal-title"])}>How to use?</div>
            <div
                className={clsx([
                    "custom-modal-content",
                    styles["tutorial-video-container"],
                ])}
            >
                <div
                    style={{
                        position: "relative",
                        paddingTop: "56.25%",
                    }}
                >
                    {!videoId && (
                        <Video
                            videoSrc="/videos/tutorial.mp4"
                            className={styles.videoItem}
                        />
                        // <Video
                        //     src="/videos/tutorial.mp4"
                        //     style={{
                        //         position: "absolute",
                        //         top: 0,
                        //         left: 0,
                        //         width: "100%",
                        //         height: "100%",
                        //     }}
                        //     controls
                        //     playsInline
                        // />
                    )}
                    {videoId && (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            }}
                        ></iframe>
                    )}
                </div>
            </div>
        </CustomModal>
    );
}
