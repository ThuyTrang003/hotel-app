/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-gallery-carousel/dist/index.css';
import Carousel from 'react-gallery-carousel';
import { useEffect, useState } from "react";
import RestClient from "../utils/api-function";

export default function CarouselImage({ roomId }: { roomId: string }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchRoomImages = async () => {
            try {
                const restClient = new RestClient();
                restClient.service("type-rooms");
                const roomTypeData = await restClient.get(roomId);

                if (roomTypeData?.images) {
                    const formattedImages = roomTypeData.images.map((imageUrl: string) => ({
                        src: imageUrl,
                    }));
                    setImages(formattedImages);
                }
            } catch (error) {
                console.error("Error fetching room images:", error);
            }
        };

        if (roomId) {
            fetchRoomImages();
        }
    }, [roomId]);

    return (
        <div className="w-full bg-[#F5F3F0] py-8 mt-16 flex justify-center items-center">
            <div>
                <Carousel
                    images={images}
                    hasSizeButton={false}
                    hasMediaButton={false}
                    hasIndexBoard={false}
                    isLoop
                    canAutoPlay
                    isAutoPlaying={true}
                    style={{ height: '700px', width: '100%' }}
                />
            </div>
        </div>
    );
}
