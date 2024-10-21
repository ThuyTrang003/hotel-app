import 'react-gallery-carousel/dist/index.css';
import Carousel from 'react-gallery-carousel';
import image1 from '@/features/room/assets/images/image1.jpg';
import image2 from '@/features/room/assets/images/image2.jpg';
import image3 from '@/features/room/assets/images/image3.jpg';

export default function CarouselImage() {
    const images = [
        { src: image1.src },
        { src: image2.src },
        { src: image3.src },
        { src: image1.src }, 
        { src: image2.src },
        { src: image2.src },
    ];

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
