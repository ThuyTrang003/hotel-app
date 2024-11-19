//từ 2024-10-28T00:00:00.000Z hoặc 2024-10-28 -> 28-10-2024
export function dateFormatter(dateString) {
    if (dateString) {
        const [datePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-");
        return `${day}-${month}-${year}`;
    } else return dateString;
}
//từ 2024-10-28T00:00:00.000Z -> 2024-10-28
export function formatISODate(dateString) {
    // Kiểm tra chuỗi đầu vào có hợp lệ hay không
    if (dateString) {
        if (!dateString.includes("T")) {
            return dateString;
        }

        // Tách chuỗi trước ký tự "T"
        const [datePart] = dateString.split("T");
        return datePart; // Trả về phần ngày
    }
    return dateString;
}
//từ 2024-10-28 -> 2024-10-28T23:59:59.999Z
export function toEndOfDayISO(dateString) {
    // Kiểm tra định dạng yyyy-MM-dd

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    if (!isValidDate) {
        console.error("Invalid date format");
        return null;
    }

    // Tạo đối tượng Date từ chuỗi ngày
    const date = new Date(dateString);

    // Thiết lập thời gian là cuối ngày
    date.setUTCHours(23, 59, 59, 999);

    // Trả về chuỗi ISO
    return date.toISOString();
}
