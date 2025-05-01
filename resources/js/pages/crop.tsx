import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import AppLayout from '@/layouts/app-layout';
import AspectRatio from '@/components/aspect-ratio';

export default function CropPhoto({ originalImageId }: { originalImageId: string }) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const cropperRef = useRef<Cropper | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (imageRef.current) {
            cropperRef.current = new Cropper(imageRef.current, {
                aspectRatio: 1, // Default aspect ratio
                viewMode: 1,
                movable: true,
                zoomable: false,
                scalable: true,
            });
        }
        return () => {
            cropperRef.current?.destroy();
        };
    }, []);

    const handleAspectRatioChange = (ratio: number) => {
        if (cropperRef.current) {
            cropperRef.current.setAspectRatio(ratio);
        }
    };

    const cropAndUpload = () => {
        if (!cropperRef.current) return;

        cropperRef.current.getCroppedCanvas().toBlob(blob => {
            router.post(route('photos.finish', { id: originalImageId }), { croppedImage: blob }, {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
            });
        });
    };

    return (
        <AppLayout>
            <Head title="Crop">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="relative flex flex-col sm:flex-row w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <div className='mb-6 sm:absolute top-0 left-0 w-auto shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] rounded-lg'>
                    <AspectRatio onAspectRatioChange={handleAspectRatioChange} />
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-full shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] rounded-lg overflow-hidden">
                            <img
                                src={`/storage/original/${originalImageId}`}
                                ref={imageRef}
                                alt="Crop"
                                className="max-w-md max-h-md rounded-md shadow"
                            />
                        </div>
                        <button
                            onClick={cropAndUpload}
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Uploading...' : 'Crop & Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
