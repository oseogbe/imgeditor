import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import AppLayout from '@/layouts/app-layout';
import AspectRatio from '@/components/aspect-ratio';
import PhotoFilters from '@/components/filters';

export default function EditPhoto({ imageId }: { imageId: string }) {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const cropperRef = useRef<Cropper | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (imageRef.current) {
            cropperRef.current?.destroy(); // Ensure previous instance is destroyed
            cropperRef.current = new Cropper(imageRef.current, {
                aspectRatio: 1,
                viewMode: 1,
                movable: true,
                zoomable: false,
                scalable: true,
            });
        }

        return () => {
            cropperRef.current?.destroy();
        };
    }, [imageId]);

    const handleAspectRatioChange = (ratio: number) => {
        if (cropperRef.current) {
            cropperRef.current.setAspectRatio(ratio);
        }
    };

    const handleApplyFilter = (filter: string) => {
        if (!imageRef.current) return;

        router.visit(route('photos.applyFilter', { id: imageId }), {
            method: 'post',
            data: { filter },
            preserveScroll: true,
            preserveState: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
        });
    };

    const cropAndUpload = () => {
        if (!cropperRef.current) return;

        cropperRef.current.getCroppedCanvas().toBlob(blob => {
            router.post(route('photos.finish', { id: imageId }), { croppedImage: blob }, {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
            });
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Image">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="relative flex flex-col sm:flex-row w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <div className='mb-6 sm:absolute top-0 left-0 flex flex-col gap-y-4'>
                    <AspectRatio onAspectRatioChange={handleAspectRatioChange} />
                    <PhotoFilters onApplyFilter={handleApplyFilter} />
                </div>
                <div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-full shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] rounded-lg overflow-hidden">
                            <img
                                src={`/storage/original/${imageId}`}
                                ref={imageRef}
                                alt="image to edit"
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
