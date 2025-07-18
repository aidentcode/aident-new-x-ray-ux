import paper from "paper";
import { Canvas } from "fabric";
import {
    E_colorCode,
    E_conditionType,
    E_conditionStatus,
    E_opgClassId,
    E_rvgClassId,
    E_signupType,
    E_userStatus,
    E_tooth3dId,
} from "../enums";
import { T_xrayContext } from "@/contexts/xrayContext";

export type T_overlayFabricData = {
    type: string;
    classId: E_opgClassId | E_rvgClassId;
    index: number;
    classLabel: string;
    name: string;
    conditionId: string;
    measurement?: number;
    clippedImageSrc?: string;
    clippedImageSrc2?: string;
    parentOverlayName?: string;
    parentOverlayIndex?: number;
    maskPaperPath?: paper.Path;
};

export type T_condition = T_xrayClassData & {
    needToDraw: boolean;
    bbox: T_boundingBox;
    masks: T_point2D[];
    distance: number | null;
    area?: number;
    id: string;
    clippedImageSrc?: string;
    clippedImageSrc2?: string;
    criticalTimeline?: string;
    criticalDistance?: string;
    parentOverlayName?: string;
};
export type T_conditionMetric = {
    id: string;
    label: string;
    value: string;
};

export type T_overviewItem = T_xrayClassData & {
    items: T_xrayClassData[];
    status: E_conditionStatus;
};
export type T_boundingBox = [
    x: number,
    y: number,
    width: number,
    height: number
];
export type T_point2D = [x: number, y: number];

export type T_distanceData = [[T_point2D | string, T_point2D | string], number];

export type T_inferenceResponse = {
    result: {
        bbox: Array<T_boundingBox>;
        class_ids: Array<number>;
        masks: Array<Array<T_point2D>>;
        distances: Array<T_distanceData | null>;
        areas: Array<number>;
    };
    // TODO: add opg_anatomy_result when it's available
    opg_anatomy_result?: Record<string, any> | null;
    inference_time: number;
    image_height: number;
    image_width: number;
    endpoint_name: string;
};
export type T_xrayClassData = {
    classId: string;
    label: string;
    colorCode: E_colorCode;
    textColorCode?: E_colorCode;
    description?: string;
    treatmentVideos?: T_treatmentVideo[];
    showArea?: boolean;
    isHidden?: boolean;
    conditionType: E_conditionType;
    status?: E_conditionStatus;
};
export type T_treatmentVideo = {
    id: string;
    name?: string;
    type: "youtube" | "vimeo";
    link: string;
};

export type T_option = {
    id: string;
    value: string | number;
    icon?: React.ReactNode;
};

export type T_signup = {
    showWelcome: boolean;
    showTutorial: boolean;
    signupVia: E_signupType;
    signupData: Record<string, unknown>;
    organisationName?: string;
    workStructure?: string;
    ipInfo?: Record<string, unknown>;
};
export type T_genericUser = {
    id: string;
    email_id: string;
    clinic_name: string;
    phone_no?: string;
    address?: string | null;
    defaultCredit?: string;

    city?: string;
    userid?: string;
    tnc: boolean;
    status?: E_userStatus | null;
    createdAt?: Date;
    updatedAt?: Date;
    __typename?: string;
    image?: string;
    password?: string | null;
};

export type T_fileData = {
    type: string;
    size: number;
    name: string;
    path?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    webkitRelativePath?: string;
};
export type T_onFileLoad = {
    result: string | ArrayBuffer | null;
    buffer?: ArrayBuffer | null;
    fileData?: T_fileData;
};

export type T_shapeUpdateData = {
    canvas: Canvas;
    xrayContext: T_xrayContext;
    // toolboxRefs: {
    //     //conditionToolboxRef: MutableRefObject<null | HTMLDivElement>;
    //     //toothToolboxRef: MutableRefObject<null | HTMLDivElement>;
    // };
};

export type T_clamp = {
    min: number;
    max: number;
    tol?: number; //Real min, max is min+tol and max-tol
};

export type T_toothModelData = {
    toothId: E_tooth3dId;
    fileUrl: string;
    fileUrl2: string;
    label: string;
};
