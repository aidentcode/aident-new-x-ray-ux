import { T_xrayContext } from "@/contexts/xrayContext";
import {
    getPrintOPGReportHtml,
    opgPrint2,
    opgPrint3,
    opgPrint5,
} from "./print-opg-html-utils";
import { T_condition } from "./types/types";
import { conditionsAvailableOpg, opgReportMapping } from "./report-opg-utils";
import { getColorFromCode } from "./data/colorData";
import { addCariesDistance, mergeArrays } from "./print-utils";

export function printOPGImage(
    image: HTMLImageElement,
    xrayContext: T_xrayContext
) {
    const { conditions } = xrayContext;
    if (!conditions) return;
    const origin = window.location.origin;
    let html = getPrintOPGReportHtml(origin);

    // Dynamic image HTML
    html += `<tr>
                  <td align="left" valign="top" style="padding-bottom: 10px;">
                    <img width="900px" src="${image.src}" />
                  </td>
               </tr>
                <tr>
                  <td align="left" style="padding-bottom: 30px;">

                     <table cellspacing="0" cellpadding="0" border="0">
                        <tr>
               `;

    function uniqueByLabel(arr: T_condition[]) {
        const seen = new Map();
        const result = [];

        for (const item of arr) {
            // Check if the item has a label property and it's not already seen
            if (
                item.label &&
                !seen.has(item.label) &&
                conditionsAvailableOpg.includes(item.label)
            ) {
                seen.set(item.label, true);
                result.push(item);
            }
        }
        return result;
    }

    let uniqueArray = uniqueByLabel(conditions);
    for (let i = 0; i < uniqueArray.length; i++) {
        html += ` <td align="left" valign="middle">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                        <td height="25" width="40" valign="middle"
                            style="height: 25px;width: 40px;background:${getColorFromCode(
                                uniqueArray[i]["colorCode"]
                            )};">&nbsp;</td>
                        <td valign="middle"
                            style="color: #333333;font-size: 14px;font-weight: 500;font-family: 'Roboto', Arial, sans-serif;padding-left: 5px;">
                            ${uniqueArray[i]["label"]}</td>
                        </tr>
                    </table>
                </td>
            `;
    }

    html += ` </tr>
              </table>
                </td>
                </tr>`;
    // html += headerImage;
    html += opgPrint2({ email_id: "test@test.com" });
    html += opgPrint3;

    // const caries = findCaries();

    const addCaries = addCariesDistance(conditions);

    // Perform the merge
    let mergedArray = mergeArrays(addCaries, opgReportMapping);
    mergedArray = uniqueByLabel(mergedArray);
    //uniqueByLabel

    for (let i = 0; i < mergedArray.length; i++) {
        if (conditionsAvailableOpg.includes(mergedArray[i]["label"])) {
            const grade = mergedArray[i]["Grade"];
            const hasGrade = grade && Array.isArray(grade) && grade.length > 0;

            html += `<tr>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 8px 10px;font-size: 14px;font-weight: 400;">
               <p style="font-weight: 600;font-size: 14px;color: #333333;padding-bottom: 15px !important;">
                  ${mergedArray[i]["label"]}
                </p>
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               ${
                   hasGrade
                       ? grade
                             ?.map(
                                 (item) =>
                                     `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    ${item["Interpretation"]}
                   </p>`
                             )
                             .join("")
                       : `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    NA
                   </p>`
               }
            </td>
            <td valign="top" style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
              ${
                  hasGrade
                      ? grade
                            ?.map(
                                (item) =>
                                    `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                            ${item["Treatment recommendation"]}
                           </p>`
                            )
                            .join("")
                      : `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                      NA
                    </p>`
              }
            </td>
            <td valign="top"
               style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
               ${
                   hasGrade && grade[0] && grade[0]["Additional information"]
                       ? `
                   <p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                  ${grade[0]["Additional information"]}
                   </p>`
                       : `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                    NA
                   </p>`
               }
            </td>
            <td valign="top" style="font-family: 'Roboto', Arial, sans-serif;padding: 6px 10px;font-size: 12px;font-weight: 400;">
              ${
                  hasGrade
                      ? grade
                            ?.map((item) => {
                                if (item["Video link"] !== "NA") {
                                    return `<a href=${item["Video link"]} target="_blank">${item["Video link"]}</a>`;
                                } else {
                                    return `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                      NA
                    </p>`;
                                }
                            })
                            .join("")
                      : `<p style="font-size: 14px;font-family: 'Roboto', Arial, sans-serif;color: #333333;padding-bottom: 10px !important;">
                      NA
                    </p>`
              }
            </td>
            </tr>`;
        }
    }
    html += `</tbody></table>`;
    html += opgPrint5();
    html += `<button class="print-button" onclick="window.print()">Print</button>`;
    const footer = `${origin}/footer.svg`;
    html += `<div><img  class="footer" src="${footer}" alt="footer" width="100%" style="width:100%;"></div>`;

    // click on download button
    // Open a new window
    const printWindow = window.open("", "PrintWindow", "height=600,width=800");

    // Write the HTML to the new window, including the image tag
    if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
    }
}
