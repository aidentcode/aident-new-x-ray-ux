import {
    E_editMode,
    E_tooth3dPosition,
    E_tooth3dId,
    E_xrayType,
} from "@/lib/enums";
import { createContext, useState } from "react";
import {
    T_condition,
    T_inferenceResponse,
    T_overviewItem,
} from "@/lib/types/types";

export type T_xrayContext = {
    tabId: string;
    setTabId: (tabId: string) => void;
    imageSetup: boolean;
    setImageSetup: (imageSetup: boolean) => void;
    xrayType: E_xrayType;
    setXrayType: (xrayType: E_xrayType) => void;
    splitScreenSizes: (string | number)[];
    setSplitScreenSizes: (value: (string | number)[]) => void;
    base64ImgFromFile: string;
    setBase64ImgFromFile: (base64ImgFromFile: string) => void;
    base64ImgFromCanvas: string;
    setBase64ImgFromCanvas: (base64ImgFromCanvas: string) => void;
    editMode: E_editMode;
    setEditMode: (editMode: E_editMode) => void;
    originalState: any;
    setOriginalState: (originalState: any) => void;

    rotationAngle: number;
    setRotationAngle: (rotationAngle: number) => void;

    inferenceResponse: T_inferenceResponse | null;
    setInferenceResponse: (
        inferenceResponse: T_inferenceResponse | null
    ) => void;
    overviewItems: T_overviewItem[];
    setOverviewItems: (overviewItems: T_overviewItem[]) => void;
    overviewHash: Record<string, T_overviewItem>;
    setOverviewHash: (overviewHash: Record<string, T_overviewItem>) => void;
    conditions: T_condition[];
    setConditions: (conditions: T_condition[]) => void;
    selectedCondition: T_condition | null;
    setSelectedCondition: (selectedCondition: T_condition | null) => void;

    selectedConditionId: string | null;
    setSelectedConditionId: (selectedConditionId: string | null) => void;

    tooth3dView?: {
        toothId: E_tooth3dId | undefined;
        toothPosition: E_tooth3dPosition;
    };
    setTooth3dView: (
        tooth3dView:
            | {
                  toothId: E_tooth3dId | undefined;
                  toothPosition: E_tooth3dPosition;
              }
            | undefined
    ) => void;
    toothMaterial: "wireframe" | "solid";
    setToothMaterial: (toothMaterial: "wireframe" | "solid") => void;
    smoothCurves: boolean;
    setSmoothCurves: (smoothCurves: boolean) => void;
};
const defaultValue: T_xrayContext = {
    tabId: "overview",
    setTabId: () => {},
    imageSetup: false,
    setImageSetup: () => {},
    xrayType: E_xrayType.rvg,
    setXrayType: () => {},
    splitScreenSizes: ["100%", "0%"],
    setSplitScreenSizes: () => {},
    base64ImgFromFile: "",
    setBase64ImgFromFile: () => {},
    base64ImgFromCanvas: "",
    setBase64ImgFromCanvas: () => {},
    editMode: E_editMode.none,
    setEditMode: () => {},
    originalState: null,
    setOriginalState: () => {},
    rotationAngle: 0,
    setRotationAngle: () => {},
    inferenceResponse: null,
    setInferenceResponse: () => {},
    overviewItems: [],
    setOverviewItems: () => {},
    overviewHash: {},
    setOverviewHash: () => {},
    conditions: [],
    setConditions: () => {},
    selectedCondition: null,
    setSelectedCondition: () => {},
    selectedConditionId: null,
    setSelectedConditionId: () => {},
    tooth3dView: undefined,
    setTooth3dView: () => {},
    toothMaterial: "wireframe",
    setToothMaterial: () => {},
    smoothCurves: true,
    setSmoothCurves: () => {},
};
const XrayContext = createContext(defaultValue);

type XrayProviderProps = React.HTMLAttributes<HTMLButtonElement> & {};

function XrayProvider({ children }: XrayProviderProps) {
    const [tabId, setTabId] = useState("overview");
    const [imageSetup, setImageSetup] = useState(false);
    const [xrayType, setXrayType] = useState(E_xrayType.rvg);
    const [splitScreenSizes, setSplitScreenSizes] = useState<
        (string | number)[]
    >(defaultValue.splitScreenSizes);
    const [base64ImgFromFile, setBase64ImgFromFile] = useState("");
    const [base64ImgFromCanvas, setBase64ImgFromCanvas] = useState("");
    const [editMode, setEditMode] = useState(E_editMode.none);
    const [originalState, setOriginalState] = useState();
    const [rotationAngle, setRotationAngle] = useState(0);
    const [inferenceResponse, setInferenceResponse] =
        useState<T_inferenceResponse | null>(null);
    const [overviewItems, setOverviewItems] = useState<T_overviewItem[]>([]);
    const [overviewHash, setOverviewHash] = useState<
        Record<string, T_overviewItem>
    >({});
    const [conditions, setConditions] = useState<T_condition[]>([]);
    const [selectedCondition, setSelectedCondition] =
        useState<T_condition | null>(null);
    const [selectedConditionId, setSelectedConditionId] = useState<
        string | null
    >(null);
    const [tooth3dView, setTooth3dView] = useState<
        | {
              toothId: E_tooth3dId | undefined;
              toothPosition: E_tooth3dPosition;
          }
        | undefined
    >(undefined);
    const [toothMaterial, setToothMaterial] = useState<"wireframe" | "solid">(
        "wireframe"
    );
    const [smoothCurves, setSmoothCurves] = useState(defaultValue.smoothCurves);
    const xrayData: T_xrayContext = {
        tabId,
        setTabId,
        imageSetup,
        setImageSetup,
        xrayType,
        setXrayType,
        splitScreenSizes,
        setSplitScreenSizes,
        base64ImgFromFile,
        setBase64ImgFromFile,
        base64ImgFromCanvas,
        setBase64ImgFromCanvas,
        editMode,
        setEditMode,
        originalState,
        setOriginalState,
        rotationAngle,
        setRotationAngle,
        inferenceResponse,
        setInferenceResponse,
        overviewItems,
        setOverviewItems,
        overviewHash,
        setOverviewHash,
        conditions,
        setConditions,
        selectedCondition,
        setSelectedCondition,
        selectedConditionId,
        setSelectedConditionId,
        tooth3dView,
        setTooth3dView,
        toothMaterial,
        setToothMaterial,
        smoothCurves,
        setSmoothCurves,
    };

    return (
        <XrayContext.Provider value={xrayData}>{children}</XrayContext.Provider>
    );
}

export { XrayProvider };
export default XrayContext;
