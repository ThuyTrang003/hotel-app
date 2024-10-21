"use client";


const Hero = () => {
  return (
    <section
      className=" w-full h-auto relative flexCenter min-h-screen"
      id="home"
    >
      <div className="absolute h-full w-full bg-[#2f6a7f2f] top-0 bottom-0 z-10"></div>

      <video
        src='/videos/video.mp4'
        muted
        autoPlay
        loop
        className="absolute top-0 bottom-0 h-full w-full object-cover z-0"
      ></video>
      <div className="absolute w-full h-max pt-28 pb-12 flex gap-y-3 flex-col justify-center m-auto z-30 lg:pt-64 lg:pb-24">
        <div className="px-0 py-8 text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-2xl">Discover amazing content with us!</p>
        </div>
        <div className="mt-20 mx-5">
          <div className="flex flex-col md:flex-row gap-6 md:gap-x-12 px-0 md:px-0 py-10 bg-white rounded-xl">
            <div className="flex flex-col w-full xl:px-6">
              <label htmlFor="checkInDate" className="text-black pb-2">
                Checkin date:
              </label>
              <div>
                <input
                  type="date"
                  className="bg-white outline-none w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              </div>
            </div>
            <div className="flex flex-col w-full xl:px-6">
              <label htmlFor="checkOutDate" className="text-black pb-2">
                Checkout date:
              </label>
              <div>
                <input
                  type="date"
                  className="bg-white outline-none w-full rounded-lg border border-gray-300 px-4 py-2"
                />
              </div>
            </div>
            <div className="flex flex-col w-full xl:px-6">
              <label htmlFor="roomType" className=" text-black pb-2">
                Room type:
              </label>
              <div className="relative">
                <select
                  id="roomType"
                  className="bg-white outline-none w-full rounded-lg border border-gray-300 px-4 py-[9px] appearance-none pr-8"
                  style={{
                    backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /%3E%3C/svg%3E')`,
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.5rem",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <option value="single">Single Room</option>
                  <option value="double">Double Room</option>
                  <option value="suite">Suite</option>
                  <option value="family">Family Room</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-end w-full xl:px-6">
              <button className="bg-[#d9af63] text-white px-8 py-[10px] rounded-lg w-full hover:bg-[#c89d55] transition-colors duration-300">
                CHECK AVAILABILITY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
