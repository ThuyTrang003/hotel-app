export default function Progressbar() {
  return (
    <div className="flex items-center justify-between w-full px-24 py-10 bg-[#F5F3F0] mt-16">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
          <div className="w-4 h-4 rounded-full bg-gray-600"></div>
        </div>
        <p className="mt-2 text-gray-600">Search</p>
        <p className="text-sm text-gray-400">Choose your favorite room</p>
      </div>

      <div className="flex-1 border-t-2 border-gray-300"></div>

      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
        </div>
        <p className="mt-2 text-gray-600">Booking</p>
        <p className="text-sm text-gray-400">Enter your booking details</p>
      </div>

      <div className="flex-1 border-t-2 border-gray-300"></div>

      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
        </div>
        <p className="mt-2 text-gray-600">Checkout</p>
        <p className="text-sm text-gray-400">
          Use your preferred payment method
        </p>
      </div>

      <div className="flex-1 border-t-2 border-gray-300"></div>

      <div className="flex flex-col items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
        </div>
        <p className="mt-2 text-gray-600">Confirmation</p>
        <p className="text-sm text-gray-400">Receive a confirmation email</p>
      </div>
    </div>
  );
}
