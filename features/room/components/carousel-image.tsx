import 'react-gallery-carousel/dist/index.css';
import Carousel from 'react-gallery-carousel';

export default function CarouselImage() {
    const images = [
        { src: '/image1.jpg' },
        { src: '/image1.jpg' },
        { src:'/image1.jpg' },
        { src: '/image1.jpg' }, 
        { src: '/image1.jpg' },
        { src: '/image1.jpg' },
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
