import { Head, router } from '@inertiajs/react';
import AppLayout from '../layouts/app-layout';
import { useRef, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function UploadPhoto() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [progress, setProgress] = useState<number>(0);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const formData = new FormData();
            formData.append('image', file);
            router.post('/photos', formData, {
                onProgress: (event) => {
                    if (event?.total) {
                        setProgress(Math.round((event.loaded * 100) / event.total));
                    }
                },
            });
        } else {
            alert('Please select a valid image file.');
        }
    };

    return (
        <AppLayout>
            <Head title="Upload a Photo">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                <div className="flex-1 rounded-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-lg lg:p-20">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div
                            className="w-32 h-32 rounded-full bg-white shadow flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <PlusIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />
                        <p className="text-gray-400 lg:text-base">Click to select an image</p>

                        {progress > 0 && progress < 100 && (
                            <Progress value={progress} className="w-full max-w-xs" />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
