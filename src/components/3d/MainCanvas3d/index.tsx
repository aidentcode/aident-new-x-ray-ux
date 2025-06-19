"use client";
import CustomSvgIcon from "@/components/ui/CustomSvgIcon";
import styles from "./mainCanvas3d.module.scss";
import { Suspense, useContext, useRef, Ref, useState, useEffect } from "react";
import XrayContext from "@/contexts/xrayContext";
import DirectionalLights from "../DirectionalLights.tsx";

import { Canvas, ObjectMap, useFrame, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, Stats, ArcballControls } from "@react-three/drei";
import { Euler, Group, Mesh, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import GizmoArcball from "../GizmoArcball";
import MaterialSwitch from "@/components/ui/MaterialSwitch";
import { getTeethModelData } from "@/lib/data/teethModelData";
import { E_tooth3dId, E_tooth3dPosition } from "@/lib/enums";
import WaitMsg from "@/components/ui/WaitMsg";

export const CAM_HEIGHT = 6,
    ORTHOCAM_DEFAULT_ZOOM = 20.96298075970983;
export const getDefaultCameraPosition = (): [
    x: number,
    y: number,
    z: number
] => {
    //return [0, 0, CAM_HEIGHT];
    return [CAM_HEIGHT, CAM_HEIGHT, CAM_HEIGHT];
    // return [CAM_HEIGHT, CAM_HEIGHT, -CAM_HEIGHT];
};
export const getDefaultCameraZoom = (): number => {
    return 1;
};

export default function MainCanvas3d() {
    const xrayContext = useContext(XrayContext);
    const { tooth3dView, setTooth3dView } = xrayContext;
    const cameraSettings = {
        fov: 60,
        position: getDefaultCameraPosition(),
        zoom: getDefaultCameraZoom(),
    };
    const arcballControlsRef: Ref<typeof ArcballControls | undefined> =
        useRef(undefined);
    const gizmoType: "xyz" | "cube" = "cube";
    const toothModelData = getTeethModelData(
        tooth3dView?.toothId || E_tooth3dId["select-tooth"]
    );

    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    const onProgress = (loaded: number, total: number) => {
        // console.log("loaded", loaded, "total", total);
        const progress = Math.round((loaded / total) * 100);
        if (progress === 100) {
            setIsLoading(false);
        } else {
            setLoadProgress(progress);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backContainer}>
                <CustomSvgIcon
                    iconId="backward"
                    tooltipText="Back to Tooth Selection"
                    className={styles["size24"]}
                    onClickCallback={() => {
                        setTooth3dView(undefined);
                    }}
                />
            </div>
            {isLoading && (
                <div className={styles.loadingMessage}>
                    <WaitMsg
                        msg={`Loading 3D Model... (${loadProgress}%)`}
                        showSpinner
                    />
                </div>
            )}
            <Canvas
                shadows
                id="3d-canvas"
                gl={{ preserveDrawingBuffer: false, alpha: true }}
            >
                <PerspectiveCamera
                    position={cameraSettings.position}
                    fov={cameraSettings.fov}
                    makeDefault={true}
                />
                <DirectionalLights />
                <MeshComponent onProgress={onProgress} />
                {/* <MeshComponentAnimated onProgress={onProgress} /> */}
                {process.env.NODE_ENV === "development" && (
                    <Stats className={styles["stat-container"]} />
                )}
                <ArcballControls
                    ref={arcballControlsRef as any}
                    minDistance={0.01}
                    enabled={true}
                    makeDefault={true}
                    enableAnimations
                    enablePan={true}
                    enableRotate={true}
                    enableZoom={true}
                    enableGrid={true}
                    onStart={() => {}}
                    onEnd={() => {}}
                />
                <Suspense fallback={null}>
                    <GizmoArcball
                        controlsRef={arcballControlsRef}
                        gizmoType={gizmoType}
                    />
                </Suspense>
            </Canvas>
            <div className={styles.top}>
                <div className={styles.title}>{toothModelData.label}</div>
            </div>
            <div className={styles.bottom}>
                <MaterialSwitch />
            </div>
        </div>
    );
}

function MeshComponent({
    onProgress,
}: {
    onProgress: (loaded: number, total: number) => void;
}) {
    const xrayContext = useContext(XrayContext);
    const { toothMaterial, tooth3dView } = xrayContext;
    const toothPosition = tooth3dView?.toothPosition;
    // console.log("toothPosition=", toothPosition);
    let rotation = [0, 0, 0];
    let position = [0, -2, 0];
    switch (toothPosition) {
        case E_tooth3dPosition["top-left"]:
            rotation = [0, -22.5, 0];
            position = [0, -2, 0];
            break;
        case E_tooth3dPosition["top-right"]:
            rotation = [0, 22.5, 0];
            position = [0, -2, 0];
            break;
        case E_tooth3dPosition["bottom-left"]:
            rotation = [0, -22.5, 180];
            position = [0, 2, 0];
            break;
        case E_tooth3dPosition["bottom-right"]:
            rotation = [0, 22.5, 180];
            position = [0, 2, 0];
            break;
    }
    rotation = rotation.map((r) => (r = r * (Math.PI / 180)));

    const toothModelData = getTeethModelData(
        tooth3dView?.toothId || E_tooth3dId["select-tooth"]
    );
    const fileUrl = toothModelData.fileUrl;

    const [isLoading, setIsLoading] = useState(true);
    const meshRef = useRef<Group>(null!);

    const wireframeGltf = useLoader(
        GLTFLoader,
        fileUrl,
        (loader: GLTFLoader) => {
            loader.manager.onProgress = (
                _: unknown,
                loaded: number,
                total: number
            ) => {
                onProgress(loaded, total);
            };
            loader.manager.onLoad = () => {
                setIsLoading(false);
            };
            loader.manager.onError = () => {
                setIsLoading(false);
            };
            loader.manager.onStart = () => {
                setIsLoading(true);
            };
        }
    );

    useEffect(() => {
        onProgress(100, 100);
    }, [isLoading, wireframeGltf, onProgress]);

    if (toothMaterial === "wireframe") {
        makeMaterialWireframe(wireframeGltf);
    } else {
        makeMaterialSolid(wireframeGltf);
    }

    const positionVector = new Vector3(position[0], position[1], position[2]);
    const rotationEuler = new Euler(rotation[0], rotation[1], rotation[2]);

    return (
        <>
            <group
                ref={meshRef}
                position={positionVector}
                rotation={rotationEuler}
            >
                <primitive object={wireframeGltf.scene} />
            </group>
        </>
    );
}

function MeshComponentAnimated({
    onProgress,
}: {
    onProgress: (loaded: number, total: number) => void;
}) {
    const xrayContext = useContext(XrayContext);
    const { tooth3dView } = xrayContext;
    const toothPosition = tooth3dView?.toothPosition;
    // console.log("toothPosition=", toothPosition);
    let rotation = [0, 0, 0];
    let position = [0, -2, 0];
    switch (toothPosition) {
        case E_tooth3dPosition["top-left"]:
            rotation = [0, -22.5, 0];
            position = [0, -2, 0];
            break;
        case E_tooth3dPosition["top-right"]:
            rotation = [0, 22.5, 0];
            position = [0, -2, 0];
            break;
        case E_tooth3dPosition["bottom-left"]:
            rotation = [0, -22.5, 180];
            position = [0, 2, 0];
            break;
        case E_tooth3dPosition["bottom-right"]:
            rotation = [0, 22.5, 180];
            position = [0, 2, 0];
            break;
    }
    rotation = rotation.map((r) => (r = r * (Math.PI / 180)));

    const toothModelData = getTeethModelData(
        tooth3dView?.toothId || E_tooth3dId["select-tooth"]
    );
    const fileUrl = toothModelData.fileUrl;
    const fileUrl2 = toothModelData.fileUrl2;

    const [isLoading, setIsLoading] = useState(true);
    const meshRef = useRef<Group>(null!);

    const wireframeGltf = useLoader(
        GLTFLoader,
        fileUrl,
        (loader: GLTFLoader) => {
            loader.manager.onProgress = (
                _: unknown,
                loaded: number,
                total: number
            ) => {
                onProgress(loaded, total);
            };
            loader.manager.onLoad = () => {
                setIsLoading(false);
            };
            loader.manager.onError = () => {
                setIsLoading(false);
            };
            loader.manager.onStart = () => {
                setIsLoading(true);
            };
        }
    );
    const solidGltf = useLoader(GLTFLoader, fileUrl2 || "");

    useEffect(() => {
        onProgress(100, 100);
    }, [isLoading, wireframeGltf, onProgress]);

    // if (toothMaterial === "wireframe") {
    //     makeMaterialWireframe(wireframeGltf);
    // } else {
    //     makeMaterialSolid(wireframeGltf);
    // }
    makeMaterialWireframe(wireframeGltf);

    if (fileUrl2) {
        makeMaterialSolid(solidGltf);
        setScale(solidGltf, 1.01);
    }

    useFrame(() => {
        if (!fileUrl2) return;
        // Apply sine wave to opacity
        const t = performance.now() / 1000; // Define t as time in seconds
        const f = 0.125; // Define frequency, assuming a value for demonstration

        const sineOpacity = Math.sin(2 * Math.PI * f * t);
        const cosineOpacity = Math.cos(2 * Math.PI * f * t);
        //const linearOpacity = (t % 8) / 8; // Linear value that goes from 0 to 1 over 8 seconds

        setMaterialOpacity(solidGltf, 1 - cosineOpacity);
        setMaterialOpacity(wireframeGltf, cosineOpacity);
        //setScale(solidGltf, 1 + 0.01 * linearOpacity);
        //setScale(wireframeGltf, 1 + 0.01 * linearOpacity);
        // setMaterialOpacity(wireframeGltf, 0);

        // Swing the group based on opacity
        if (meshRef.current) {
            const maxAngle = Math.PI * 0.5;
            const swingAngle = maxAngle * Math.sin((sineOpacity * Math.PI) / 4);
            meshRef.current.rotation.y = swingAngle;
        }
    });

    const positionVector = new Vector3(position[0], position[1], position[2]);
    const rotationEuler = new Euler(rotation[0], rotation[1], rotation[2]);

    return (
        <>
            <group
                ref={meshRef}
                position={positionVector}
                rotation={rotationEuler}
            >
                <primitive object={wireframeGltf.scene} />
                <primitive object={solidGltf.scene} />
            </group>
        </>
    );
}

function setMaterialOpacity(gltf: GLTF & ObjectMap, opacity: number) {
    gltf.scene.traverse((child: any) => {
        if (child instanceof Mesh) {
            if (Array.isArray(child.material)) {
                child.material.forEach((material) => {
                    material.opacity = opacity;
                    material.needsUpdate = true;
                });
            } else {
                child.material.opacity = opacity;
                child.material.needsUpdate = true;
            }
        }
    });
}
function setScale(gltf: GLTF & ObjectMap, scale: number) {
    gltf.scene.traverse((child: any) => {
        if (child instanceof Mesh) {
            child.scale.set(scale, scale, scale);
        }
    });
}

function makeMaterialSolid(gltf: GLTF & ObjectMap) {
    // Make all materials solid
    gltf.scene.traverse((child: any) => {
        if (child instanceof Mesh) {
            if (Array.isArray(child.material)) {
                child.material.forEach((material) => {
                    material.wireframe = false;
                    material.color.set("#ffffff");
                    material.opacity = 1;
                    material.transparent = true;
                    material.wireframeLinecap = "round";
                    material.wireframeLinejoin = "round";
                    material.wireframeLinewidth = 1;
                    material.depthTest = true;
                    material.depthWrite = true;
                    // material.side = FrontSide;
                    // material.transparent = true;
                });
            } else {
                child.material.wireframe = false;
                child.material.color.set("#ffffff");
                child.material.opacity = 1;
                child.material.transparent = true;
                child.material.wireframeLinecap = "round";
                child.material.wireframeLinejoin = "round";
                child.material.wireframeLinewidth = 1;
                child.material.depthTest = true;
                child.material.depthWrite = true;
                // child.material.side = FrontSide;
            }
        }
    });
}
function makeMaterialWireframe(gltf: GLTF & ObjectMap) {
    // Make all materials wireframe and yellow
    gltf.scene.traverse((child: any) => {
        if (child instanceof Mesh) {
            if (Array.isArray(child.material)) {
                child.material.forEach((material) => {
                    material.wireframe = true;
                    material.color.set("#ffff00");
                    material.wireframeLinecap = "round";
                    material.wireframeLinejoin = "round";
                    material.wireframeLinewidth = 1;
                    material.depthTest = false;
                    material.depthWrite = false;
                    // material.side = DoubleSide;
                    material.transparent = true;
                });
            } else {
                child.material.wireframe = true;
                child.material.color.set("#ffff00");
                child.material.wireframeLinecap = "round";
                child.material.wireframeLinejoin = "round";
                child.material.wireframeLinewidth = 1;
                child.material.depthTest = false;
                child.material.depthWrite = false;
                //child.material.side = DoubleSide;
                child.material.transparent = true;
            }
        }
    });
}
