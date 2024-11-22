// const calculateTotalCost = (roomsData) => {
//     const daysDifference = dayjs(checkOut).diff(dayjs(checkIn), "day");
//   const hoursDifference = dayjs(checkOut).diff(dayjs(checkIn), "hour");/-strong/-heart:>:o:-((:-h
//     return roomsData.reduce(
//         (room: {
//             price: { dailyRate: number; hourlyRate: number };
//             numberOfRooms: number;
//             adults: number;
//             limit: number;
//         }) => {
//             const totalDays = Math.floor(daysDifference);
//             const remainingHours = hoursDifference - totalDays * 24;
//             const dayCost =
//                 (room.price.dailyRate || 0) * totalDays * room.numberOfRooms;
//             const hourCost =
//                 remainingHours > 0
//                     ? (room.price.hourlyRate || 0) *
//                       remainingHours *
//                       room.numberOfRooms
//                     : 0;

//             const excessGuests = Math.max(
//                 room.adults - room.limit,
//                 0,
//             );
//             const extraCharge =
//                 calculateExtraCharge(excessGuests) * room.numberOfRooms;

//             return dayCost + hourCost + extraCharge;
//         },
//         0,
//     );
// };
