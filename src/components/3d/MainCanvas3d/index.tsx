"use client";
import CustomSvgIcon from "@/components/ui/CustomSvgIcon";
import styles from "./mainCanvas3d.module.scss";
import { Suspense, useContext, useRef, Ref, useState, useEffect } from "react";
import XrayContext from "@/contexts/xrayContext";
import DirectionalLights from "../DirectionalLights.tsx";

import { Canvas, ObjectMap, useFrame, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, Stats, ArcballControls } from "@react-three/drei";
import {
    Euler,
    Group,
    Mesh,
    Vector3,
    Box3,
    SphereGeometry,
    MeshBasicMaterial,
    Shape,
    ExtrudeGeometry,
    MeshPhongMaterial,
} from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import GizmoArcball from "../GizmoArcball";
import MaterialSwitch from "@/components/ui/MaterialSwitch";
import { getTeethModelData } from "@/lib/data/teethModelData";
import { E_colorCode, E_tooth3dId, E_tooth3dPosition } from "@/lib/enums";
import WaitMsg from "@/components/ui/WaitMsg";
import { T_condition, T_point2D } from "@/lib/types/types";
import { getColorFromCode } from "@/lib/data/colorData";
import { rnd1 } from "@/lib/utils";
import ToothWithConditions from "./ToothWithConditions";

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
                <ToothWithConditions onProgress={onProgress} />
                {/* <MeshComponent onProgress={onProgress} /> */}
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

// // Function to create 3D shape from condition mask points
// function createConditionShape(condition: T_condition, centerPosition: Vector3) {
//     const conditionMaskPoints: T_point2D[] = condition.masks;

//     if (!conditionMaskPoints || conditionMaskPoints.length === 0) {
//         return null;
//     }

//     try {
//         // Create a shape from the mask points
//         const shape = new Shape();

//         // Convert mask points to shape vertices
//         // Assuming conditionMaskPoints contains x,y coordinates
//         const points = conditionMaskPoints.map((point: T_point2D) => {
//             // Normalize points relative to center and scale them appropriately
//             const x = (point[0] || 0) * 1.0; // Scale down for visibility
//             const y = (point[1] || 0) * 1.0;
//             return { x, y };
//         });

//         if (points.length > 0) {
//             // Start the shape path
//             shape.moveTo(points[0].x, points[0].y);

//             // Add line segments to complete the shape
//             for (let i = 1; i < points.length; i++) {
//                 shape.lineTo(points[i].x, points[i].y);
//             }

//             // Close the shape
//             shape.lineTo(points[0].x, points[0].y);
//         }

//         // Create extrude settings with bevels
//         const extrudeSettings = {
//             depth: 0.125, // Extrusion depth
//             bevelEnabled: false,
//             // bevelThickness: 0.1, // Bevel thickness
//             // bevelSize: 0.1, // Bevel size
//             // bevelOffset: 0,
//             // bevelSegments: 3, // Number of bevel segments for smoothness
//         };

//         // Create the extruded geometry
//         const geometry = new ExtrudeGeometry(shape, extrudeSettings);

//         // Create material with some transparency
//         const colorCode: E_colorCode = condition.colorCode;

//         const material = new MeshPhongMaterial({
//             //color: 0xff0000, // Red color
//             color: getColorFromCode(colorCode, "0x"),
//             transparent: true,
//             opacity: 0.7,
//             side: 1,
//             wireframe: false,
//         });

//         // Create mesh and position it
//         const mesh = new Mesh(geometry, material);
//         mesh.position.copy(centerPosition);

//         return mesh;
//     } catch (error) {
//         console.error("Error creating condition shape:", error);
//         return null;
//     }
// }

// function MeshComponent({
//     onProgress,
// }: {
//     onProgress: (loaded: number, total: number) => void;
// }) {
//     const xrayContext = useContext(XrayContext);
//     const { toothMaterial, tooth3dView, conditions, selectedConditionId } =
//         xrayContext;
//     const toothLocation = tooth3dView?.toothPosition;

//     //console.log("toothLocation=", toothLocation);
//     // console.log("conditions=", conditions);
//     // console.log("selectedConditionId=", selectedConditionId);

