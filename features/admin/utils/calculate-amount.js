export function calculateAmount(
    checkInTime,
    checkOutTime,
    hourlyRate,
    dailyRate,
    overOccupancyCharge,
    redeemedPoint,
    voucherAmount,
) {
    console.log(checkInTime, checkOutTime, hourlyRate, dailyRate);
    const checkInDate = new Date(checkInTime);
    const checkOutDate = new Date(checkOutTime);

    const diffMilliseconds = checkOutDate.getTime() - checkInDate.getTime();
    const diffHours = Math.ceil(diffMilliseconds / (1000 * 60 * 60)); // Làm tròn số giờ
    const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24)); // Số ngày tròn
    // Nếu lẻ ngày, tính số giờ còn lại
    const remainingHours = diffHours - diffDays * 24;
    console.log(diffDays * dailyRate + remainingHours * hourlyRate);

    // Tính tổng tiền
    let cost = diffDays * dailyRate + remainingHours * hourlyRate;
    cost += overOccupancyCharge - redeemedPoint * 1000;
    if (voucherAmount) {
        cost -= voucherAmount;
    }

    return cost;
}
