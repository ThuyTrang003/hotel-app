//từ 2024-10-28T00:00:00.000Z hoặc 2024-10-28 -> 28-10-2024
//2024-10-28T14:30:00.000Z -> 28-10-2024 14:30:00
export function dateFormatter(dateString) {
    if (!dateString) return dateString;

    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");

    if (timePart) {
        const time = timePart.split(".")[0]; // Bỏ phần mili giây nếu có
        return `${day}-${month}-${year} ${time}`;
    }

    return `${day}-${month}-${year}`;
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
//từ 2024-10-28 -> 2024-10-28T00:00:00.000Z
export function getStartOfDayISO(dateStr) {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    if (!isValidDate) {
        console.error("Invalid date format");
        return null;
    }
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const date = new Date(dateStr);

    // Đặt giờ, phút, giây và mili giây về 0 để lấy đầu ngày
    date.setUTCHours(0, 0, 0, 0);

    // Trả về chuỗi ISO (UTC) dạng `2024-10-29T00:00:00.000Z`
    return date.toISOString();
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

// Hàm chuyển đổi từ yyyy-mm-dd sang đối tượng Date
export function parseDate(dateStr) {
    const [year, month, day] = dateStr.split("-"); // Tách chuỗi và chuyển thành số
    return new Date(`${year}-${month}-${day}`); // Tháng trong Date bắt đầu từ 0
}

//input:, "2024-10-20", "2024-10-28T00:00:00.000Z",  "2024-10-29T00:00:00.000Z" -> output:true, false
export function isDateInRange(dateStr, startDay, endDay) {
    // Chuyển đổi dateStr từ "dd/mm/yyyy" thành "yyyy-mm-dd"
    const [day, month, year] = dateStr.split("/").map(Number);
    const formattedDateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Chuyển đổi ngày thành đối tượng Date và đưa về đầu ngày (UTC)
    const dateToCheck = new Date(formattedDateStr);
    dateToCheck.setUTCHours(0, 0, 0, 0);

    const startDate = new Date(startDay);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(endDay);
    endDate.setUTCHours(0, 0, 0, 0);

    // So sánh ngày (không tính giờ)
    return dateToCheck >= startDate && dateToCheck <= endDate;
}