//     const teethConditions = conditions.filter((x) => !x.parentOverlayName);
//     //console.log("teethConditions=", teethConditions);

//     const selectedToothId =
//         selectedConditionId ??
//         (teethConditions.length > 0 ? teethConditions[0].id : "");
//     // console.log("selectedToothId=", selectedToothId);

//     const relevantConditionsForTooth = conditions.filter(
//         (x) => x.parentOverlayName === selectedToothId
//     );
//     console.log("relevantConditionsForTooth=", relevantConditionsForTooth);
//     console.log("toothLocation=", toothLocation);

//     let toothRotation = [0, 0, 0];
//     let toothPosition = [0, 0, 0];
//     let conditionPosition = [0, 0, 0];
//     let conditionRotation = [0, 0, 0];
//     let conditionScale = [1, 1, 1];
//     let groupPosition = [0, 0, 0];
//     let groupRotation = [0, 0, 0];
//     switch (toothLocation) {
//         // case E_tooth3dPosition["top-left"]:
//         //     toothRotation = [0, -22.5, 0];
//         //     toothPosition = [0, -2, 0];
//         //     break;
//         case E_tooth3dPosition["top-right"]:
//             // toothRotation = [0, 22.5, 0];
//             // toothPosition = [0, -2, 0];
//             // toothRotation = [0, 0, 0];
//             // toothPosition = [0, -2, 0];
//             // conditionPosition = [0, 0, 0];
//             conditionRotation = [Math.PI, 0, 0];
//             break;
//         // case E_tooth3dPosition["bottom-left"]:
//         //     toothRotation = [0, -22.5, 180];
//         //     toothPosition = [0, 2, 0];
//         //     break;
//         // case E_tooth3dPosition["bottom-right"]:
//         //     toothRotation = [0, 22.5, 180];
//         //     toothPosition = [0, 2, 0];
//         //     break;
//     }
//     // rotation = rotation.map((r) => (r = r * (Math.PI / 180)));
//     // console.log("toothPosition=", toothPosition);
//     // console.log("toothRotation=", toothRotation);
//     // console.log("conditionPosition=", conditionPosition);
//     // console.log("conditionRotation=", conditionRotation);

//     console.log("tooth3dView?.toothId=", tooth3dView?.toothId);
//     const toothModelData = getTeethModelData(
//         tooth3dView?.toothId || E_tooth3dId["select-tooth"]
//     );
//     const fileUrl = toothModelData.fileUrl;

//     const [isLoading, setIsLoading] = useState(true);

//     const [centerPosition, setCenterPosition] = useState<Vector3>(
//         new Vector3(0, 0, 0)
//     );
//     const [conditionCenterPosition, setConditionCenterPosition] =
//         useState<Vector3>(new Vector3(0, 0, 0));
//     const [boundingBoxSize, setBoundingBoxSize] = useState<Vector3>(
//         new Vector3(1, 1, 1)
//     );
//     const [conditionBoundingBoxSize, setConditionBoundingBoxSize] =
//         useState<Vector3>(new Vector3(1, 1, 1));

//     const meshRef = useRef<Group>(null!);
//     const conditionGroupRef = useRef<Group>(null!);

//     // console.log("fileUrl=", fileUrl);
//     const wireframeGltf = useLoader(
//         GLTFLoader,
//         fileUrl,
//         (loader: GLTFLoader) => {
//             loader.manager.onProgress = (
//                 _: unknown,
//                 loaded: number,
//                 total: number
//             ) => {
//                 onProgress(loaded, total);
//             };
//             loader.manager.onLoad = () => {
//                 setIsLoading(false);
//             };
//             loader.manager.onError = () => {
//                 setIsLoading(false);
//             };
//             loader.manager.onStart = () => {
//                 setIsLoading(true);
//             };
//         }
//     );

//     useEffect(() => {
//         onProgress(100, 100);
//     }, [isLoading, wireframeGltf, onProgress]);

