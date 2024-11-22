// Hàm để dàn phẳng object
export function flattenObject(obj, parentKey = "", result = {}) {
    for (let key in obj) {
        const newKey = parentKey ? `${parentKey}.${key}` : key; // Tạo key mới
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            flattenObject(obj[key], newKey, result); // Đệ quy với key mới
        } else {
            result[newKey] = obj[key];
        }
    }
    return result;
}
