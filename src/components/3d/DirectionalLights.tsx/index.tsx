import { useHelper } from "@react-three/drei";
import { MutableRefObject, Ref, useRef } from "react";
import { DirectionalLightHelper } from "three";
type LightProps = {
    showHelper?: boolean;
};
function DirectionalLights({ showHelper }: LightProps) {
    const ambientLightIntensity = 0.5;
    const backLightRef: Ref<THREE.DirectionalLight | undefined> =
        useRef(undefined);
    const keyLightRef: Ref<THREE.DirectionalLight | undefined> =
        useRef(undefined);
    const fillLightRef: Ref<THREE.DirectionalLight | undefined> =
        useRef(undefined);

    useHelper(
        backLightRef as MutableRefObject<THREE.Object3D>,
        DirectionalLightHelper
    );
    useHelper(
        keyLightRef as MutableRefObject<THREE.Object3D>,
        DirectionalLightHelper
    );
    useHelper(
        fillLightRef as MutableRefObject<THREE.Object3D>,
        DirectionalLightHelper
    );

    return (
        <group>
            <ambientLight intensity={1.0} />
            <directionalLight
                ref={
                    showHelper
                        ? (keyLightRef as Ref<THREE.DirectionalLight>)
                        : undefined
                }
                color="white"
                position={[15, 15, -15]}
                intensity={1.0}
                //castShadow
            />
            <directionalLight
                ref={
                    showHelper
                        ? (fillLightRef as Ref<THREE.DirectionalLight>)
                        : undefined
                }
                color="white"
                position={[-15, 15, -15]}
                intensity={1.5}
                // castShadow
            />
            <directionalLight
                ref={
                    showHelper
                        ? (backLightRef as Ref<THREE.DirectionalLight>)
                        : undefined
                }
                color="white"
                position={[-15, 15, 15]}
                intensity={0.8}
                castShadow
            />
            <directionalLight
                ref={
                    showHelper
                        ? (keyLightRef as Ref<THREE.DirectionalLight>)
                        : undefined
                }
                color="white"
                position={[15, 15, 15]}
                intensity={0.7}
                //castShadow
            />
        </group>
    );
}
export default DirectionalLights;