//     // Calculate bounds and center of the wireframeGltf primitive
//     useEffect(() => {
//         if (wireframeGltf && wireframeGltf.scene) {
//             const box = new Box3().setFromObject(wireframeGltf.scene);
//             const center = box.getCenter(new Vector3());
//             const size = box.getSize(new Vector3());
//             console.log("Wireframe bounds:", box);
//             console.log(
//                 "Wireframe center: xyz=",
//                 rnd1(center.x),
//                 rnd1(center.y),
//                 rnd1(center.z)
//             );
//             console.log(
//                 "Wireframe dimensions, size.xyz=",
//                 rnd1(size.x),
//                 rnd1(size.y),
//                 rnd1(size.z)
//             );
//             setCenterPosition(center);
//             setBoundingBoxSize(size);

//             const box2 = new Box3().setFromObject(conditionGroupRef.current);
//             const center2 = box2.getCenter(new Vector3());
//             const size2 = box2.getSize(new Vector3());
//             console.log("Condition bounds:", box2);
//             console.log(
//                 "Condition center: xyz=",
//                 rnd1(center2.x),
//                 rnd1(center2.y),
//                 rnd1(center2.z)
//             );
//             console.log(
//                 "Condition dimensions, size.xyz=",
//                 rnd1(size2.x),
//                 rnd1(size2.y),
//                 rnd1(size2.z)
//             );
//         }
//     }, [wireframeGltf]);

//     if (toothMaterial === "wireframe") {
//         makeMaterialWireframe(wireframeGltf);
//     } else {
//         makeMaterialSolid(wireframeGltf);
//     }

//     const toothPositionVector = new Vector3(
//         toothPosition[0],
//         toothPosition[1],
//         toothPosition[2]
//     );
//     const toothRotationEuler = new Euler(
//         toothRotation[0],
//         toothRotation[1],
//         toothRotation[2]
//     );
//     const conditionPositionVector = new Vector3(
//         conditionPosition[0],
//         conditionPosition[1],
//         conditionPosition[2]
//     );
//     const conditionRotationEuler = new Euler(
//         conditionRotation[0],
//         conditionRotation[1],
//         conditionRotation[2]
//     );
//     const groupPositionVector = new Vector3(
//         groupPosition[0],
//         groupPosition[1],
//         groupPosition[2]
//     );
//     const groupRotationEuler = new Euler(
//         groupRotation[0],
//         groupRotation[1],
//         groupRotation[2]
//     );

//     // const conditionMaskPoints: T_point2D[] =
//     //     relevantConditionsForTooth.length > 0
//     //         ? relevantConditionsForTooth[0].masks
//     //         : [];

//     let conditionShapeMeshes: Mesh[] = [];
//     for (const condition of relevantConditionsForTooth) {
//         const conditionShapeMesh = createConditionShape(
//             condition,
//             centerPosition
//         );
//         if (conditionShapeMesh) {
//             conditionShapeMeshes.push(conditionShapeMesh);
//         }
//     }
//     console.log("conditionShapeMeshes=", conditionShapeMeshes);

//     return (
//         <>
//             <group
//                 ref={meshRef}
//                 position={toothPositionVector}
//                 rotation={toothRotationEuler}
//             >
//                 <primitive object={wireframeGltf.scene} />
//                 {/* Center sphere marker */}
//                 <mesh position={centerPosition}>
//                     <sphereGeometry args={[0.05, 16, 16]} />
//                     <meshBasicMaterial color="red" />
//                 </mesh>
//                 {/* Bounding box wireframe */}
//                 <mesh position={centerPosition}>
//                     <boxGeometry
//                         args={[
//                             boundingBoxSize.x,
//                             boundingBoxSize.y,
//                             boundingBoxSize.z,
//                         ]}
//                     />
//                     <meshBasicMaterial color="blue" wireframe={true} />
//                 </mesh>
//             </group>
//             <group
//                 ref={conditionGroupRef}
//                 // position={conditionPositionVector}
//                 //rotation={conditionRotationEuler}
//                 // scale={boundingBoxSize}
//             >
//                 {/* Condition shape mesh */}
//                 {conditionShapeMeshes &&
//                     conditionShapeMeshes.map((mesh, index) => (
//                         <primitive
//                             key={index}
//                             object={mesh}
//                             //scale={boundingBoxSize}
//                             //position={new Vector3(0, -2.7, 0)}
//                         />
//                     ))}
//                 {/* Center sphere marker */}
//                 <mesh position={conditionCenterPosition}>
//                     <sphereGeometry args={[0.05, 16, 16]} />
//                     <meshBasicMaterial color="yellow" />
//                 </mesh>
//                 {/* Bounding box wireframe */}
//                 <mesh position={conditionCenterPosition}>
//                     <boxGeometry
//                         args={[
//                             conditionBoundingBoxSize.x,
//                             conditionBoundingBoxSize.y,
//                             conditionBoundingBoxSize.z,
//                         ]}
//                     />
//                     <meshBasicMaterial color="green" wireframe={true} />
//                 </mesh>
//             </group>
//         </>
//     );
// }

