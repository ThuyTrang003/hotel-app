export function roleFormatter(value) {
    if (value) {
        return value.replace(/([A-Z])/g, " $1").trim();
    } else return value;
}
