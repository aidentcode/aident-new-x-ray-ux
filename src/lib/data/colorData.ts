import { HSLColor, RGBColor } from "react-color";
import { E_colorCode } from "../enums";
import { clamp } from "../utils";

export const getColorFromCode = (
    colorCode: E_colorCode,
    format: "#" | "0x" = "#"
) => {
    const colorHash1: Record<E_colorCode, string> = {
        [E_colorCode.red]: "#ff3131",
        [E_colorCode.orange]: "#ff9000",
        [E_colorCode.yellow]: "#ffeb81",
        [E_colorCode.lightGreen]: "#64d264",
        [E_colorCode.green]: "#037c2b",
        [E_colorCode.darkGreen]: "#026363",
        [E_colorCode.teal]: "#1edac8",
        [E_colorCode.lightBlue]: "#47a6c5",
        [E_colorCode.blue]: "#2f2fe1",
        [E_colorCode.pink]: "#b707b7",
        [E_colorCode.purple]: "#9999ff",
        [E_colorCode.peach]: "#ff92a5",
        [E_colorCode.white]: "#ffffff",
        [E_colorCode.black]: "#000000",
        [E_colorCode.brown]: "#b53232",
        [E_colorCode.lightBrown]: "#ffaf00",
        [E_colorCode.gold]: "#ab572c",
        [E_colorCode.lemon]: "#a2c861",
        [E_colorCode.maroon]: "#a31545",
        [E_colorCode.magenta]: "#ff00ff",
        [E_colorCode.gray]: "#5d5d5d",
        [E_colorCode.lavender]: "#e6e6fa",
        [E_colorCode.metalGray]: "#6e7b8b",
        [E_colorCode.aqua]: "#00ffff",
    };

    const colorHash2: Record<E_colorCode, number> = {
        [E_colorCode.red]: 0xff3131,
        [E_colorCode.orange]: 0xff9000,
        [E_colorCode.yellow]: 0xffeb81,
        [E_colorCode.lightGreen]: 0x64d264,
        [E_colorCode.green]: 0x037c2b,
        [E_colorCode.darkGreen]: 0x026363,
        [E_colorCode.teal]: 0x1edac8,
        [E_colorCode.lightBlue]: 0x47a6c5,
        [E_colorCode.blue]: 0x2f2fe1,
        [E_colorCode.pink]: 0xb707b7,
        [E_colorCode.purple]: 0x9999ff,
        [E_colorCode.peach]: 0xff92a5,
        [E_colorCode.white]: 0xffffff,
        [E_colorCode.black]: 0x000000,
        [E_colorCode.brown]: 0xb53232,
        [E_colorCode.lightBrown]: 0xffaf00,
        [E_colorCode.gold]: 0xab572c,
        [E_colorCode.lemon]: 0xa2c861,
        [E_colorCode.maroon]: 0xa31545,
        [E_colorCode.magenta]: 0xff00ff,
        [E_colorCode.gray]: 0x5d5d5d,
        [E_colorCode.lavender]: 0xe6e6fa,
        [E_colorCode.metalGray]: 0x6e7b8b,
        [E_colorCode.aqua]: 0x00ffff,
    };

    if (format === "0x") {
        return colorHash2[colorCode];
    } else {
        return colorHash1[colorCode];
    }
};

export function addTransparencyIfOpaque(rgbaString: string) {
    const { opacity, hexColor } = decodeRgbaColor(rgbaString);
    const hexColorWithAlpha = `${hexColor}${opacityToHex(opacity)}`;
    if (opacity < 1) return { hexColor, opacity, hexColorWithAlpha };
    else {
        const forcedOpacity = 0.9;
        return {
            hexColor,
            opacity: forcedOpacity,
            hexColorWithAlpha: `${hexColor}${opacityToHex(forcedOpacity)}`,
        };
    }
}

export function decodeRgbaColor(rgbaString: string) {
    // Use regex to match the rgba values
    const rgbaPattern =
        /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([\d.]+)\)$/;
    const match = rgbaString.match(rgbaPattern);

    if (!match) {
        console.log(`Invalid RGBA string format ${rgbaString}`);
        throw new Error(`Invalid RGBA string format ${rgbaString}`);
    }

    // Extracting the RGB and alpha values
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const a = parseFloat(match[4]);

    // Convert RGB to Hex
    const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;

    const rgbColor: RGBColor = {
        r,
        g,
        b,
        a,
    };
    const hslColor: HSLColor = rgbToHsl(r, g, b);
    return {
        hexColor: hexColor,
        opacity: a,
        rgbColor,
        hslColor,
    };
}
export function opacityToHex(opacity: number) {
    // Ensure the opacity is within the range [0, 1]
    const op = clamp(opacity, 0, 1);

    // Convert opacity to a value between 0 and 255
    const hexValue = Math.round(op * 255);

    // Convert to hex and pad with leading zero if necessary
    return hexValue.toString(16).padStart(2, "0").toUpperCase();
}

export function rgbToHsl(r: number, g: number, b: number): HSLColor {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h: number = 0; // Initialize h
    let s: number = 0; // Initialize s
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6; // Normalize to [0,1]
        h *= 360; // Convert to degrees
    }

    return { h: Math.round(h), s: s * 100, l: l * 100 };
}
export function hexToRgba(hex: string, alpha: number): RGBColor {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "");

    // Parse the hex string
    const bigint = parseInt(hex, 16);

    // Extract RGB components
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b, a: alpha };
}