// function MeshComponentAnimated({
//     onProgress,
// }: {
//     onProgress: (loaded: number, total: number) => void;
// }) {
//     const xrayContext = useContext(XrayContext);
//     const { tooth3dView } = xrayContext;
//     const toothPosition = tooth3dView?.toothPosition;
//     // console.log("toothPosition=", toothPosition);
//     let rotation = [0, 0, 0];
//     let position = [0, -2, 0];
//     switch (toothPosition) {
//         case E_tooth3dPosition["top-left"]:
//             rotation = [0, -22.5, 0];
//             position = [0, -2, 0];
//             break;
//         case E_tooth3dPosition["top-right"]:
//             rotation = [0, 22.5, 0];
//             position = [0, -2, 0];
//             break;
//         case E_tooth3dPosition["bottom-left"]:
//             rotation = [0, -22.5, 180];
//             position = [0, 2, 0];
//             break;
//         case E_tooth3dPosition["bottom-right"]:
//             rotation = [0, 22.5, 180];
//             position = [0, 2, 0];
//             break;
//     }
//     rotation = rotation.map((r) => (r = r * (Math.PI / 180)));

//     const toothModelData = getTeethModelData(
//         tooth3dView?.toothId || E_tooth3dId["select-tooth"]
//     );
//     const fileUrl = toothModelData.fileUrl;
//     const fileUrl2 = toothModelData.fileUrl2;

//     const [isLoading, setIsLoading] = useState(true);
//     const meshRef = useRef<Group>(null!);

//     const wireframeGltf = useLoader(
//         GLTFLoader,
//         fileUrl,
//         (loader: GLTFLoader) => {
//             loader.manager.onProgress = (
//                 _: unknown,
//                 loaded: number,
//                 total: number
//             ) => {
//                 onProgress(loaded, total);
//             };
//             loader.manager.onLoad = () => {
//                 setIsLoading(false);
//             };
//             loader.manager.onError = () => {
//                 setIsLoading(false);
//             };
//             loader.manager.onStart = () => {
//                 setIsLoading(true);
//             };
//         }
//     );
//     const solidGltf = useLoader(GLTFLoader, fileUrl2 || "");

//     useEffect(() => {
//         onProgress(100, 100);
//     }, [isLoading, wireframeGltf, onProgress]);

//     // if (toothMaterial === "wireframe") {
//     //     makeMaterialWireframe(wireframeGltf);
//     // } else {
//     //     makeMaterialSolid(wireframeGltf);
//     // }
//     makeMaterialWireframe(wireframeGltf);

//     if (fileUrl2) {
//         makeMaterialSolid(solidGltf);
//         setScale(solidGltf, 1.01);
//     }

//     useFrame(() => {
//         if (!fileUrl2) return;
//         // Apply sine wave to opacity
//         const t = performance.now() / 1000; // Define t as time in seconds
//         const f = 0.125; // Define frequency, assuming a value for demonstration

//         const sineOpacity = Math.sin(2 * Math.PI * f * t);
//         const cosineOpacity = Math.cos(2 * Math.PI * f * t);
//         //const linearOpacity = (t % 8) / 8; // Linear value that goes from 0 to 1 over 8 seconds

