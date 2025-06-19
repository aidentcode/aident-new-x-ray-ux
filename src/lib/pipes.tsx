export function jsonToBase64(object: object) {
    const json = JSON.stringify(object);
    return Buffer.from(json).toString("base64");
}
export function base64ToJson(base64String: string) {
    const json = Buffer.from(base64String, "base64").toString();
    return JSON.parse(json);
}
