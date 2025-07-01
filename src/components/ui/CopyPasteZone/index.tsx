import styles from "./copyPasteZone.module.scss";
import CustomSvgIcon from "../CustomSvgIcon";
import { useEffect, useState } from "react";
import { T_onFileLoad } from "@/lib/types/types";

type CopyPasteZoneProps = {
    onLoad?: (data: T_onFileLoad[]) => void;
    imgFormat?: "base64" | "buffer";
};

// Helper function to check if a string is a valid base64 image
const isBase64Image = (str: string): boolean => {
    // Check if it starts with data:image/
    if (str.startsWith("data:image/")) {
        return true;
    }

    // Check if it's a raw base64 string (common image formats)
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (base64Regex.test(str)) {
        // Try to decode and check if it's a valid image
        try {
            const binaryString = atob(str);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Check for common image file signatures
            const pngSignature = [0x89, 0x50, 0x4e, 0x47];
            const jpegSignature = [0xff, 0xd8, 0xff];
            const gifSignature = [0x47, 0x49, 0x46];

            return (
                (bytes.length >= 4 &&
                    pngSignature.every((byte, i) => bytes[i] === byte)) ||
                (bytes.length >= 3 &&
                    jpegSignature.every((byte, i) => bytes[i] === byte)) ||
                (bytes.length >= 3 &&
                    gifSignature.every((byte, i) => bytes[i] === byte))
            );
        } catch (e) {
            return false;
        }
    }

    return false;
};

// Helper function to get image type from base64 string
const getImageTypeFromBase64 = (base64Str: string): string => {
    if (base64Str.startsWith("data:image/")) {
        const match = base64Str.match(/data:image\/([^;]+)/);
        return match ? `image/${match[1]}` : "image/png";
    }

    // For raw base64, try to detect from file signature
    try {
        const binaryString = atob(base64Str);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Check file signatures
        if (
            bytes.length >= 4 &&
            bytes[0] === 0x89 &&
            bytes[1] === 0x50 &&
            bytes[2] === 0x4e &&
            bytes[3] === 0x47
        ) {
            return "image/png";
        }
        if (
            bytes.length >= 3 &&
            bytes[0] === 0xff &&
            bytes[1] === 0xd8 &&
            bytes[2] === 0xff
        ) {
            return "image/jpeg";
        }
        if (
            bytes.length >= 3 &&
            bytes[0] === 0x47 &&
            bytes[1] === 0x49 &&
            bytes[2] === 0x46
        ) {
            return "image/gif";
        }
    } catch (e) {
        // Fallback to PNG if detection fails
    }

    return "image/png";
};

// Helper function to get file extension from base64 string
const getImageExtensionFromBase64 = (base64Str: string): string => {
    const type = getImageTypeFromBase64(base64Str);
    return type.split("/")[1] || "png";
};

// Helper function to calculate base64 size
const getBase64Size = (base64Str: string): number => {
    if (base64Str.startsWith("data:image/")) {
        // Remove data URL prefix
        const base64Data = base64Str.split(",")[1];
        return base64Data ? Math.ceil((base64Data.length * 3) / 4) : 0;
    }
    return Math.ceil((base64Str.length * 3) / 4);
};

export default function CopyPasteZone({
    onLoad,
    imgFormat = "base64",
}: CopyPasteZoneProps) {
    // const [updateData, setUpdateData] = useState(false);
    const [uploadedImage, setUploadedImage] = useState("");

    // useEffect(() => {
    //     const handlePasteAnywhere = (event: ClipboardEvent) => {
    //         const pastedData = event.clipboardData;
    //         console.log("pastedData = ", pastedData);
    //     };
    //     window.addEventListener("paste", handlePasteAnywhere);
    //     return () => {
    //         window.removeEventListener("paste", handlePasteAnywhere);
    //     };
    // }, []);

    const handleClick = async () => {
        try {
            // Request clipboard permission and read data
            const clipboardItems = await navigator.clipboard.read();
            // console.log("clipboardItems = ", clipboardItems);

            for (const clipboardItem of clipboardItems) {
                // console.log("clipboardItem = ", clipboardItem);
                // Check for image types
                for (const type of clipboardItem.types) {
                    if (type.startsWith("image/")) {
                        const blob = await clipboardItem.getType(type);

                        // Convert blob to base64 or buffer
                        const reader = new FileReader();

                        if (imgFormat === "base64") {
                            reader.readAsDataURL(blob);
                        } else {
                            reader.readAsArrayBuffer(blob);
                        }

                        reader.onload = () => {
                            const result = reader.result;
                            setUploadedImage(result as string);

                            // Create file data object similar to ImageDropZone
                            const fileData = {
                                type: blob.type,
                                size: blob.size,
                                name: `clipboard-image-${Date.now()}.${
                                    blob.type.split("/")[1]
                                }`,
                            };

                            const loadResult: T_onFileLoad = {
                                result: result,
                                fileData: fileData,
                            };

                            if (onLoad) {
                                onLoad([loadResult]);
                            }
                        };

                        reader.onerror = () => {
                            console.error("Failed to read clipboard image");
                        };

                        // Only process the first image found
                        return;
                    }
                }

                // Check for text types (after checking image types)
                for (const type of clipboardItem.types) {
                    if (type === "text/plain") {
                        const textData = await clipboardItem.getType(type);
                        const clipboardText = await textData.text();
                        console.log("Clipboard text data:", clipboardText);

                        // Check if the clipboard text is a base64 image
                        if (clipboardText && isBase64Image(clipboardText)) {
                            const result = clipboardText;
                            setUploadedImage(result);

                            // Create file data object for base64 text
                            const fileData = {
                                type: getImageTypeFromBase64(clipboardText),
                                size: getBase64Size(clipboardText),
                                name: `clipboard-base64-${Date.now()}.${getImageExtensionFromBase64(
                                    clipboardText
                                )}`,
                            };

                            const loadResult: T_onFileLoad = {
                                result: result,
                                fileData: fileData,
                            };

                            if (onLoad) {
                                onLoad([loadResult]);
                            }
                        }

                        // Only process the first text found
                        return;
                    }
                }
            }
        } catch (error) {
            console.error("Failed to access clipboard:", error);
        }
    };

    return (
        <div className={styles.container} onClick={() => handleClick()}>
            <CustomSvgIcon iconId="copyPaste" />
            <div className={styles.title}>
                Click here to copy-paste from the clipboard
            </div>
        </div>
    );
}
