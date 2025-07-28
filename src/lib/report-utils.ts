const demoJSON = [
    { label: "", ColorCode: "", AreaMeasurements: "", Stages: [], Grade: [] },
];

export const conditionsAvailable = [
    "Attrition",
    "Abscess",
    "Bone loss",
    "Calculus",
    "Caries",
    "Crown",
    // "Cyst",
    "Filling",
    "Fracture line",
    "Furcation",
    "Impacted",
    "Implant",
    "Root canal treatment",
    "Root piece",
    "Unerupted",
];

export type T_reportMappingGrade = {
    Grade?: string;
    Stage?: string;
    CriticalTimelineDistance?: string;
    Findings?: string;
    Interpretation?: string;
    "Treatment recommendation"?: string;
    "Additional information"?: string;
    "Video link"?: string;
    Distance?: string;
    Fractation?: string;
    range?: string;
    findings?: string;
};

export type T_reportMappingTreatment = {
    [key: string]: string;
};

export type T_reportMapping = {
    label?: string;
    ColorCode?: string;
    AreaMeasurements?: string;
    Grade?: T_reportMappingGrade[];
    measure?: string;
    findings?: string;
    treatment?: T_reportMappingTreatment | string;
    prognosis?: string;
    count?: number;
};

export const reportMapping: T_reportMapping[] = [
    {
        label: "Attrition",
        ColorCode: "#FF00FF",
        AreaMeasurements: "mm²",
        Grade: [
            {
                Interpretation:
                    "Findings indicate tooth wear with dentin involvement",
                "Treatment recommendation":
                    "Depending on the severity Observation + night guard / Restorative treatment / Dental Crowns / Root Canal Treatment + Crown",
                "Additional information":
                    "Tooth attrition happens when two dental surfaces rub against each other and create friction strong enough to destroy the enamel coating and reach a deeper part of the tooth.",
                "Video link":
                    "https://youtu.be/XjVTfy4PIsw?si=xdfzsJQnUYDGMKRk",
            },
        ],
    },
    {
        label: "Abscess",
        ColorCode: "#FF0000",
        AreaMeasurements: "mm²",
        Grade: [
            {
                Distance: "0 mm - 3 mm",
                Interpretation:
                    "Analysis indicates an infection at the root tip of the tooth.",
                Fractation: "RCT",
                "Treatment recommendation": "Root Canal Treatment",
                "Additional information":
                    "A tooth abscess is a pocket of pus that's caused by a bacterial infection. A periapical tooth abscess usually occurs as a result of an untreated dental cavity or re- infection, severe tooth wear or trauma",
                "Video link": "https://youtu.be/FERzAH_-3IA",
            },
            {
                Distance: "3 mm to 8 mm",
                Findings:
                    "Analysis suggests a serious infection at the tooth's root tip.",
                Interpretation:
                    "Analysis suggests a progressing infection at the tooth's root 2 tip",
                "Treatment recommendation": "Root Canal Treatment + Metapex",
                "Additional information":
                    "A tooth abscess is a pocket of pus that's caused by a bacterial infection. A periapical tooth abscess usually occurs as a result of an untreated dental cavity or re- infection, severe tooth wear or trauma",
                "Video link": "https://youtu.be/FERzAH_-3IA",
            },
            {
                Distance: "> 8 mm",
                Findings:
                    "Analysis indicates a severe spreading requiring urgent treatment to prevent further complications.",
                Interpretation:
                    "Analysis indicates a spreading infection requiring further treatment",
                "Treatment recommendation":
                    "Surgery - Surgical removal of an infected portion from the root tip area.",
                "Additional information":
                    "A tooth abscess is a pocket of pus that's caused by a bacterial infection. A periapical tooth abscess usually occurs as a result of an untreated dental cavity or re- infection, severe tooth wear or trauma",
                "Video link":
                    "https://youtu.be/NAc3k3qBm6I?si=9id9-jB19HmYXjiA",
            },
        ],
    },
    {
        label: "Bone loss",
        ColorCode: "#ff00ff",
        AreaMeasurements: "mm²",
        Grade: [
            {
                Stage: "Stage I",
                CriticalTimelineDistance: "15% radiographic bone loss",
                Findings:
                    "Indicates Stage I Periodontitis, a chronic inflammatory disease affecting tooth-supporting tissues.",
                Interpretation:
                    "Indicates Stage 1 Periodontitis, a chronic inflammatory disease affecting tooth-supporting tissues.",
                "Treatment recommendation": "Scaling",
                "Additional information":
                    "It happens when the gums and bone surrounding the teeth starts to shrink. Tooth mobility, receding gums,mouth sores, swollen or bleeding gums are the conditions observed with bone loss.",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
            {
                Stage: "Stage II",
                CriticalTimelineDistance:
                    "Coronal 1/3rd (15-33% radiographic bone loss )",
                Findings:
                    "Indicates Stage II Periodontitis, characterized by moderate destruction of supporting bone structure, signifying disease advancement.",
                Interpretation:
                    "Indicates Stage II Periodontitis, characterized by moderate destruction of supporting bone structure, signifying disease advancement.",
                "Treatment recommendation": "Scaling + curettage",
                "Additional information":
                    "It happens when the gums and bone surrounding the teeth starts to shrink. Tooth mobility, receding gums,mouth sores, swollen or bleeding gums are the conditions observed with bone loss.",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
            {
                Stage: "Stage III",
                CriticalTimelineDistance:
                    "Radiographic bone loss reaching Mid 1/3rd of the root or beyond",
                Interpretation:
                    "At this stage III, there's severe damage to the bone supporting the teeth, which can cause teeth to become loose and fall out.",
                Findings:
                    "Scaling: Immediate scaling to remove plaque and calculus from teeth and below the gumline, reducing bacteria and inflammation. Gum surgery: may be needed to treat deeper infections and improve oral hygiene. Monitoring: Keep a close eye on gum health with regular check-ups to track treatment progress and overall oral health.",
                "Treatment recommendation":
                    "Scaling + curettage + periodontal therapy",
                "Additional information":
                    "It happens when the gums and bone surrounding the teeth starts to shrink. Tooth mobility, receding gums,mouth sores, swollen or bleeding gums are the conditions observed with bone loss",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
            {
                Stage: "Stage IV",
                CriticalTimelineDistance:
                    "Radiographic bone loss reaching Mid 1/3rd of the root or beyond",
                Interpretation:
                    "Indicates advanced Stage IV Periodontitis, with severe damage to the bone supporting the teeth.",
                Findings:
                    "Scaling: Immediate scaling to remove plaque and calculus from teeth and below the gumline, reducing bacteria and inflammation. Gum surgery: may be needed to treat deeper infections and improve oral hygiene. Extraction (if needed): Pull out severely affected teeth right away to stop infection, pain, and prevent more gum disease. Replacement (if needed): Think about getting a dental implant, bridge, or partial denture to restore function and appearance after pulling out a tooth/teeth. Monitoring: Keep a close eye on gum health with regular check-ups to track treatment progress and overall oral health.",
                "Treatment recommendation":
                    "Scaling + curettage + periodontal therapy",
                "Additional information":
                    "It happens when the gums and bone surrounding the teeth starts to shrink. Tooth mobility, receding gums,mouth sores, swollen or bleeding gums are the conditions observed with bone loss.",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
        ],
    },
    {
        label: "Calculus",
        ColorCode: "#00ffff",
        AreaMeasurements: "NA",
        Grade: [
            {
                Stage: "Indicates poor oral hygiene",
                CriticalTimelineDistance: "N/A",
                Findings:
                    "Scaling: Immediate scaling to remove plaque and calculus from teeth and below the gumline, reducing bacteria and inflammation. Monitoring: Keep a close eye on gum health with regular check-ups to track treatment progress and overall oral health.",
                Interpretation: "Indicates poor oral hygiene",
                "Treatment recommendation":
                    "Scaling / Root planing and periodontal therapy",
                "Additional information":
                    "When plaque collects on teeth it hardens into calculus,on your teeth which can lead to serious gum disease, bad breath and bleeding gums.",
                "Video link": "https://youtube.com/shorts/-TUV4yy0z_Y",
            },
        ],
    },
    {
        label: "Caries",
        ColorCode: "#ff0000",
        AreaMeasurements: "mm²",
        Grade: [
            {
                Stage: "Stage 1",
                CriticalTimelineDistance:
                    "Critical Distance = _______ mm Initial to Moderate: >3mm",
                Findings:
                    "Initial - Stage 1 caries indicate an initial demineralization of the tooth structure, typically confined to enamel or superficial dentin.",
                Interpretation:
                    "Indicating initial demineralization which is progressing to deeper dentin",
                "Treatment recommendation":
                    "Restorative Treatment with filling material",
                "Additional information":
                    "Tooth caries is a common dental condition which can directly lead to pain,gum infection and tooth loss and severe decay can affect your nutrition intake as well.",
                "Video link":
                    "https://youtu.be/DJY3JU_OEQM?si=NYnMD5_SNhhzWWYe",
            },
            {
                Stage: "Stage 2",
                CriticalTimelineDistance:
                    "Distance from the caries base to the pulp Critical Distance = _______ mm Advanced (0.5 mm to 2.9 mm from the pulp)",
                Findings:
                    "Moderate - Stage 2 caries involve deeper penetration into the dentin with the possibility of cavity formation.",
                Interpretation:
                    "Caries indicate advanced decay with significant dentin involvement and risk of pulp exposure.",
                "Treatment recommendation":
                    "Restorative Treatment / Pulp capping /Root Canal treatment",
                "Additional information":
                    "Tooth caries is a common dental condition which can directly lead to pain,gum infection and tooth loss and severe decay can affect your nutrition intake as well.",
                "Video link":
                    "https://youtu.be/P8FmnS00mvM?si=7ZGDr1CSKp1uScYq",
            },
            {
                Stage: "Stage 3",
                CriticalTimelineDistance:
                    "Distance from the caries base to the pulp No distance (=/< 0.5mm from pulp)",
                Findings:
                    "Advanced - Stage 3 caries indicate advanced decay with significant dentin involvement and risk of pulp exposure.",
                Interpretation: "Caries approaching  involving the pulp",
                "Treatment recommendation": "Root canal treatment",
                "Additional information":
                    "Tooth caries is a common dental condition which can directly lead to pain,gum infection and tooth loss and severe decay can affect your nutrition intake as well.",
                "Video link": "https://youtu.be/FERzAH_-3IA",
            },
        ],
    },
    {
        label: "Crown",
        measure: "NA",
        Grade: [
            {
                Interpretation: "Previous crown",
                "Treatment recommendation":
                    "Full metal crown / Porcelain fused to metal Crown /All ceramic crown",
                "Additional information":
                    "A crown is basically a cap for a damaged tooth. It protects your teeth and maintains the strength of the damaged teeth.",
                "Video link": "https://youtu.be/9gtxiUpnTqc",
            },
        ],
        findings: "NA",
        treatment: "Replacement if needed",
    },
    // {
    //   label: "Cyst",
    //   measure: "mm²",
    //   Grade: [
    //     {
    //       Interpretation: "Analysis indicates a Cyst",
    //       "Treatment recommendation":
    //         "Surgical enucleation / Marsupialisation - Total surgical removal of the cyst cavity or creating a small opening in the cyst and then stitching the edges of the cyst lining to the surrounding tissue creating a pouch",
    //     },
    //   ],
    //   findings: "Analysis indicates a Cyst",
    //   treatment: {
    //     surgical_enucleation_or_marsupialisation:
    //       "Surgical enucleation / Marsupialisation - Total surgical removal of the cyst cavity or creating a small opening in the cyst and then sutures the edges of the cyst lining to the surrounding tissue creating a pouch",
    //   },
    //   prognosis:
    //     "A cyst is a sac-like pocket of membranous tissue that contains fluid, air, or other substances.",
    // },
    {
        label: "Filling",
        measure: "NA",
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
        label: "Fracture line",
        measure: "NA",
        findings: "NA",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Enameloplasty / Restorative Treatment / Indirect pulp capping / Direct pulp capping / Root canal treatment / Splinting / followed by crown / Extraction",
                "Additional information":
                    "While chewing on hard foods or trauma a tooth can fracture or crack. It is commonly seen in people who grind their teeth at night,play contact sports, it can occur spontaneously in older adults.",
                "Video link":
                    "https://youtu.be/IpVoIuKTg2w?si=0MwRH89ujTBm4RSR",
            },
        ],
        treatment: {
            enameloplasty: "Enameloplasty",
            restorative_treatment:
                "Restorative Treatment - repairing the fracture line with a filling material",
            indirect_pulp_capping:
                "Indirect pulp capping - a protective material is placed over a small area of exposed or nearly exposed dental pulp to help healing and prevent further damage.",
            direct_pulp_capping:
                "Direct pulp capping - placed directly over an exposed dental pulp to promote healing and protect the pulp from further damage or infection.",
            rct: "RCT (Root Canal Treatment): RCT involves removing infected or damaged tissue from inside a tooth and sealing it to save the tooth from extraction.",
            splinting:
                "Splinting: Splinting involves stabilizing and supporting injured or loose teeth by bonding them together with a custom-made dental splint to facilitate healing and prevent further damage.",
        },
        prognosis:
            "While chewing on hard foods, a tooth can fracture or crack. It is commonly seen in people who grind their teeth at night, play contact sports, or it can occur spontaneously in older adults.",
    },
    {
        label: "Furcation",
        measure: "mm²",
        Grade: [
            {
                Grade: "A",
                range: "1-3mm",
                Interpretation:
                    "Findings indicate moderate to severe gap between the roots of the tooth indicating significant loss of bone support around the roots",
                "Treatment recommendation":
                    "Scaling and root planing/ Deep cleaning",
                findings:
                    "Findings indicate moderate to severe gap between the roots of the tooth indicating significant loss of bone support around the roots",
                "Additional information":
                    "Bone loss that is specific to branching of a tooth's roots is known as a furcation defect.This leads to periodontal diseases.",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
            {
                Grade: "B",
                range: "4-6mm",
                "Treatment recommendation":
                    "Scaling and root planing / Deep curettage / Periodontal therapy",
                Interpretation:
                    "Findings indicate moderate to severe gap between the roots of the tooth indicating significant loss of bone support around the roots",
                "Additional information":
                    "Bone loss that is specific to branching of a tooth's roots is known as a furcation defect.This leads to periodontal diseases.",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
            {
                Grade: "C",
                range: ">7mm",
                "Treatment recommendation":
                    "Scaling and root planing / Root resection / Extraction",
                Interpretation:
                    "Findings indicate moderate to severe gap between the roots of the tooth indicating significant loss of bone support around the roots",
                "Additional information":
                    "Bone loss that is specific to branching of a tooth's roots is known as a furcation defect.This leads to periodontal diseases.",
                "Video link": "https://youtu.be/x2uN41a3Z1U",
            },
        ],
    },
    {
        label: "Impacted",
        measure: "NA",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Surgical disimpaction - Planned surgical removal of impacted tooth.",
                "Additional information":
                    "Impacted teeth are mostly in relation to wisdom teeth. Impacted wisdom teeth can result in pain,damage to other teeth, cyst, decay, etc",
                "Video link": "https://youtu.be/oexyy4xCbrE",
            },
        ],
    },
    {
        label: "Implant",
        measure: "NA",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Single implant/ Implant supported fixed or removable prosthesis",
                "Additional information":
                    "Dental implant is a procedure that replaces tooth roots with metal screws like posts and replaces damaged or missing teeth with artificial teeth that look and function much like real one.",
                "Video link":
                    "https://youtu.be/0De-X7ATnwo?si=wI8GSWn5DKPE3Esz",
            },
        ],
    },
    {
        label: "Root canal treatment",
        measure: "NA",
        Grade: [
            {
                Interpretation: "Previous root canal treatment",
                "Treatment recommendation": "NA",
                "Additional information":
                    "It is done to treat the infected pulp to eliminate the infection and protect the tooth from future microbial invasion.",
                "Video link":
                    "https://youtu.be/P8FmnS00mvM?si=Ejmq8WCvdab-YZk1",
            },
        ],
    },
    {
        label: "Root piece",
        measure: "NA",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Extraction/ Post and core + Root canal treatment/ Fixed or removable prosthesis ",
                "Additional information":
                    "It is the unseen portion that supports and fastens the tooth in the jaw bone. Some can be treated or some require removal.",
                "Video link":
                    "https://youtu.be/ba9aCADvP98?si=PMGzdFXiSne26rYQ",
            },
        ],
    },
    {
        label: "Unerupted",
        measure: "NA",
        Grade: [
            {
                Interpretation: "NA",
                "Treatment recommendation":
                    "Close monitoring and regular follow up with the dentist",
                "Additional information":
                    "A tooth that has formed but not emerged into the mouth.",
                "Video link": "https://youtu.be/pWvb3pcSsGg",
            },
        ],
    },
];
