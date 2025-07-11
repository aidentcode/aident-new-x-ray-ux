// RVG Mapping

import { E_colorCode, E_conditionType, E_rvgClassId } from "../enums";
import { T_xrayClassData } from "../types/types";

/* 0 'Abscess', 
1 'Attrition', 
2 'Bone loss', 
3 'Calcification', 
4 'Calculus', 
5 'Caries', 
6 'Crown', 
7 'Cyst', 
8 'Filling', 
9 'Fracture line', 
10 'Furcation', 
11 'Impacted', 
12 'Implant', 
13 'Nerve', 
14 'Pulp', 
15 'Root canal treated', 
16 'Root piece', 
17 'Sinus', 
18 'Tooth', 
19 'Unerupted',
20  */

export const classDataRVG: Record<string, T_xrayClassData> = {
    [E_rvgClassId.unknown]: {
        classId: E_rvgClassId.unknown,
        label: "Unknown",
        colorCode: E_colorCode.gray,
        conditionType: E_conditionType.none,
    },
    [E_rvgClassId.abscess]: {
        classId: E_rvgClassId.abscess,
        label: "Abscess",
        colorCode: E_colorCode.red,
        description:
            "A tooth abscess is a pocket of pus that's caused by a bacterial infection. A periapical tooth abscess usually occurs as a result of an untreated dental cavity or secondary infection.",
        treatmentVideos: [
            {
                id: "SGw0DiBv2pk",
                type: "youtube",
                link: "https://youtu.be/SGw0DiBv2pk",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.attrition]: {
        classId: E_rvgClassId.attrition,
        label: "Attrition",
        colorCode: E_colorCode.pink,
        description:
            "Tooth attrition happens when two dental surfaces rub against each other and create friction strong enough to destroy the enamel coating.",
        treatmentVideos: [
            {
                id: "eFWwJEd8KMQ",
                type: "youtube",
                link: "https://youtu.be/eFWwJEd8KMQ",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.boneLoss]: {
        classId: E_rvgClassId.boneLoss,
        label: "Bone loss",
        colorCode: E_colorCode.purple,
        textColorCode: E_colorCode.black,
        description:
            "It happens when the gums and bone surrounding the teeth starts to shrink. Tooth mobility, receding gums,mouth sores, swollen or bleeding gums are the conditions observed with bone loss.",
        treatmentVideos: [
            {
                id: "3SQfECJ-HDw",
                type: "youtube",
                link: "https://youtu.be/3SQfECJ-HDw",
            },
        ],
        showArea: true,
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.calcification]: {
        classId: E_rvgClassId.calcification,
        label: "Calcification",
        colorCode: E_colorCode.lightBlue,
        textColorCode: E_colorCode.black,
        description: "Calcification",
        treatmentVideos: [
            {
                id: "_ZPW2P7qVAY",
                type: "youtube",
                link: "https://youtu.be/_ZPW2P7qVAY",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.calculus]: {
        classId: E_rvgClassId.calculus,
        label: "Calculus",
        colorCode: E_colorCode.darkGreen,
        description:
            "When plaque collects on teeth it hardens into calculus,on your teeth which can lead to serious gum disease, bad breath and bleeding gums.",
        treatmentVideos: [
            {
                id: "_ZPW2P7qVAY",
                type: "youtube",
                link: "https://youtu.be/_ZPW2P7qVAY",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.caries]: {
        classId: E_rvgClassId.caries,
        label: "Caries",
        colorCode: E_colorCode.blue,
        description:
            "Tooth caries is a common dental condition which can directly lead to pain,gum infection and tooth loss and severe decay can affect your nutrition intake as well.",
        treatmentVideos: [
            {
                id: "_oIlv59bTL4",
                type: "youtube",
                link: "https://youtu.be/_oIlv59bTL4",
            },
        ],
        showArea: true,
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.crown]: {
        classId: E_rvgClassId.crown,
        label: "Crown",
        colorCode: E_colorCode.gold,
        description:
            "A crown is basically a cap for a damaged tooth. It protects your teeth and maintains the strength of the damaged teeth.",
        treatmentVideos: [
            {
                id: "m4fo7WhRdhY",
                type: "youtube",
                link: "https://youtu.be/m4fo7WhRdhY",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.cyst]: {
        classId: E_rvgClassId.cyst,
        label: "Cyst",
        colorCode: E_colorCode.green,
        description:
            "A cyst is a sac like pocket of membranous tissue that contains fluid,air,or other substances.",
        treatmentVideos: [
            {
                id: "Jx_Ux0Q5n3w",
                type: "youtube",
                link: "https://youtu.be/Jx_Ux0Q5n3w",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.filling]: {
        classId: E_rvgClassId.filling,
        label: "Filling",
        colorCode: E_colorCode.lightGreen,
        textColorCode: E_colorCode.black,
        description:
            "A filling is used to treat a small hole in a tooth.To repair a cavity,a dentist removes the decayed tooth tissue and then fills the space with a filling material.",
        treatmentVideos: [
            {
                id: "HffVUqfOCsU",
                type: "youtube",
                link: "https://youtu.be/HffVUqfOCsU",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.fractureLine]: {
        classId: E_rvgClassId.fractureLine,
        label: "Fracture line",
        colorCode: E_colorCode.brown,
        description:
            "While chewing on hard foods,a tooth can fracture or crack. It is commonly seen in people who grind their teeth at night,play contact sports,or it can occur spontaneously in older adults.",
        treatmentVideos: [
            {
                id: "CvqOHCHMbCU",
                type: "youtube",
                link: "https://youtu.be/CvqOHCHMbCU",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.furcation]: {
        classId: E_rvgClassId.furcation,
        label: "Furcation",
        colorCode: E_colorCode.teal,
        textColorCode: E_colorCode.black,
        description:
            "Bone loss that is specific to branching of a tooth's roots is known as a furcation defect.This leads to periodontal diseases.",
        treatmentVideos: [
            {
                id: "uiDzZZoWkOI",
                type: "youtube",
                link: "https://youtu.be/uiDzZZoWkOI",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.impacted]: {
        classId: E_rvgClassId.impacted,
        label: "Impacted",
        colorCode: E_colorCode.orange,
        textColorCode: E_colorCode.black,
        description:
            "Impacted teeth are mostly in relation to wisdom teeth. Impacted wisdom teeth can result in pain,damage to other teeth, cyst, decay, etc",
        treatmentVideos: [
            {
                id: "AqVBtKEOSOU",
                type: "youtube",
                link: "https://youtu.be/AqVBtKEOSOU",
            },
        ],
        conditionType: E_conditionType.pathological,
    },
    [E_rvgClassId.implant]: {
        classId: E_rvgClassId.implant,
        label: "Implant",
        colorCode: E_colorCode.yellow,
        textColorCode: E_colorCode.black,
        description:
            "Dental implant is a procedure that replaces tooth roots with metal,screwlike posts and replaces damaged or missing teeth with artificial teeth that look and function much like real one.",
        treatmentVideos: [
            {
                id: "gMycqoQrlBs",
                type: "youtube",
                link: "https://youtu.be/gMycqoQrlBs",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.nerve]: {
        classId: E_rvgClassId.nerve,
        label: "Nerve",
        colorCode: E_colorCode.lightBrown,
        textColorCode: E_colorCode.black,
        description:
            "Inferior alveolar nerve is a mixed sensory and motor branch of the pterygomandibular space of the oral cavity.",
        treatmentVideos: [
            {
                id: "uQIr0EWl-m4",
                type: "youtube",
                link: "https://youtu.be/uQIr0EWl-m4",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.pulp]: {
        classId: E_rvgClassId.pulp,
        label: "Pulp",
        colorCode: E_colorCode.peach,
        textColorCode: E_colorCode.black,
        description: "Soft, living tissue located at the center of each tooth",
        treatmentVideos: [
            {
                id: "AATnG9BdIMg",
                type: "youtube",
                link: "https://youtu.be/AATnG9BdIMg",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.rootCanal]: {
        classId: E_rvgClassId.rootCanal,
        label: "Root canal treatment",
        colorCode: E_colorCode.lemon,
        textColorCode: E_colorCode.black,
        description:
            "It is done to treat the infected pulp to eliminate the infection and protect the tooth from future microbial invasion.",
        treatmentVideos: [
            {
                id: "AATnG9BdIMg",
                type: "youtube",
                link: "https://youtu.be/AATnG9BdIMg",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.rootPiece]: {
        classId: E_rvgClassId.rootPiece,
        label: "Root piece",
        colorCode: E_colorCode.maroon,
        description:
            "It is the unseen portion that supports and fastens the tooth in the jaw bone. Some can be treated or some require removal.",
        treatmentVideos: [
            {
                id: "eVHPsaaOsnU",
                type: "youtube",
                link: "https://youtu.be/eVHPsaaOsnU",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.sinus]: {
        classId: E_rvgClassId.sinus,
        label: "Sinus",
        colorCode: E_colorCode.darkGreen,
        description:
            "A cavity within a bone or other tissue, especially one in the bones of the face connecting the nasal cavity",
        conditionType: E_conditionType["pathological"],
    },
    [E_rvgClassId.tooth]: {
        classId: E_rvgClassId.tooth,
        label: "Tooth",
        colorCode: E_colorCode.white,
        textColorCode: E_colorCode.black,
        description: "Tooth detected in the uploaded X-ray by AiDent AI",
        conditionType: E_conditionType["non-pathological"],
    },
    [E_rvgClassId.uneruptedTooth]: {
        classId: E_rvgClassId.uneruptedTooth,
        label: "Unerupted tooth",
        colorCode: E_colorCode.magenta,
        description: "A tooth that has formed but not emerged into the mouth.",
        treatmentVideos: [
            {
                id: "lIHFdO0Okkw",
                type: "youtube",
                link: "https://youtu.be/lIHFdO0Okkw",
            },
        ],
        conditionType: E_conditionType["non-pathological"],
    },
    // [E_rvgClassId.new]: {
    //     classId: E_rvgClassId.new,
    //     label: "new",
    //     colorCode: E_colorCode.magenta,
    //     textColorCode: E_colorCode.black,
    //     description: "new condition",
    //     treatmentVideos: [
    //         {
    //             id: "lIHFdO0Okkw",
    //             type: "youtube",
    //             link: "https://youtu.be/lIHFdO0Okkw",
    //         },
    //     ],
    //     conditionType: E_conditionType["none"],
    // },
    // 6: {
    //     classId: "6",
    //     label: "Missing tooth",
    //     color: "#33c9dc", //cyan
    //     description:
    //         "It can be caused due to gum disease,tooth decay, injury,or a genetic condition. Replacement of the missing tooth is mast.",
    //     treatmentVideos: [
    //         {
    //             id: "JnfdjJw12BY",
    //             type: "youtube",
    //             link: "https://youtu.be/JnfdjJw12BY",
    //         },
    //     ],
    // },
    // Add more class IDs and their labels as needed
};
