export default function BookingDetail({ bookingInfo }) {
    return (
      <div className="grid grid-cols-2 gap-6 mb-16">
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Full Name:</p>
          <p>{bookingInfo.fullName}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Email:</p>
          <p>{bookingInfo.email}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Phone:</p>
          <p>{bookingInfo.phone}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Room:</p>
          <p>{bookingInfo.room}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Types:</p>
          <p>{bookingInfo.branch}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Check In/Out:</p>
          <p>{bookingInfo.checkInOut}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Guests:</p>
          <p>{bookingInfo.guests}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Total Price:</p>
          <p>€{bookingInfo.totalPrice}</p>
        </div>
  
        <div className="flex">
          <p className="font-semibold text-gray-600 mr-2">Deposit Amount:</p>
          <p>€{bookingInfo.depositAmount}</p>
        </div>
      </div>
    );
}
  