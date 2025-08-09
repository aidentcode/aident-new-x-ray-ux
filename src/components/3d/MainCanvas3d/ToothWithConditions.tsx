import XrayContext from "@/contexts/xrayContext";
import { getColorFromCode } from "@/lib/data/colorData";
import { getTeethModelData } from "@/lib/data/teethModelData";
import { E_colorCode, E_tooth3dId, E_tooth3dPosition } from "@/lib/enums";
import { T_condition, T_point2D } from "@/lib/types/types";
import { rnd1, vrnd1, vrnd2 } from "@/lib/utils";
import { ObjectMap, useLoader } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import {
    Box3,
    Euler,
    ExtrudeGeometry,
    Group,
    Mesh,
    MeshPhongMaterial,
    Quaternion,
    Shape,
    Vector3,
} from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type T_transforms = {
    position: Vector3;
    rotation: Euler;
    quaternion: Quaternion;
    scale: Vector3;
};

export default function ToothWithConditions({
    onProgress,
}: {
    onProgress: (loaded: number, total: number) => void;
}) {
    const xrayContext = useContext(XrayContext);
    const { toothMaterial, tooth3dView, conditions, selectedConditionId } =
        xrayContext;
    const toothPositionInMouth = tooth3dView?.toothPosition;
    const toothModelData = getTeethModelData(
        tooth3dView?.toothId || E_tooth3dId["select-tooth"]
    );
    const fileUrl = toothModelData.fileUrl;
    const [isLoading, setIsLoading] = useState(true);

    const toothGroupRef = useRef<Group>(null!);
    const conditionGroupRef = useRef<Group>(null!);

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

    const toothTransforms = getDefaultToothTransforms(toothPositionInMouth);
    const [conditionTransforms, setConditionTransforms] =
        useState<T_transforms>(computeConditionTransforms());
    const [center1, setCenter1] = useState<Vector3>(new Vector3(0, 0, 0));
    const [size1, setSize1] = useState<Vector3>(new Vector3(1, 1, 1));
    const [center2, setCenter2] = useState<Vector3>(new Vector3(0, 0, 0));
    const [size2, setSize2] = useState<Vector3>(new Vector3(1, 1, 1));
    const [center3, setCenter3] = useState<Vector3>(new Vector3(0, 0, 0));
    const [size3, setSize3] = useState<Vector3>(new Vector3(1, 1, 1));

    const [aligned, setAligned] = useState(false);

    const [conditionMeshes, setConditionMeshes] = useState<Mesh[]>([]);

    // Calculate bounds and center of the wireframeGltf primitive
    useEffect(() => {
        if (wireframeGltf && wireframeGltf.scene) {
            // console.log("r1", conditionMeshes.length);
            if (!conditionMeshes.length) {
                const box1 = new Box3().setFromObject(wireframeGltf.scene);
                const center1 = box1.getCenter(new Vector3());
                const size1 = box1.getSize(new Vector3());
                setCenter1(center1);
                setSize1(size1);

                const box2 = new Box3().setFromObject(toothGroupRef.current);
                const center2 = box2.getCenter(new Vector3());
                const size2 = box2.getSize(new Vector3());
                setCenter2(center2);
                setSize2(size2);
                // console.log("center1=", vrnd2(center1));
                // console.log("center2=", vrnd2(center2));
                // console.log("size1=", vrnd2(size1));
                // console.log("size2=", vrnd2(size2));

                const maxSize = Math.max(size2.x, size2.y, size2.z);
                const scaleFactor = maxSize * 0.9;
                setConditionTransforms({
                    ...conditionTransforms,
                    // Scale to 90% of the tooth size
                    scale: new Vector3(scaleFactor, scaleFactor, scaleFactor),
                });

                const relevantConditionsForTooth =
                    getRelevantConditionsForTooth(
                        conditions,
                        selectedConditionId
                    );
                const t = getConditionMeshes(
                    relevantConditionsForTooth,
                    new Vector3(0, 0, 0)
                );
                setConditionMeshes(t);
            } else {
                const box3 = new Box3().setFromObject(
                    conditionGroupRef.current
                );
                const center3 = box3.getCenter(new Vector3());
                const size3 = box3.getSize(new Vector3());
                const bottomCenter3 = center3
                    .clone()
                    .add(new Vector3(0, -size3.y * 0.5, 0));
                setCenter3(center3);
                setSize3(size3);

                if (!aligned) {
                    //Translate by diff between center3 and center2
                    const box2 = new Box3().setFromObject(
                        toothGroupRef.current
                    );
                    const center2 = box2.getCenter(new Vector3());
                    const size2 = box2.getSize(new Vector3());
                    const bottomCenter2 = center2
                        .clone()
                        .add(new Vector3(0, -size2.y * 0.5, 0));

                    const centerDiff = center2.clone().sub(center3);
                    const bottomCenterDiff = bottomCenter2
                        .clone()
                        .sub(bottomCenter3);
                    setConditionTransforms({
                        ...conditionTransforms,
                        position: bottomCenterDiff,
                    });
                    setAligned(true);
                }
            }
        }
    }, [
        wireframeGltf,
        conditions,
        selectedConditionId,
        conditionMeshes,
        conditionTransforms,
        aligned,
    ]);

    if (toothMaterial === "wireframe") {
        makeMaterialWireframe(wireframeGltf);
    } else {
        makeMaterialSolid(wireframeGltf);
    }

    return (
        <>
            <group ref={toothGroupRef} position={toothTransforms.position}>
                <primitive object={wireframeGltf.scene} />
            </group>
            <group
                ref={conditionGroupRef}
                position={conditionTransforms.position}
                quaternion={conditionTransforms.quaternion}
                scale={conditionTransforms.scale}
            >
                {conditionMeshes &&
                    conditionMeshes.map((mesh, index) => (
                        <primitive key={index} object={mesh} />
                    ))}
            </group>
        </>
    );
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

function getDefaultToothTransforms(
    toothPositionInMouth?: E_tooth3dPosition
): T_transforms {
    return {
        position: new Vector3(0, -2, 0),
        rotation: new Euler(0, 0, 0),
        quaternion: new Quaternion(),
        scale: new Vector3(1, 1, 1),
    };
}
function computeConditionTransforms(originPoint?: Vector3): T_transforms {
    // Rotate by 180 degrees about an axis parallel to X-axis
    const axis = new Vector3(1, 0, 0);
    const angleRadians = Math.PI;
    const quaternion = new Quaternion().setFromAxisAngle(axis, angleRadians);

    // If rotation must occur about a world-space line parallel to X that passes through a point P,
    // the equivalent transform is: T(P) * R * T(-P).
    // In TRS form (with only position and rotation), set:
    // position = P - R(P)
    const pivot = originPoint ?? new Vector3(0, 0, 0);
    const rotatedPivot = pivot.clone().applyQuaternion(quaternion);
    const position = pivot.clone().sub(rotatedPivot);

    const rotation = new Euler().setFromQuaternion(quaternion);

    return {
        position: new Vector3(0, 0, 0),
        rotation,
        quaternion,
        scale: new Vector3(1, 1, 1),
    };
}

function getConditionMeshes(
    relevantConditionsForTooth: T_condition[],
    centerPosition: Vector3
) {
    let conditionShapeMeshes: Mesh[] = [];
    for (const condition of relevantConditionsForTooth) {
        const conditionShapeMesh = createConditionShape(
            condition,
            centerPosition
        );
        if (conditionShapeMesh) {
            conditionShapeMeshes.push(conditionShapeMesh);
        }
    }
    // console.log("conditionShapeMeshes=", conditionShapeMeshes);
    return conditionShapeMeshes;
}
// Function to create 3D shape from condition mask points
function createConditionShape(condition: T_condition, centerPosition: Vector3) {
    const conditionMaskPoints: T_point2D[] = condition.masks;

    if (!conditionMaskPoints || conditionMaskPoints.length === 0) {
        return null;
    }

    try {
        // Create a shape from the mask points
        const shape = new Shape();

        // Convert mask points to shape vertices
        // Assuming conditionMaskPoints contains x,y coordinates
        const points = conditionMaskPoints.map((point: T_point2D) => {
            // Normalize points relative to center and scale them appropriately
            const x = (point[0] || 0) * 1.0; // Scale down for visibility
            const y = (point[1] || 0) * 1.0;
            return { x, y };
        });

        if (points.length > 0) {
            // Start the shape path
            shape.moveTo(points[0].x, points[0].y);

            // Add line segments to complete the shape
            for (let i = 1; i < points.length; i++) {
                shape.lineTo(points[i].x, points[i].y);
            }

            // Close the shape
            shape.lineTo(points[0].x, points[0].y);
        }

        // Create extrude settings with bevels
        const extrudeSettings = {
            depth: 0.05, // Extrusion depth
            bevelEnabled: false,
            bevelThickness: 0.1, // Bevel thickness
            bevelSize: 0.1, // Bevel size
            bevelOffset: 0,
            bevelSegments: 3, // Number of bevel segments for smoothness
        };

        // Create the extruded geometry
        const geometry = new ExtrudeGeometry(shape, extrudeSettings);

        // Create material with some transparency
        const colorCode: E_colorCode = condition.colorCode;

        const material = new MeshPhongMaterial({
            //color: 0xff0000, // Red color
            color: getColorFromCode(colorCode, "0x"),
            transparent: true,
            opacity: 0.7,
            side: 1,
            wireframe: false,
        });

        // Create mesh and position it
        const mesh = new Mesh(geometry, material);
        mesh.position.copy(centerPosition);

        return mesh;
    } catch (error) {
        console.error("Error creating condition shape:", error);
        return null;
    }
}

function getRelevantConditionsForTooth(
    conditions: T_condition[],
    selectedConditionId: string | null
) {
    const teethConditions = conditions.filter((x) => !x.parentOverlayName);
    const selectedToothId =
        selectedConditionId ??
        (teethConditions.length > 0 ? teethConditions[0].id : "");
    const relevantConditionsForTooth = conditions.filter(
        (x) => x.parentOverlayName === selectedToothId
    );
    return relevantConditionsForTooth;
}