//         setMaterialOpacity(solidGltf, 1 - cosineOpacity);
//         setMaterialOpacity(wireframeGltf, cosineOpacity);
//         //setScale(solidGltf, 1 + 0.01 * linearOpacity);
//         //setScale(wireframeGltf, 1 + 0.01 * linearOpacity);
//         // setMaterialOpacity(wireframeGltf, 0);

//         // Swing the group based on opacity
//         if (meshRef.current) {
//             const maxAngle = Math.PI * 0.5;
//             const swingAngle = maxAngle * Math.sin((sineOpacity * Math.PI) / 4);
//             meshRef.current.rotation.y = swingAngle;
//         }
//     });

//     const positionVector = new Vector3(position[0], position[1], position[2]);
//     const rotationEuler = new Euler(rotation[0], rotation[1], rotation[2]);

//     return (
//         <>
//             <group
//                 ref={meshRef}
//                 position={positionVector}
//                 rotation={rotationEuler}
//             >
//                 <primitive object={wireframeGltf.scene} />
//                 <primitive object={solidGltf.scene} />
//             </group>
//         </>
//     );
// }

// function setMaterialOpacity(gltf: GLTF & ObjectMap, opacity: number) {
//     gltf.scene.traverse((child: any) => {
//         if (child instanceof Mesh) {
//             if (Array.isArray(child.material)) {
//                 child.material.forEach((material) => {
//                     material.opacity = opacity;
//                     material.needsUpdate = true;
//                 });
//             } else {
//                 child.material.opacity = opacity;
//                 child.material.needsUpdate = true;
//             }
//         }
//     });
// }
// function setScale(gltf: GLTF & ObjectMap, scale: number) {
//     gltf.scene.traverse((child: any) => {
//         if (child instanceof Mesh) {
//             child.scale.set(scale, scale, scale);
//         }
//     });
// }

// function makeMaterialSolid(gltf: GLTF & ObjectMap) {
//     // Make all materials solid
//     gltf.scene.traverse((child: any) => {
//         if (child instanceof Mesh) {
//             if (Array.isArray(child.material)) {
//                 child.material.forEach((material) => {
//                     material.wireframe = false;
//                     material.color.set("#ffffff");
//                     material.opacity = 1;
//                     material.transparent = true;
//                     material.wireframeLinecap = "round";
//                     material.wireframeLinejoin = "round";
//                     material.wireframeLinewidth = 1;
//                     material.depthTest = true;
//                     material.depthWrite = true;
//                     // material.side = FrontSide;
//                     // material.transparent = true;
//                 });
//             } else {
//                 child.material.wireframe = false;
//                 child.material.color.set("#ffffff");
//                 child.material.opacity = 1;
//                 child.material.transparent = true;
//                 child.material.wireframeLinecap = "round";
//                 child.material.wireframeLinejoin = "round";
//                 child.material.wireframeLinewidth = 1;
//                 child.material.depthTest = true;
//                 child.material.depthWrite = true;
//                 // child.material.side = FrontSide;
//             }
//         }
//     });
// }
// function makeMaterialWireframe(gltf: GLTF & ObjectMap) {
//     // Make all materials wireframe and yellow
//     gltf.scene.traverse((child: any) => {
//         if (child instanceof Mesh) {
//             if (Array.isArray(child.material)) {
//                 child.material.forEach((material) => {
//                     material.wireframe = true;
//                     material.color.set("#ffff00");
//                     material.wireframeLinecap = "round";
//                     material.wireframeLinejoin = "round";
//                     material.wireframeLinewidth = 1;
//                     material.depthTest = false;
//                     material.depthWrite = false;
//                     // material.side = DoubleSide;
//                     material.transparent = true;
//                 });
//             } else {
//                 child.material.wireframe = true;
//                 child.material.color.set("#ffff00");
//                 child.material.wireframeLinecap = "round";
//                 child.material.wireframeLinejoin = "round";
//                 child.material.wireframeLinewidth = 1;
//                 child.material.depthTest = false;
//                 child.material.depthWrite = false;
//                 //child.material.side = DoubleSide;
//                 child.material.transparent = true;
//             }
//         }
//     });
// }
