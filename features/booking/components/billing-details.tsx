import Image from "next/image";
import { useEffect, useState } from "react";

export default function BillingDetails() {
  const [couponValidated, setCouponValidated] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(0);
  const [bookingInfo, setBookingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    guest: "",
    specialRequests: "",
  });
  const handleValidateCoupon = (e) => {
    e.preventDefault();
    setDiscount(20);
    setCouponValidated(true);
  };
  const handleProceedToCheckout = () => {
    const info = {
      ...bookingInfo,
      room: "Deluxe Room",
      branch: "Zante Greece",
      checkInOut: `${checkIn} → ${checkOut}`,
      guests: `${bookingInfo.guest} Guest`,
      totalPrice: couponValidated
        ? (roomPrice * (1 - discount / 100)).toFixed(2)
        : roomPrice,
      depositAmount: couponValidated
        ? (roomPrice * (1 - discount / 100) * 0.8).toFixed(2)
        : (roomPrice * 0.8).toFixed(2),
    };

    localStorage.setItem("bookingInfo", JSON.stringify(info));
    window.location.href = "/checkout";
  };
  useEffect(() => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);

    const timeDiff = outDate - inDate;

    const diffInDays = timeDiff / (1000 * 60 * 60 * 24);

    setNights(diffInDays);
  }, [checkIn, checkOut]);
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkIn");
    const storedCheckOut = localStorage.getItem("checkOut");

    if (storedCheckIn) setCheckIn(storedCheckIn);
    if (storedCheckOut) setCheckOut(storedCheckOut);
  }, []);
  const roomPrice = 1791;
  // const totalBeforeDiscount = roomPrice;
  // const totalAfterDiscount = totalBeforeDiscount * (1 - discount / 100);
  return (
    <div className=" px-24 py-10">
      <div className="flex justify-between">
        {/* Left Section: Notification Bar & Billing Form */}
        <div className="w-3/4">
          {/* Top Notification Bar */}
          <div className="bg-blue-500 text-white p-2 px-5 rounded-md mb-8 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="white" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-.75 5h1.5v5h-1.5zm.75 9.25a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 16.25z" />
            </svg>
            Hey! Use the coupon code{" "}
            <strong className="ml-1 mr-1">ZANTE20OFF </strong> to get 20% off on
            your total price!
          </div>

          {/* Billing Form */}
          <div className="bg-white">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Billing Details
            </h2>

            <form>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border p-3 rounded-md mb-5"
                  value={bookingInfo.fullName.split(" ")[0] || ""}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      fullName:
                        e.target.value +
                        " " +
                        bookingInfo.fullName.split(" ")[1],
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border p-3 rounded-md mb-5"
                  value={bookingInfo.fullName.split(" ")[1] || ""}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      fullName:
                        bookingInfo.fullName.split(" ")[0] +
                        " " +
                        e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-3 rounded-md mb-5"
                  value={bookingInfo.email}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, email: e.target.value })
                  }
                />
                <div className="flex">
                  <span className="border p-3 rounded-l-md bg-gray-100 mb-5">
                    🇻🇳 +84
                  </span>
                  <input
                    type="text"
                    placeholder="Phone"
                    className="border p-3 rounded-r-md flex-1 mb-5"
                    value={bookingInfo.phone}
                    onChange={(e) =>
                      setBookingInfo({ ...bookingInfo, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Address"
                  className="border p-3 rounded-md mb-5"
                  value={bookingInfo.address}
                  onChange={(e) =>
                    setBookingInfo({ ...bookingInfo, address: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Guest"
                  className="border p-3 rounded-md mb-5"
                  value={bookingInfo.adultCount}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      adultCount: e.target.value,
                    })
                  }
                />
              </div>

              {/* Special Requests */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-500">
                  Special Requests
                </h3>
                <textarea
                  placeholder="Special Requests"
                  className="border p-3 rounded-md w-full h-24 mb-5"
                  value={bookingInfo.specialRequests}
                  onChange={(e) =>
                    setBookingInfo({
                      ...bookingInfo,
                      specialRequests: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-2">Arrival Time</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    "10:00 - 11:00",
                    "12:00 - 13:00",
                    "13:00 - 14:00",
                    "17:00 - 18:00",
                  ].map((time, index) => (
                    <div
                      key={index}
                      className="flex items-center border rounded-lg px-3 py-2"
                    >
                      <input
                        type="radio"
                        name="arrivalTime"
                        id={`time-${index}`}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`time-${index}`}
                        className="text-gray-700"
                      >
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-2">Coupon</h3>
                {couponValidated ? (
                  <div className="bg-green-100 p-4 rounded-md text-green-700 flex items-center">
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="green"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 13.41l-3.54-3.54L8.83 10l2.83 2.83L17.17 7l1.41 1.41z" />
                    </svg>
                    Coupon code ZANTE20OFF applied successfully!
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter coupon code if you have one"
                      className="border w-9/12 flex items-center pl-4"
                    />
                    <button
                      className="bg-yellow-500 text-white p-3 rounded-md font-semibold ml-20"
                      onClick={handleValidateCoupon}
                    >
                      VALIDATE CODE
                    </button>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6 flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <span className="text-yellow-500">Terms and Conditions</span>
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section: Booking Summary */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-5 pt-40 relative ml-6 mt-[32px] border h-[650px]">
          {/* Image */}
          <div className="absolute top-0 left-0 w-full h-48 rounded-t-lg overflow-hidden -mt-8">
            <Image
              src="/image1.jpg" // Ensure this path is correct
              alt="Room"
              className="w-full h-full object-cover"
              width={400} // You can adjust width as needed
              height={200} // You can adjust height as needed
            />
          </div>

          <h2 className="text-xl font-thin text-black-100 mb-6 mt-2">
            Booking Details
          </h2>

          <div className="mb-4 flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Types</p>
            <p className="text-[13px] font-normal">Zante Greece</p>
          </div>

          <div className="mb-4 flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Check In</p>
            <p className="text-[13px] font-normal">
              {new Date(checkIn).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="mb-4 flex justify-between ">
            <p className="font-semibold text-sm text-gray-600">Check Out</p>
            <p className="text-[13px] font-normal">
              {new Date(checkOut).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="mb-4 flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Nights</p>
            <p className="text-[13px] font-normal">{nights}</p>
          </div>

          <div className="mb-4 flex justify-between">
            <p className="font-semibold text-sm text-gray-600">Guests</p>
            <p className="text-[13px] font-normal">
              {bookingInfo.guest} Guest
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-600 mb-2">Price Summary</h3>
            <div className="mb-4 flex justify-between">
              <p className="font-semibold text-[15px] text-gray-400">
                Deluxe Room:
              </p>
              <p className="text-[14px] font-normal">€1,791</p>
            </div>
            {couponValidated && (
              <div className="mb-4 flex justify-between text-green-600">
                <p className="font-semibold text-[15px]">
                  Discount ZANTE20OFF:
                </p>
                <p className="text-[14px] font-normal">-20%</p>
              </div>
            )}
          </div>
          <div className="mb-4 flex justify-between bg-[#F5F4FB] py-3">
            <h3 className="font-semibold text-[15px] text-black-400">
              Total Price
            </h3>
              <span>
                {couponValidated
                  ? (roomPrice * (1 - discount / 100)).toFixed(2)
                  : roomPrice}{" "}
                $
              </span>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-yellow-500 text-white py-3 px-6 rounded-md font-semibold"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
