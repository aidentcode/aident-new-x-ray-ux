import clsx from "clsx";
import styles from "./video.module.scss";

type VideoProps = {
    className?: string;
    videoSrc: string;
    trackSrc?: string;
    width?: number;
    height?: number;
};
export default function Video({
    className,
    videoSrc,
    width,
    height,
    trackSrc,
}: VideoProps) {
    return (
        <video
            className={clsx([styles.container, className])}
            // width={width || 320}
            // height={height || 240}
            preload="none"
            autoPlay
            // loop
            // muted
            playsInline
            controls
        >
            <source src={videoSrc} type="video/mp4" />
            {trackSrc && (
                <track
                    src={trackSrc} // src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                />
            )}
            Your browser does not support the video tag.
        </video>
    );
}
