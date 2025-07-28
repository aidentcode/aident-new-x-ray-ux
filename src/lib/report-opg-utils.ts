import { T_reportMapping } from "./report-rvg-utils";

const demoJSON = [
    { label: "", ColorCode: "", AreaMeasurements: "", Stages: [], Grade: [] },
];

export const conditionsAvailableOpg = [
    "Filling",
    // "Crowns",
    "Crown",
    "Sinus",
    "Nerve",
    "Bone loss",
    // "Root canal treated",
    "Root Canal Treatment",
    "Caries",
    "Unerupted",
    "Impacted",
    // "Root pieces",
    "Root piece",
    "Implant",
    "Calculus",
    "Attrition",
    "Abscess",
    "Furcation",
    "Braces",
    "Fracture line",
    "Furcation",
];

export const opgReportMapping: T_reportMapping[] = [
    {
        label: "Filling",
        ColorCode: "#95C25B",
        Grade: [
            {
                Interpretation: "Old filling detected",
                "Treatment recommendation": "NA",
                "Additional information":
                    "A filling is used to treat a small hole in a tooth.To repair a cavity,a dentist removes the decayed tooth tissue and then fills the space with a filling material.",
                "Video link": "https://youtu.be/DJY3JU_OEQM",
            },
        ],
    },
    {
        label: "Crown",
        // label: "Crowns",
        ColorCode: "#FCEC63",
        AreaMeasurements: "mm²",
        Grade: [
            {
                Interpretation: "Previous crown.",
                "Treatment recommendation":
                    "Full metal crown / Porcelain fused to metal Crown / All ceramic crown",
                "Additional information":
                    "A crown is basically a cap for a damaged tooth. It protects your teeth and maintains the strength of the damaged teeth.",
                "Video link": "https://youtu.be/9gtxiUpnTqc",
            },
        ],
    },
    {
        label: "Sinus",
        ColorCode: "#477840",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation": "NA",
                "Additional information":
                    "A cavity within a bone or other tissue, especially one in the bones of the face connecting the nasal cavity.",
                "Video link": "NA",
            },
        ],
    },
    {
        label: "Nerve",
        ColorCode: "#EC6337",
        Grade: [
            {
                Findings:
                    "Scaling: Immediate scaling to remove plaque and calculus from teeth and below the gumline, reducing bacteria and inflammation. Monitoring: Keep a close eye on gum health with regular check-ups to track treatment progress and overall oral health.",
                Interpretation: "NA",
                "Treatment recommendation":
                    "Pain medications/ surgery  to relieve pressure / Root canals, nerve repair / Supportive care, or adjusting dental work.",
                "Additional information":
                    "Dental nerves that send pain and touch signals from the teeth and other parts of the oral cavity to the brian.",
                "Video link": "NA",
            },
        ],
    },
    {
        label: "Bone loss",
        ColorCode: "#8E37A8",
        Grade: [
            {
                Interpretation:
                    "Indicates advanced Stage IV Periodontitis, with severe damage to the bone supporting the teeth.",
                "Treatment recommendation":
                    "Scaling + curettage + periodontal therapy",
                "Additional information":
                    "It happens when the gums and bone surrounding the teeth starts to shrink. Tooth mobility, receding gums,mouth sores, swollen or bleeding gums are the conditions observed with bone loss.",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
        ],
    },
    {
        // label: "Root canal treated",
        label: "Root Canal Treatment",
        ColorCode: "#D1DD61",
        Grade: [
            {
                Interpretation: "Previous root canal treatment",
                "Treatment recommendation":
                    "No treatment / Re-Root canal treatment",
                "Additional information":
                    "It is done to treat the infected pulp to eliminate the infection and protect the tooth from future microbial invasion.",
                "Video link":
                    "https://youtu.be/FERzAH_-3IA?si=xALEFtWVgkR6vwMB",
            },
        ],
    },
    {
        label: "Caries",
        ColorCode: "#4D95EA",
        Grade: [
            {
                Interpretation:
                    "Caries indicate advanced decay with significant dentin involvement and risk of pulp exposure.",
                "Treatment recommendation":
                    "Restorative Treatment with filling material",
                "Additional information":
                    "Tooth caries is a common dental condition which can directly lead to pain,gum infection and tooth loss and severe decay can affect your nutrition intake as well.",
                "Video link": "https://youtu.be/DJY3JU_OEQM",
            },
        ],
    },
    {
        label: "Unerupted",
        ColorCode: "#000000",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Close monitoring and regular follow up with the dentist",
                "Additional information":
                    "A tooth that has formed but not emerged into the mouth.",
                "Video link":
                    "https://youtu.be/pWvb3pcSsGg?si=OpG12dU-hNajQAZw",
            },
        ],
    },
    {
        label: "Impacted",
        ColorCode: "#F3C53E",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Surgical disimpaction - Planned surgical removal of impacted tooth.",
                "Additional information":
                    "Impacted teeth are mostly in relation to wisdom teeth. Impacted wisdom teeth can result in pain,damage to other teeth, cyst, decay, etc.",
                "Video link": "https://youtu.be/oexyy4xCbrE",
            },
        ],
    },
    {
        // label: "Root pieces",
        label: "Root piece",
        // Root piece
        ColorCode: "#932643",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Extraction/ Post and core + Root canal treatment/ Fixed or removable prosthesis",
                "Additional information":
                    "It is the unseen portion that supports and fastens the tooth in the jaw bone. Some can be treated or some require removal.",
                "Video link":
                    "https://youtu.be/ba9aCADvP98?si=I8ArZshTFHlSjiaV",
            },
        ],
    },
    {
        label: "Implant",
        ColorCode: "#EF9D37",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Monitoring - Keep a close eye on implant health with regular check-ups to track treatment progress and overall oral health.",
                "Additional information":
                    "Dental implant is a procedure that replaces tooth roots with metal,screws like posts and replaces damaged or missing teeth with artificial teeth that look and function much like real one.",
                "Video link":
                    "https://youtu.be/0De-X7ATnwo?si=o_DL4j5PAYRmNUDe",
            },
        ],
    },
    {
        label: "Calculus",
        ColorCode: "#9900ff",
        Grade: [
            {
                Interpretation: "Indicates poor oral hygiene",
                "Treatment recommendation":
                    "Scaling / Root planing and periodontal therapy",
                "Additional information":
                    "When plaque collects on teeth it hardens into calculus,on your teeth which can lead to serious gum disease, bad breath and bleeding gums.",
                "Video link":
                    "https://youtube.com/shorts/-TUV4yy0z_Y?feature=share",
            },
        ],
    },
    {
        label: "Attrition",
        ColorCode: "#D73B6A",
        Grade: [
            {
                Interpretation:
                    "Findings indicate tooth wear with dentin involvement",
                "Treatment recommendation":
                    "Depending on the severity Observation + night guard / Restorative treatment / Dental Crowns / Root Canal Treatment + Crown",
                "Additional information":
                    "Tooth attrition happens when two dental surfaces rub against each other and create friction strong enough to destroy the enamel coating and reach a deeper part of the tooth.",
                "Video link": "https://youtu.be/XjVTfy4PIsw",
            },
        ],
    },
    {
        label: "Abscess",
        ColorCode: "#E35541",
        Grade: [
            {
                Interpretation:
                    "Analysis suggests a progressing infection at the tooth's root 2 tip",
                "Treatment recommendation":
                    "Root Canal Treatment + Metapex / Surgical removal of an infected portion from the root tip area.",
                "Additional information":
                    "A tooth abscess is a pocket of pus that's caused by a bacterial infection. A periapical tooth abscess usually occurs as a result of an untreated dental cavity or re- infection, severe tooth wear or trauma.",
                "Video link": "https://youtu.be/FERzAH_-3IA",
            },
        ],
    },
    {
        label: "Furcation",
        ColorCode: "#439587",
        Grade: [
            {
                Interpretation:
                    "Findings indicate moderate to severe gap between the roots of the tooth indicating significant loss of bone support around the roots.",
                "Treatment recommendation":
                    "Scaling and root planing / Root resection / Extraction.",
                "Additional information":
                    "Bone loss that is specific to branching of a tooth's roots is known as a furcation defect.This leads to periodontal diseases.",
                "Video link": "https://youtu.be/_zpj94DL5ZQ",
            },
        ],
    },
    {
        label: "Braces",
        ColorCode: "#5F3DAE",
        Grade: [
            {
                Interpretation:
                    "Findings indicate Orthodontic brackets on malaligned teeth.",
                "Treatment recommendation": "NA",
                "Additional information":
                    "Braces are orthodontic device that straighten crooked and misaligned teeth but also to realign.",
                "Video link": "https://youtu.be/WMbgZ8rnyQk",
            },
        ],
    },
    {
        label: "Fracture line",
        ColorCode: "#a61c00",
        Grade: [
            {
                Interpretation: "Analysis indicates bone jaw fracture.",
                "Treatment recommendation":
                    "Surgical intervention - closed/open reduction",
                "Additional information":
                    "A facial bone fracture is a break in one or more of the bones in your face, typically caused by a trauma or injury.",
                "Video link": "https://youtu.be/IpVoIuKTg2w",
            },
        ],
    },
    {
        label: "Cyst",
        ColorCode: "#68AD5C",
        Grade: [
            {
                Interpretation: "Analysis indicates a cyst.",
                "Treatment recommendation":
                    "Surgical enucleation / Marsupialisation",
                "Additional information":
                    "A cyst is a sac-like pocket of membranous tissue that contains fluid,air,or other substances.",
                "Video link": "https://youtu.be/8_cVfsBipLw",
            },
        ],
    },
];
