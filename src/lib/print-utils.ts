import { T_reportMapping } from "./report-rvg-utils";
import { T_condition } from "./types/types";

export const foundAbscess = (dataString: string) => {
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

export const foundCariesStage = (value: number) => {
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
export function addCariesDistance(conditions: T_condition[]) {
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
export function mergeArrays(
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
export function addCountForSameCondition(
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

export const carriesCriticalDistance = (dis: number | string) => {
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
