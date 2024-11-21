import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, FileText, Lock, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import RestClient from "@/features/room/utils/api-function";
import VoucherList from "./voucher-list";

dayjs.extend(customParseFormat);

export default function BillingDetails() {
  const router = useRouter();
  const containerRef = useRef(null);
  const searchParams = useSearchParams();
  const [roomData, setRoomData] = useState(null);
  const [showRooms, setShowRooms] = useState(false);
  const [points, setPoints] = useState(0);
  const [pointsToApply, setPointsToApply] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const toggleShowRooms = () => setShowRooms(!showRooms);

  const [showVoucherList, setShowVoucherList] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [error, setError] = useState(null);
  const [paidAmount, setPaidAmount] = useState(0);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowVoucherList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowVoucherList]);

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherList(false);
    console.log("Selected Voucher: ", voucher);
  };

  useEffect(() => {
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const roomDetailsString = searchParams.get("roomDetails");

    const roomDetails = roomDetailsString
      ? JSON.parse(decodeURIComponent(roomDetailsString))
      : [];
    console.log("ROOM DETAILS", roomDetails);
    setRoomData({
      checkIn,
      checkOut,
      roomDetails,
    });
    const fetchCustomerPoints = async () => {
      const restClient = new RestClient();
      restClient.service("customers");
      let userId = null;
      const userAccount = localStorage.getItem("userAccount");
      if (userAccount) {
        const parsedAccount = JSON.parse(userAccount);
        userId = parsedAccount.state.userAccount.id;
      }
      const response = await restClient.get(userId);
      if (response && response.point) {
        setPoints(response.point);
      }
    };

    fetchCustomerPoints();
  }, [searchParams]);

  if (!roomData) return null;

  const daysDifference = dayjs(roomData.checkOut).diff(
    dayjs(roomData.checkIn),
    "day"
  );
  const totalHoursDifference = dayjs(roomData.checkOut).diff(
    dayjs(roomData.checkIn),
    "hour"
  );
  const remainingHours = totalHoursDifference - daysDifference * 24;

  const calculateTotalCost = () => {
    return roomData.roomDetails.reduce((total, room) => {
      const dailyCost =
        (room.price.dailyRate || 0) * daysDifference * room.roomCount;
      const hourlyCost =
        (room.price.hourlyRate || 0) * remainingHours * room.roomCount;
      const extraCharge = room.extraCharge;
      return total + dailyCost + hourlyCost + extraCharge;
    }, 0);
  };

  const totalCost = calculateTotalCost();
  const calculateDiscountedTotal = () => {
    const discountFromPoints = pointsToApply * 1000;

    let voucherDiscount = 0;
    if (selectedVoucher) {
      const discountPercentage = selectedVoucher.discountPercentage / 100;
      const maxDiscount = selectedVoucher.maxDiscount;
      const discountByVoucher = totalCost * discountPercentage;

      voucherDiscount = Math.min(maxDiscount, discountByVoucher);
    }

    const totalDiscount = discountFromPoints + voucherDiscount;

    return totalCost - totalDiscount;
  };

  const handleBooking = async () => {
    try {
      let userId=null;
      const userAccount = localStorage.getItem("userAccount");
      if (userAccount) {
        const parsedAccount = JSON.parse(userAccount);
        userId = parsedAccount.state.userAccount.id;
      }
      const bookingData = {
        userId: userId,
        typeRooms: roomData.roomDetails.map((room) => ({
          typeId: room.roomId,
          numberOfRooms: room.roomCount,
        })),
        checkInTime: new Date(roomData.checkIn).toISOString(),
        checkOutTime: new Date(roomData.checkOut).toISOString(),
        paidAmount: paidAmount,
        numberOfGuests: roomData.roomDetails.reduce(
          (total, room) => total + room.adults,
          0
        ),
        paymentMethod: "Credit Card",
        redeemedPoint: pointsToApply,
      };

      if (selectedVoucher && selectedVoucher.code) {
        bookingData.voucherCode = selectedVoucher.code;
      }

      console.log("Sending booking data:", bookingData);

      const restClient = new RestClient();
      restClient.service("bookings");
      const response = await restClient.create(bookingData);
      console.log("Response", response);

      if (response.success === false) {
        console.error("Booking failed:", response.message || "Unknown error");
      } else {
        alert("Your booking has been successfully completed!");

        const url = new URL(window.location);
        url.searchParams.delete("checkIn");
        url.searchParams.delete("checkOut");
        url.searchParams.delete("roomDetails");
        window.history.replaceState({}, "", url);

        router.push("/");
      }
    } catch (error) {
      if (error.errorData) {
        console.error("Booking failed with details:", error.errorData);
        setError(error.errorData.error.message);
      } else {
        console.error("Error in booking:", error);
      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center px-4 py-5">
      <header className="w-full flex items-center justify-center mt-16 px-4">
        <h1 className="text-xl font-bold text-blue-800">BOOKING INFORMATION</h1>
        <div className="w-10"></div>
      </header>

      <div className="w-full max-w-5xl mt-8 flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {/* Booking Policy Section */}
          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-lg font-semibold mb-4">Booking Policy</h2>
            {roomData.roomDetails.length > 0 ? (
              <div className="flex items-start mb-4">
                <div>
                  {roomData.roomDetails.map((room, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex">
                        <FileText className="w-5 h-5 text-gray-600 mr-2" />
                        <p className="font-semibold">Room: {room.typeRoom}</p>
                      </div>
                      <p className="text-gray-700 mt-2">
                        <strong>Cancellation:</strong> If you cancel or no-show,
                        you will be charged the full deposit amount.
                      </p>
                      <p className="text-gray-700 mt-1">
                        <strong>Payment:</strong> Full payment of the booking
                        amount is required.
                      </p>
                      <p className="text-gray-700 mt-1">Breakfast included</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>You haven't selected a room yet!</p>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="flex items-center mb-4">
              <Image
                width={40}
                height={40}
                src={"/image2.jpg"}
                alt="Bank"
                className="mr-3"
              />
              <p>OnePay Vietnam (ATM Card)</p>
            </div>

            <div className="flex justify-center mb-4">
              <QRCode value={`Payment: ${paidAmount} VND`} size={128} />
            </div>

            {/* Input for paidAmount */}
            <div className="mb-4">
              <label
                htmlFor="paidAmount"
                className="block text-gray-700 text-sm mb-2"
              >
                Enter Paid Amount:
              </label>
              <input
                type="text"
                id="paidAmount"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={paidAmount.toLocaleString("vi-VN")}
                defaultValue={calculateDiscountedTotal() * 0.2}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\./g, "");
                  const numericValue = parseFloat(rawValue) || 0;
                  setPaidAmount(numericValue);
                }}
                onBlur={() => {
                  if (paidAmount < calculateDiscountedTotal() * 0.2) {
                    setPaidAmount(calculateDiscountedTotal() * 0.2);
                  }
                }}
              />
              {paidAmount !== undefined &&
                paidAmount < calculateDiscountedTotal() * 0.2 && (
                  <p className="text-red-500 text-sm mt-2">
                    Paid amount must be at least{" "}
                    {calculateDiscountedTotal() * 0.2} VND.
                  </p>
                )}
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                Please read and agree to the booking terms by checking the box.
              </label>
            </div>

            <button
              onClick={handleBooking}
              className={`w-full bg-yellow-500 text-white font-semibold py-3 rounded flex items-center justify-center ${
                isChecked && paidAmount >= calculateDiscountedTotal() * 0.2
                  ? "opacity-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={
                !isChecked || paidAmount < calculateDiscountedTotal() * 0.2
              }
            >
              <Lock className="w-5 h-5 mr-2" />
              BOOK NOW
            </button>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-md shadow h-fit">
          <p>{error}</p>
          <h2 className="text-lg font-semibold mb-4 border-b-2 py-2">
            Your Booking Request
          </h2>
          <p className="font-semibold">Hotel Zante</p>
          <p className="text-gray-700 mt-2">
            Check-in: {dayjs(roomData.checkIn).format("DD/MM/YYYY hh:mm A")}
          </p>
          <p className="text-gray-700">
            Check-out: {dayjs(roomData.checkOut).format("DD/MM/YYYY hh:mm A")}
          </p>
          <p className="text-gray-700 mb-4">
            ({daysDifference} days
            {remainingHours > 0 ? `, ${remainingHours} hours` : ""}){" "}
          </p>
          <hr className="my-4" />
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">Room Information</p>
            {roomData.roomDetails.length > 0 && (
              <button
                onClick={toggleShowRooms}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                {showRooms ? <Minus /> : <Plus />}
              </button>
            )}
          </div>
          {/* Room Information */}
          {showRooms && roomData.roomDetails.length > 0 ? (
            roomData.roomDetails.map((room, index) => (
              <div key={index} className="mt-1">
                <p className="text-gray-600">Room: {room.typeRoom}</p>
                <p className="text-gray-600">Room count: {room.roomCount}</p>
                <p className="text-gray-600">Guests: {room.adults}</p>
                <p className="text-gray-600">
                  Room price:
                  <br /> {room.price.dailyRate.toLocaleString()} VND/night |{" "}
                  {room.price.hourlyRate.toLocaleString()} VND/hour
                </p>
                <p className="text-gray-600">
                  Extra charge: {room.extraCharge.toLocaleString()} VND
                </p>
                {index < roomData.roomDetails.length - 1 && (
                  <hr className="border-gray-300 mt-3" />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600"></p>
          )}

          <hr className="my-4" />

          <div className="flex flex-row justify-between border-b-2 mb-2">
            <p className="font-semibold text-gray-700 mb-5">Room Price</p>
            <p className="text-sm font-bold mb-5">
              {totalCost.toLocaleString()} VND
            </p>
          </div>

          <div className="w-full mb-4 relative" ref={containerRef}>
            <p className="text-sm font-thin">Enter promo code/voucher code</p>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 pr-8"
                placeholder={
                  selectedVoucher ? selectedVoucher.code : "Select a voucher"
                }
                readOnly
                onClick={() => setShowVoucherList(!showVoucherList)}
              />
              {selectedVoucher && (
                <button
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
                  onClick={() => handleSelectVoucher(null)}
                >
                  ✕
                </button>
              )}
            </div>
            {showVoucherList && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-60 overflow-auto z-10">
                <VoucherList
                  onSelectVoucher={(voucher) => {
                    handleSelectVoucher(voucher);
                    setShowVoucherList(false);
                  }}
                  totalAmount={totalCost}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm font-thin">Use your loyalty points</p>
            <p className="text-gray-600">Available points: {points}</p>
            <input
              type="text"
              max={points}
              value={pointsToApply}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "" ||
                  (/^\d+$/.test(value) && Number(value) <= points)
                ) {
                  setPointsToApply(value);
                }
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 mt-2"
              placeholder="Enter the number of points you want to use"
            />
            <p className="text-gray-500 text-sm mt-2">
              Each point equals a 1000 VND discount.
            </p>
          </div>

          <div className="flex flex-row justify-between rounded mt-4">
            <p className="font-semibold">Total Price:</p>
            <p className="text-lg font-bold text-red-500">
              {calculateDiscountedTotal().toLocaleString()} VND
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
