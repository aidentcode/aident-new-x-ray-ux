import { E_tooth3dId } from "../enums";
import { T_toothModelData } from "../types/types";

export const getTeethModelData = (toothId: E_tooth3dId): T_toothModelData => {
    const toothModelData: Record<E_tooth3dId, T_toothModelData> = {
        [E_tooth3dId["tooth-incisor-1"]]: {
            toothId: E_tooth3dId["tooth-incisor-1"],
            fileUrl:
                "/assets3d/gltf/Upper_Central_Incisor_gltf/Human Teeth Upper Central Incisor.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_Central_Incisor_gltf-2/Human Teeth Upper Central Incisor.gltf",
            label: "Central Incisor",
        },
        [E_tooth3dId["tooth-incisor-2"]]: {
            toothId: E_tooth3dId["tooth-incisor-2"],
            fileUrl:
                "/assets3d/gltf/Upper_Lateral_Incisor_gltf/Human Teeth Upper Lateral Incisor.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_Lateral_Incisor_gltf-2/Human Teeth Upper Lateral Incisor.gltf",
            label: "Lateral Incisor",
        },
        [E_tooth3dId["tooth-canine-1"]]: {
            toothId: E_tooth3dId["tooth-canine-1"],
            fileUrl:
                "/assets3d/gltf/Upper_Canine_gltf/Human Teeth Upper Canine.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_Canine_gltf-2/Human Teeth Upper Canine.gltf",
            label: "Upper Canine",
        },
        [E_tooth3dId["tooth-premolar-1"]]: {
            toothId: E_tooth3dId["tooth-premolar-1"],
            fileUrl:
                "/assets3d/gltf/Upper_First_Premolar_gltf/Human Teeth Upper First Premolar.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_First_Premolar_gltf-2/Human Teeth Upper First Premolar.gltf",
            label: "First Premolar",
        },
        [E_tooth3dId["tooth-premolar-2"]]: {
            toothId: E_tooth3dId["tooth-premolar-2"],
            fileUrl:
                "/assets3d/gltf/Upper_Second_Premolar_gltf/Human Teeth Upper Second Premolar.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_Second_Premolar_gltf-2/Human Teeth Upper Second Premolar.gltf",
            label: "Second Premolar",
        },
        [E_tooth3dId["tooth-molar-1"]]: {
            toothId: E_tooth3dId["tooth-molar-1"],
            fileUrl:
                "/assets3d/gltf/Upper_First_Molar_gltf/Human Teeth Upper First Molar.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_First_Molar_gltf-2/Human Teeth Upper First Molar.gltf",
            label: "First Molar",
        },
        [E_tooth3dId["tooth-molar-2"]]: {
            toothId: E_tooth3dId["tooth-molar-2"],
            fileUrl:
                "/assets3d/gltf/Upper_Second_Molar_gltf/Human Teeth Upper Second Molar.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_Second_Molar_gltf-2/Human Teeth Upper Second Molar.gltf",
            label: "Second Molar",
        },
        [E_tooth3dId["tooth-molar-3"]]: {
            toothId: E_tooth3dId["tooth-molar-3"],
            fileUrl:
                "/assets3d/gltf/Upper_Third_Molar_Wisdom_gltf/Human Teeth Upper Third Molar Wisdom.gltf",
            fileUrl2:
                "/assets3d/gltf/Upper_Third_Molar_Wisdom_gltf-2/Human Teeth Upper Third Molar Wisdom.gltf",
            label: "Third Molar",
        },
        [E_tooth3dId["select-tooth"]]: {
            toothId: E_tooth3dId["select-tooth"],
            fileUrl: "",
            fileUrl2: "",
            label: "Select Tooth",
        },
    };

    return toothModelData[toothId];
};
