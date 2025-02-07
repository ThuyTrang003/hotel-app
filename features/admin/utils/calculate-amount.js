export function calculateAmount(
    checkInTime,
    checkOutTime,
    price,
    overOccupancyCharge,
    redeemedPoint,
    voucherAmount,
) {
    const checkInDate = new Date(checkInTime);
    const checkOutDate = new Date(checkOutTime);

    const diffMilliseconds = checkOutDate.getTime() - checkInDate.getTime();
    // Tính số ngày, làm tròn lên để đảm bảo 1 ngày tối thiểu
    const diffDays = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));

    // Tính tổng tiền
    let cost = diffDays * price;
    cost += overOccupancyCharge - redeemedPoint * 1000;
    if (voucherAmount) {
        cost -= voucherAmount;
    }

    return cost;
}
