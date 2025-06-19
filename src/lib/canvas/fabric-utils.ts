import { Canvas, FabricObject } from "fabric";

export const removeAllObjects = (
    canvas: Canvas,
    exceptionByName: string[] = []
) => {
    //canvas.clear(); //Returns JS error from fabric
    const objects = canvas.getObjects() as FabricObject[];
    objects.forEach((o) => {
        const name = o.get("name") as string;
        if (!name || !exceptionByName.includes(name)) {
            canvas.remove(o);
        }
    });
};

export const getItemByName = function (
    canvas: Canvas,
    name: string,
    multi = false
) {
    if (!name) return null;
    let object = null;
    const objects = canvas.getObjects() as FabricObject[];
    // console.log("objects=", JSON.stringify(objects.map((o) => o.name)));
    for (let i = 0, len = canvas.size(); i < len; i++) {
        const n = objects[i].get("name") as string;
        if (n && n === name) {
            if (!multi) {
                object = objects[i];
                break;
            } else {
                objects.push(objects[i]);
            }
        }
    }
    return multi ? objects : object;
};
export const getItemByNameArray = function (canvas: Canvas, names: string[]) {
    const objects = canvas.getObjects() as FabricObject[];
    const result: FabricObject[] = [];
    for (let i = 0, len = canvas.size(); i < len; i++) {
        const n = objects[i].get("name") as string;
        if (n) {
            if (names.includes(n)) {
                result.push(objects[i]);
            }
        }
    }
    return result;
};
export const deleteItemByName = function (
    canvas: Canvas,
    name: string | string[]
) {
    const objects = canvas.getObjects();
    let numDeleted = 0;
    const names = Array.isArray(name) ? name : [name];
    for (let i = 0, len = canvas.size(); i < len; i++) {
        const n = objects[i].get("name") as string;
        if (n && names.includes(n)) {
            canvas.remove(objects[i]);
            numDeleted++;
        }
    }
    return numDeleted;
};
