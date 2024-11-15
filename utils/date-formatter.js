export function dateFormatter(dateString) {
    if (dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    } else return dateString;
}

export function reverseDateFormatter(dateString) {
    if (dateString) {
        const [day, month, year] = dateString.split("-");
        return `${year}-${month}-${day}`;
    } else return dateString;
}
