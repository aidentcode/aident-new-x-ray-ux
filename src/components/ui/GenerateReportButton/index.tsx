import { useContext, useRef } from "react";
import CustomSvgIcon from "../CustomSvgIcon";
import styles from "./generateReportButton.module.scss";
import Draggable from "react-draggable";
import clsx from "clsx";
import { FormGroup, Stack } from "@mui/material";
import XrayContext, { T_xrayContext } from "@/contexts/xrayContext";
import CustomTooltip from "../CustomToolTip";
import { T_condition, T_shapeUpdateData } from "@/lib/types/types";
import { E_xrayType } from "@/lib/enums";
import { getPrintReportHtml, print2, print3, print5 } from "@/lib/print-utils";
import {
    conditionsAvailable,
    reportMapping,
    T_reportMapping,
} from "@/lib/report-utils";
import { getColorFromCodeCode } from "@/lib/data/colorData";
//import footer from "../../../../public/footer.svg";

export default function GenerateReportButton({
    updateData,
    disabled,
}: {
    updateData?: T_shapeUpdateData;
    disabled?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const xrayContext = useContext(XrayContext);
    const {
        smoothCurves,
        setSmoothCurves,
        imageSetup,
        conditions,
        setConditions,
        xrayType,
    } = xrayContext;

    const startReport = () => {
        if (!updateData) {
            return;
        }
        const { canvas } = updateData;
        canvas.toCanvasElement().toBlob(function (blob: Blob | null) {
            // Also print image
            const img = new Image();
            img.onload = function () {
                console.log("img onload=", img);
                if (xrayType === E_xrayType.rvg) {
                    printRVGImage(img, xrayContext);
                } else {
                    //printOpgImage(img);
                }
            };
            if (blob) {
                img.src = URL.createObjectURL(blob);
            }
        });
    };

    return (
        <Draggable
            nodeRef={containerRef as React.RefObject<HTMLElement>}
            handle=".custom-drag-handle"
            bounds="parent"
        >
            <div
                ref={containerRef}
                className={clsx([
                    styles.container,
                    disabled && styles.disabled,
                ])}
            >
                <div
                    className={clsx([
                        styles["drag-icon"],
                        "custom-drag-handle",
                    ])}
                >
                    <CustomSvgIcon iconId="drag" tooltipText="Drag to move" />
                </div>
                <div className={styles.verticalDivider}></div>

                <CustomTooltip
                    title={disabled ? "" : "Generate and download report"}
                    placement={"top"}
                >
                    <Stack
                        className={clsx([
                            styles.downloadButton,
                            disabled && styles.disabled,
                        ])}
                        onClick={startReport}
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                    >
                        <div
                            className={clsx([
                                styles.switchText,
                                !!smoothCurves && styles.disabledText,
                            ])}
                        >
                            Generate Report
                        </div>
                        <CustomSvgIcon
                            iconId="download"
                            tooltipText=""
                            className={styles.downloadIcon}
                        />
                    </Stack>
                </CustomTooltip>
            </div>
        </Draggable>
    );
}

function printRVGImage(image: HTMLImageElement, xrayContext: T_xrayContext) {
    const { conditions } = xrayContext;

    if (!conditions) return;

    const origin = window.location.origin;
    let html = getPrintReportHtml(origin);

    // Dynamic image HTML
    html += `<tr>
                <td align="left" valign="top" style="padding-bottom: 10px;">
                    <img width="900px" src="${image.src}" />
                </td>
            </tr>
            <tr>
                <td align="left" style="padding-bottom: 30px;">
                <table cellspacing="0" cellpadding="0" border="0">
            <tr>`;

    function uniqueByLabel(arr: T_condition[]) {
        const seen = new Map();
        const result = [];

        for (const item of arr) {
            // Check if the item has a label property and it's not already seen
            if (
                item.label &&
                !seen.has(item.label) &&
                conditionsAvailable.includes(item.label)
            ) {
                seen.set(item.label, true);
                result.push(item);
            }
        }
        return result;
    }
    let uniqueArray = uniqueByLabel(conditions);

    for (let i = 0; i < uniqueArray.length; i++) {
        html += `<td align="left" valign="middle">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td height="25" width="40" valign="middle"
                                style="height: 25px;width: 40px;background:${getColorFromCodeCode(
                                    uniqueArray[i]["colorCode"]
                                )};">&nbsp;
                            </td>
                            <td valign="middle"
                                style="color: #333333;font-size: 14px;font-weight: 500;font-family: 'Roboto', Arial, sans-serif;padding-left: 5px;">
                                ${uniqueArray[i]["label"]}
                            </td>
                        </tr>
                    </table>
                </td>`;
    }
    html += `</tr>
                </table>
                </td>
            </tr>`;
    // html += headerImage;
    html += print2({ email_id: "test@test.com" });
    html += print3;

    // const caries = findCaries();

    const addCaries = addCariesDistance(conditions);

    // Perform the merge
    let mergedArray = mergeArrays(addCaries, reportMapping);

    // add count key for the repeated conditions
    mergedArray = addCountForSameCondition(mergedArray);

    for (let i = 0; i < mergedArray.length; i++) {
        if (conditionsAvailable.includes(mergedArray[i]["label"])) {
            html += `
            <tr>
                <td valign="top" style="font-family: 'Roboto', Arial, sans-serif;padding: 8px 10px;font-size: 14px;font-weight: 400;">
                    <p style="font-weight: 600;font-size: 14px;color: #333333;padding-bottom: 15px !important;">
                    ${mergedArray[i]["label"]} 
                    ${mergedArray[i]["count"] ? mergedArray[i]["count"] : ""}
                    <span height="25" width="40px"  valign="middle"
                        style="height: 25px; display: inline-block; width: 50px;background:${getColorFromCodeCode(
                            mergedArray[i]["colorCode"]
                        )};">&nbsp;</span>
                </p>
               ${
                   mergedArray[i]["area"]
                       ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;display: -webkit-box;">
                    Area: 
                    <span style="border-bottom: 1px solid #000000;display: block;width: 40px;"> 
                    ${mergedArray[i]["area"]?.toFixed(2)}
                    </span>mm<sup style="font-size: 10px;">2</sup></p>`
                       : ``
               }
               ${
                   mergedArray[i]["criticalTimeline"] &&
                   mergedArray[i]["label"] != "Attrition"
                       ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    ${
                        mergedArray[i]["label"] === "Caries"
                            ? "Critical Distance :"
                            : !["Bone loss", "Abscess"].includes(
                                  mergedArray[i]["label"]
                              )
                            ? "Grade :"
                            : ""
                    } ${mergedArray[i]["criticalTimeline"]} ${
                             mergedArray[i]["label"] === "Caries"
                                 ? "mm" +
                                   " " +
                                   carriesCriticalDistance(
                                       mergedArray[i]["criticalTimeline"] || ""
                                   )
                                 : ""
                         }
                   </p>`
                       : ``
               }
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               ${
                   //for special edgecasesmergedArray[i]["label"] === "Caries" &&
                   mergedArray[i]["criticalTimeline"] == undefined
                       ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    Caries approaching
                    involving the pulp

                   </p>`
                       : mergedArray[i]["label"] === "Bone loss" &&
                         mergedArray[i]["criticalTimeline"] ===
                             "not able to find"
                       ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    NA
                   </p>`
                       : mergedArray[i]["Grade"]?.length === 1
                       ? mergedArray[i]["Grade"]
                             ?.map(
                                 (item) =>
                                     `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                                 ${item["Interpretation"]}
                                    </p>`
                             )
                             //  .filter(Boolean)
                             .join("")
                       : // handling special cases which have several stages
                       ["Bone loss", "Caries", "Furcation", "Abscess"].includes(
                             mergedArray[i]["label"]
                         )
                       ? mergedArray[i]["Grade"]
                             ?.map((item) => {
                                 // For Bone loss
                                 if (
                                     mergedArray[i]["label"] === "Bone loss" &&
                                     //  mergedArray[i]["criticalTimeline"].includes(item.Stage)
                                     mergedArray[i]["criticalTimeline"]?.match(
                                         /Stage [IVX]+/
                                     )?.[0] === item.Stage
                                 ) {
                                     return `
                   <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                   ${item.Interpretation}
                   </p>`;
                                 }

                                 // For Furcation
                                 if (mergedArray[i]["label"] === "Furcation") {
                                     const regex = /Grade\s+(\w+)/;
                                     // Use the regex to execute a search on the string
                                     const match =
                                         mergedArray[i][
                                             "criticalTimeline"
                                         ]?.match(regex);
                                     // Check if there was a match and output it
                                     if (item.Grade === match?.[1]) {
                                         return `
                   <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    ${item.Interpretation}
                   </p>`;
                                     }
                                 }

                                 if (
                                     mergedArray[i]["label"] === "Abscess" &&
                                     foundAbscess(
                                         mergedArray[i]["criticalTimeline"] ||
                                             ""
                                     ) === item.Distance
                                 ) {
                                     return `
                   <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                   ${item.Interpretation}
                   </p>`;
                                 }

                                 if (
                                     mergedArray[i]["label"] === "Caries" &&
                                     mergedArray[i]["criticalTimeline"] !==
                                         undefined &&
                                     foundCariesStage(
                                         Number(
                                             mergedArray[i]["criticalTimeline"]
                                         ) || 0
                                     ) === item.Stage
                                 ) {
                                     return `
                   <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                   ${item.Interpretation}
                   </p>`;
                                 }
                             })
                             .filter(Boolean)
                             .join("")
                       : null
               }

            </td>
             <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
              

              ${
                  //for special edgecases
                  mergedArray[i]["label"] === "Caries" &&
                  mergedArray[i]["criticalTimeline"] == undefined
                      ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                      Root Canal Treatment
                    </p>`
                      : mergedArray[i]["label"] === "Bone loss" &&
                        mergedArray[i]["criticalTimeline"] ===
                            "not able to find"
                      ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    NA
                   </p>`
                      : mergedArray[i]["Grade"]?.length === 1
                      ? mergedArray[i]["Grade"]
                            ?.map(
                                (item) =>
                                    `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
            ${item["Treatment recommendation"]}
          </p>`
                            )
                            // .filter(Boolean)
                            .join("")
                      : [
                            "Bone loss",
                            "Caries",
                            "Furcation",
                            "Abscess",
                        ].includes(mergedArray[i]["label"])
                      ? mergedArray[i]["Grade"]
                            ?.map((item) => {
                                if (mergedArray[i]["label"] === "Bone loss") {
                                    const match =
                                        mergedArray[i][
                                            "criticalTimeline"
                                        ]?.match(/Stage [IVX]+/);
                                    if (match && match[0] === item.Stage) {
                                        return `
              <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                ${item["Treatment recommendation"]}
              </p>`;
                                    }
                                }

                                if (mergedArray[i]["label"] === "Furcation") {
                                    const regex = /Grade\s+(\w+)/;
                                    const match =
                                        mergedArray[i][
                                            "criticalTimeline"
                                        ]?.match(regex);
                                    if (match && item.Grade === match[1]) {
                                        return `
              <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                ${item["Treatment recommendation"]}
              </p>`;
                                    }
                                }

                                if (
                                    mergedArray[i]["label"] === "Abscess" &&
                                    foundAbscess(
                                        mergedArray[i]["criticalTimeline"] || ""
                                    ) === item.Distance
                                ) {
                                    return `
            <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
              ${item["Treatment recommendation"]}
            </p>`;
                                }

                                if (
                                    mergedArray[i]["label"] === "Caries" &&
                                    mergedArray[i]["criticalTimeline"] !==
                                        undefined &&
                                    foundCariesStage(
                                        Number(
                                            mergedArray[i]["criticalTimeline"]
                                        ) || 0
                                    ) === item.Stage
                                ) {
                                    return `
            <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
              ${item["Treatment recommendation"]}
            </p>`;
                                }
                            })
                            .filter(Boolean)
                            .join("")
                      : null
              }

                
                </td>


            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               ${
                   mergedArray[i]["Grade"]?.[0]?.["Additional information"]
                       ? `
                   <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                  ${mergedArray[i]["Grade"]?.[0]["Additional information"]}
                   </p>`
                       : `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                  ${mergedArray[i]["description"]}
                   </p>`
               }
            </td>
            
 <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               ${
                   //for special edgecases
                   mergedArray[i]["label"] === "Caries" &&
                   mergedArray[i]["criticalTimeline"] == undefined
                       ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                      <a href=https://youtu.be/P8FmnS00mvM?si=CQxjPNZeCNcQUFhW target="_blank">https://youtu.be/P8FmnS00mvM?si=CQxjPNZeCNcQUFhW</a>
                   </p>`
                       : mergedArray[i]["label"] === "Bone loss" &&
                         mergedArray[i]["criticalTimeline"] ===
                             "not able to find"
                       ? `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    NA
                   </p>`
                       : mergedArray[i]["Grade"]?.length === 1
                       ? mergedArray[i]["Grade"]
                             ?.map(
                                 (item) =>
                                     `<a href=${item["Video link"]} target="_blank">${item["Video link"]}</a>`
                             )
                             .join("")
                       : [
                             "Bone loss",
                             "Caries",
                             "Furcation",
                             "Abscess",
                         ].includes(mergedArray[i]["label"])
                       ? mergedArray[i]["Grade"]
                             ?.map((item) => {
                                 if (mergedArray[i]["label"] === "Bone loss") {
                                     const match =
                                         mergedArray[i][
                                             "criticalTimeline"
                                         ]?.match(/Stage [IVX]+/);
                                     if (match && match[0] === item.Stage) {
                                         return `<a href=${item["Video link"]} target="_blank">${item["Video link"]}</a>`;
                                     }
                                 }

                                 if (mergedArray[i]["label"] === "Furcation") {
                                     const regex = /Grade\s+(\w+)/;
                                     const match =
                                         mergedArray[i][
                                             "criticalTimeline"
                                         ]?.match(regex);
                                     if (match && item.Grade === match[1]) {
                                         return `<a href=${item["Video link"]} target="_blank">${item["Video link"]}</a>`;
                                     }
                                 }

                                 if (
                                     mergedArray[i]["label"] === "Abscess" &&
                                     foundAbscess(
                                         mergedArray[i]["criticalTimeline"] ||
                                             ""
                                     ) === item.Distance
                                 ) {
                                     return `<a href=${item["Video link"]} target="_blank">${item["Video link"]}</a>`;
                                 }

                                 if (
                                     mergedArray[i]["label"] === "Caries" &&
                                     mergedArray[i]["criticalTimeline"] !==
                                         undefined &&
                                     foundCariesStage(
                                         Number(
                                             mergedArray[i]["criticalTimeline"]
                                         ) || 0
                                     ) === item.Stage
                                 ) {
                                     return `
                         <a href=${item["Video link"]} target="_blank">${item["Video link"]}</a>`;
                                 }
                             })
                             .filter(Boolean)
                             .join("")
                       : null
               }
            </td>

            </tr>`;
        }
    }
    html += `</tbody></table>`;
    html += print5();
    html += `<button class="print-button" onclick="window.print()">Print</button>`;
    //html += `<div><img  class="footer" src=${footer} alt="footer" width="100%" style="width:100%;"></div>`;
    const footer = `${origin}/footer.svg`;
    html += `<div><img  class="footer" src="${footer}" alt="footer" width="100%" style="width:100%;"></div>`;

    // Open a new window
    const printWindow = window.open("", "PrintWindow", "height=600,width=800");
    if (printWindow) {
        // Write the HTML to the new window, including the image tag
        printWindow.document.write(html);
        printWindow.document.close();
    }
}

const foundAbscess = (dataString: string) => {
    let number = dataString.match(/\d+/g);
    let arrayNumber = number?.map((e) => parseFloat(e)) || [];
    let Val = "";

    if (arrayNumber.length > 0 && arrayNumber.length === 1) {
        if (arrayNumber[0] <= 3) {
            Val = "0 mm - 3 mm";
        } else if (arrayNumber[0] > 3 && arrayNumber[0] < 8) {
            Val = "3 mm to 8 mm";
        } else if (arrayNumber[0] >= 8) {
            Val = "> 8 mm";
        }
    } else if (arrayNumber.length > 0) {
        if (arrayNumber[0] <= 3 && arrayNumber[1] <= 3) {
            Val = "0 mm - 3 mm";
        } else if (
            arrayNumber[0] >= 3 &&
            arrayNumber[1] <= 8 &&
            arrayNumber[0] <= 8 &&
            arrayNumber[1] >= 3
        ) {
            Val = "3 mm to 8 mm";
        } else if (arrayNumber[0] > 8 && arrayNumber[1] > 8) {
            Val = "> 8 mm";
        }
        return Val;
    }
};

const foundCariesStage = (value: number) => {
    let stage = "";
    if (value >= 3) {
        stage = "Stage 1";
    } else if (value > 0.5 && value <= 2.9) {
        stage = "Stage 2";
    } else if (value >= 0 && value <= 0.5) {
        stage = "Stage 3";
    }
    return stage;
};

// function to to add carries distance
function addCariesDistance(conditions: T_condition[]) {
    const arrCopy1: T_condition[] = JSON.parse(JSON.stringify(conditions));
    const arrCopy2: T_condition[] = JSON.parse(JSON.stringify(conditions));

    for (let i = 0; i < conditions.length - 1; i++) {
        if (conditions[i]["label"] === "Caries") {
            const id = conditions[i]["id"].split("-");
            const [a, b, c] = id;
            const matchingId = `${b}-${c}`;

            for (let j = arrCopy2.length - 1; j >= 0; j--) {
                if (arrCopy2[j]["label"].includes("(Caries)")) {
                    const secondId = arrCopy2[j]["id"].split("-");
                    const [first, second, third] = secondId;
                    const str = `${second}-${third}`;
                    if (matchingId === str) {
                        let distance = arrCopy2[j]["label"].split(" ")[0];
                        let res = distance.split("");
                        if (res[1] === ".") {
                            const [one, two, three, four] = res;
                            distance = `${one}${two}${three}`;
                        }
                        arrCopy1[i]["criticalTimeline"] = distance + "";
                    }
                }
            }
        }
    }
    return arrCopy1;
}

// Function to merge two arrays based on 'label' inclusion
type T_conditionWithReportMapping = T_condition & T_reportMapping;
function mergeArrays(
    arr1: T_condition[],
    arr2: T_reportMapping[]
): T_conditionWithReportMapping[] {
    return arr1.map((item1) => {
        if (item1.label.includes("critical distance")) {
            return { ...item1 };
        }
        // Find the corresponding item in arr2 where the label is included in item1.label
        const match = arr2.find((item2) =>
            item1.label.includes(item2.label || "")
        );

        // If a match is found, merge the objects, otherwise return the original item from arr1
        if (match) {
            return { ...item1, ...match };
        }
        return item1;
    });
}

type T_conditionWithCount = T_condition & {
    count?: number;
};
// Function to add a count key if the same conditions is repeating
function addCountForSameCondition(
    conditions: T_conditionWithCount[]
): T_conditionWithCount[] {
    const result: T_conditionWithCount[] = [];
    const idCountMap = new Map();

    conditions.forEach((obj) => {
        const parts = obj.id.split("-");
        if (parts.includes("lineSegment")) return;
        const identifier = parts[1];

        // if (identifier === "5" && !obj.criticalTimeline) return;

        if (!idCountMap.has(identifier)) {
            idCountMap.set(identifier, 1);
        } else {
            idCountMap.set(identifier, idCountMap.get(identifier) + 1);
        }

        const count = idCountMap.get(identifier);
        const newObj = obj;

        if (count > 1) {
            newObj.count = count;
        }

        result.push(newObj);
    });
    return result;
}

const carriesCriticalDistance = (dis: number | string) => {
    const value = Number(dis);
    let distance;
    if (value && value < 0.5) {
        distance = "Involving pulp";
    } else if (value >= 0.5 || value <= 2.9) {
        distance = "Advanced";
    } else if (value >= 3) {
        distance = "Initial to Moderate";
    }
    return distance;
};
