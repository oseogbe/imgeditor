import GalleryLayout from "@/layouts/gallery-layout";
import { Image } from "@/types";
import { Head } from "@inertiajs/react";

const ImageGallery = ({ images }: { images: Image[] }) => {
    return (
        <GalleryLayout>
            <Head title="Gallery">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
                {images.map((image) => (
                    <div key={image.id} className="flex flex-col items-center space-y-4">
                        <div className="flex space-x-2">
                            {/* Original Image */}
                            <div className="w-1/2 h-fit shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={image.original_image}
                                    alt="Original Image"
                                    className="w-full object-cover rounded-lg"
                                />
                            </div>
                            {/* Edited Image */}
                            <div className="w-1/2 h-fit shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={image.cropped_image}
                                    alt="Edited Image"
                                    className="w-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </GalleryLayout>
    );
};

export default ImageGallery;