import Image from "next/image";

export default function PaymentOption({ handleBookNow }) {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-6">
      {/* QR Code */}
      <Image
        src="/image1.jpg"
        alt="QR Code"
        className="mb-4"
        width={500}
        height={500}
      />
      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Book Now
      </button>
    </div>
  );
}
