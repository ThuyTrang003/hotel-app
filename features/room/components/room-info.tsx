import {
    Martini,
    Wifi,
    Utensils,
    Coffee,
    Smartphone,
    Tv,
    Bath,
    WashingMachine,
    AirVent,
    UsersRound,
    CalendarDays,
    BedDouble,
    LandPlot,
    Star,
  } from "lucide-react";
  import Image from "next/image";

  export default function RoomInfo() {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Room details and Room Services */}
          <div className="lg:col-span-2">
            {/* Room Information */}
            <div className="mb-8">
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold mb-4">Deluxe Room</h1>
                <p className="text-3xl font-bold">€199 / per night</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <UsersRound className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Max Guests:</p>
                    <p className="text-gray-600">5 Adults / 2 Children</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarDays className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Booking Nights:</p>
                    <p className="text-gray-600">3 Min.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BedDouble className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Bed Type:</p>
                    <p className="text-gray-600">Twins Bed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <LandPlot className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Area:</p>
                    <p className="text-gray-600">80 m²</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...
              </p>
              {/* More detailed descriptions */}
              <ul className="list-disc ml-5 text-gray-700 space-y-2">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              </ul>
            </div>
  
            {/* Room Services Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Room Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Martini className="w-6 h-6" />
                  <p>Mini Bar</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Bath className="w-6 h-6" />
                  <p>Sauna</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Wifi className="w-6 h-6" />
                  <p>Wi-Fi</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Utensils className="w-6 h-6" />
                  <p>Breakfast</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Coffee className="w-6 h-6" />
                  <p>Coffee Maker</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <WashingMachine className="w-6 h-6" />
                  <p>Hair Dryer</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Smartphone className="w-6 h-6" />
                  <p>Free-to-use Smartphone</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <Tv className="w-6 h-6" />
                  <p>Widescreen TV</p>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <AirVent className="w-6 h-6" />
                  <p>Air Conditioner</p>
                </div>
              </div>
            </div>
  
            {/* Room Reviews Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Room Reviews</h2>
              <div className="border p-6 rounded-md">
                <div className="flex items-start space-x-4">
                  <Image
                    src="/images/image1.jpg"
                    alt="Reviewer Avatar"
                    className="w-16 h-16 rounded-full object-cover"
                    width={50}
                    height={50}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <Star className="w-5 h-5 text-yellow-500" />
                        <Star className="w-5 h-5 text-yellow-500" />
                        <Star className="w-5 h-5 text-yellow-500" />
                        <Star className="w-5 h-5 text-gray-300" />
                      </div>
                    </div>
                    <p className="font-semibold text-lg">Felecia Lawson - Paris, France</p>
                    <p className="text-gray-600">Everything was absolutely great, staff were excellent and helpful. Room was spacious and clean. Breakfast was great.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Section - Booking form */}
          <div className="lg:col-span-1 bg-white px-10">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Book Your Room</h2>
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="checkin" className="block text-gray-600 mb-2">
                    Check In/Out
                  </label>
                  <input
                    type="text"
                    id="checkin"
                    placeholder="Check In → Check Out"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-gray-600 mb-2">
                    Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    min="1"
                    placeholder="Guests 1"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <button className="bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-500 transition duration-300">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  