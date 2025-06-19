import { Quaternion, Vector3 } from "three";
import { ThreeEvent, useThree } from "@react-three/fiber";
import {
    ArcballControls,
    GizmoHelper,
    GizmoViewcube,
    GizmoViewport,
} from "@react-three/drei";
import { Ref } from "react";

type GizmoProps = {
    controlsRef: Ref<typeof ArcballControls | undefined>;
    gizmoType: "cube" | "xyz";
};
function GizmoArcball({ gizmoType }: GizmoProps) {
    const { camera, controls } = useThree();

    const tweenCamera = (faceNormal: Vector3) => {
        // const point = new Spherical().setFromVector3(
        //     new Vector3(faceNormal.x, faceNormal.y, faceNormal.z)
        // );
        // console.log("controls=", controls);
        // console.log("point=", point);
        // console.log("faceNormal=", faceNormal);
        if (controls) {
            const c = controls as any;
            c.reset();

            const direction = new Vector3()
                .subVectors(faceNormal, c.target)
                .normalize();

            // Calculate the new position of the camera
            const distance = camera.position.distanceTo(c.target);
            const newPosition = new Vector3().addVectors(
                c.target,
                direction.multiplyScalar(distance)
            );
            camera.position.copy(newPosition);

            camera.up.copy(new Vector3(0, 1, 0));
            const quaternion = new Quaternion();
            quaternion.setFromAxisAngle(faceNormal, 0);
            camera.up.applyQuaternion(quaternion);

            camera.lookAt(c.target);
            camera.updateMatrixWorld();
            c.update();
        }
    };
    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (
            e.eventObject.position.x === 0 &&
            e.eventObject.position.y === 0 &&
            e.eventObject.position.z === 0
        ) {
            if (e.face) tweenCamera(e.face.normal);
        } else {
            tweenCamera(e.eventObject.position);
        }
        return null;
    };

    return (
        <GizmoHelper margin={[80, 80]} alignment={"bottom-right"}>
            {gizmoType === "cube" && (
                <GizmoViewcube
                    onClick={handleClick}
                    color="#ffffff"
                    opacity={1}
                    textColor="#000000"
                    strokeColor="#000000"
                    hoverColor="#ad73ff"
                />
            )}
            {gizmoType === "xyz" && <GizmoViewport onClick={handleClick} />}
            {/* <GizmoViewport onClick={handleClick} /> */}
        </GizmoHelper>
    );
}
export default GizmoArcball;
