import React from "react";
import styles from "./imageDropZone.module.scss";
import { useDropzone } from "react-dropzone";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { T_onFileLoad } from "@/lib/types/types";
import SnackBarWrapper from "@/components/ui/SnackBarWrapper";
import CustomSvgIcon from "../CustomSvgIcon";

const baseStyle = {
    borderColor: "#c6c6c6",
};
const focusedStyle = {
    borderColor: "#9e5aff",
};
const acceptStyle = {
    borderColor: "#00e676",
};
const rejectStyle = {
    borderColor: "#ff1744",
};

type ImageDropZoneProps = {
    accept?: Record<string, string[]>;
    maxSizeInBytes?: number;
    maxNumFiles?: number;
    validationMsg?: string | React.ReactNode;
    hideValidationMsg?: boolean;
    ctaMsg?: string | React.ReactNode;
    imgFormat?: "base64" | "buffer";
    onLoad: (data: T_onFileLoad[]) => void;
};
export default function ImageDropZone({
    accept,
    maxSizeInBytes,
    maxNumFiles,
    validationMsg,
    hideValidationMsg,
    ctaMsg,
    imgFormat = "base64",
    onLoad,
}: ImageDropZoneProps) {
    const testUploadedImage = false;
    const [uploadedImage, setUploadedImage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState("");

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            // console.log("acceptedFiles=", acceptedFiles.length);
            const loadResults: T_onFileLoad[] = [];
            // Do something with the files
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();
                // reader.readAsDataURL(file);
                if (imgFormat === "base64") reader.readAsDataURL(file);
                else reader.readAsArrayBuffer(file);

                reader.onabort = () => console.log("file reading was aborted");
                reader.onerror = () => console.log("file reading has failed");
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    const base64enc = reader.result;
                    setUploadedImage(base64enc as string);

                    // Do whatever you want with the file contents
                    // const t = file.toString();
                    loadResults.push({
                        result: reader.result,
                        fileData: {
                            ...file,
                            type: file.type,
                            size: file.size,
                            name: file.name,
                        },
                    });
                    if (loadResults.length === acceptedFiles.length) {
                        if (onLoad) {
                            onLoad(loadResults);
                        }
                    }
                };
                // reader.readAsArrayBuffer(file);
            });
        },
        [imgFormat, onLoad]
    );

    const maxFiles = maxNumFiles || 10;
    //const maxSize = Infinity;
    const maxSize = maxSizeInBytes || 10 * 1024 * 1024; //10 MB in bytes
    // const maxSize = maxSizeInBytes || 1 * 1024 * 1024; //1MB in bytes

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: accept
            ? accept
            : {
                  "image/png": [".png"],
                  "image/jpeg": [".jpg", ".jpeg"],
              },
        maxFiles,
        maxSize,
        onDropRejected(fileRejections, event) {
            console.log("fileRejections", fileRejections, event);
            if (fileRejections.length > maxFiles) {
                setSnackbarOpen(
                    `Too many files. Select maximum ${maxFiles} at a time`
                );
            } else if (fileRejections.length) {
                const e = fileRejections[0].errors[0];
                if (e.code === "file-too-large") {
                    setSnackbarOpen(
                        `File cannot be larger than ${formatSize(maxSize)}`
                    );
                } else {
                    setSnackbarOpen(e.message);
                }
            } else {
                const e = fileRejections[0].errors[0];
                setSnackbarOpen(e.message);
            }
        },
        onError(e) {
            setSnackbarOpen(e.message);
        },
    });
    const formatSize = (size: number) => {
        if (size < 1024) return size + " bytes";
        size = Math.round((size /= 1024));
        if (size < 1024) return size + "kB";
        size = Math.round((size /= 1024));
        if (size < 1024) return size + "MB";
        size = Math.round((size /= 1024));
        if (size < 1024) return size + "GB";
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    const renderedCtaMsg = ctaMsg ? (
        ctaMsg
    ) : (
        <>
            Drag &apos;n&apos; drop image files here, or click to browse and
            select
        </>
    );

    const generateAcceptMsg = (accept: Record<string, string[]>): string => {
        let t: string[] = [];
        for (const k in accept) {
            t = t.concat(accept[k]);
        }
        return t.join(" or ");
    };
    const acceptMsg = accept ? generateAcceptMsg(accept) : "";

    const renderedValidationMsg =
        !hideValidationMsg &&
        (validationMsg ? (
            validationMsg
        ) : (
            <span className={styles["validation-msg"]}>
                {acceptMsg ? acceptMsg : ["jpg", "png"].join(" or ")}
                {maxSize < Infinity ? ` upto ${formatSize(maxSize)}` : ``}
            </span>
        ));

    return (
        <>
            <SnackBarWrapper
                autoHideDuration={4000}
                onClose={() => {
                    setSnackbarOpen("");
                }}
                msg={snackbarOpen}
                isOpen={!!snackbarOpen}
            />
            <div {...getRootProps({ style, className: styles.container })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <div className={styles["dropzone-message"]}>
                        {/* <FileDownloadTwoTone className={styles.icon} /> */}
                        <CustomSvgIcon
                            iconId="dropZone"
                            className={styles.icon}
                        />

                        {renderedCtaMsg}
                        <br />
                        {renderedValidationMsg}
                        {/* Drag &apos;n&apos; drop image files here, or click to
                        select files <br />
                        <span className={styles["validation-msg"]}>
                            .png or .jpeg
                            {maxSize < Infinity
                                ? ` upto ${formatSize(maxSize)}`
                                : ``}
                        </span> */}
                    </div>
                )}
            </div>
            <div>
                {testUploadedImage && uploadedImage && (
                    <Image
                        width={300}
                        height={300}
                        src={uploadedImage}
                        alt="uploaded image"
                    />
                )}
            </div>
        </>
    );
}
