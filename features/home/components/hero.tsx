"use client";

const Hero = () => {
    return (
        <section className="relative flex h-auto min-h-screen w-full" id="home">
            <div className="absolute bottom-0 top-0 z-10 h-full w-full"></div>

            <video
                src="/videos/video.mp4"
                muted
                autoPlay
                loop
                className="absolute bottom-0 top-0 z-0 h-full w-full object-cover"
            ></video>
            <div className="absolute z-30 m-auto flex h-max w-full flex-col justify-center gap-y-3 pb-12 pt-28 lg:pb-24 lg:pt-64">
                <div className="px-0 py-8 text-center text-white">
                    <h1 className="mb-4 text-5xl font-bold">
                        Welcome to Our Website
                    </h1>
                    <p className="text-2xl">
                        Discover amazing content with us!
                    </p>
                </div>
                <div className="mx-5 mt-20">
                    <div className="flex flex-col gap-6 rounded-xl bg-white px-0 py-10 md:flex-row md:gap-x-12 md:px-0">
                        <div className="flex w-full flex-col xl:px-6">
                            <label
                                htmlFor="checkInDate"
                                className="pb-2 text-black"
                            >
                                Checkin date:
                            </label>
                            <div>
                                <input
                                    type="date"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex w-full flex-col xl:px-6">
                            <label
                                htmlFor="checkOutDate"
                                className="pb-2 text-black"
                            >
                                Checkout date:
                            </label>
                            <div>
                                <input
                                    type="date"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex w-full flex-col xl:px-6">
                            <label
                                htmlFor="roomType"
                                className="pb-2 text-black"
                            >
                                Room type:
                            </label>
                            <div className="relative">
                                <select
                                    id="roomType"
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-[9px] pr-8 outline-none"
                                    style={{
                                        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /%3E%3C/svg%3E')`,
                                        backgroundPosition:
                                            "right 0.75rem center",
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
                        <div className="flex w-full flex-col justify-end xl:px-6">
                            <button className="bg-amber-1 hover:bg-amber-1/80 w-full rounded-lg px-8 py-[10px] text-white transition-colors duration-300">
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
