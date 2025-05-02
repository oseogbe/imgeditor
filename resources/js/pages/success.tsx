import { Alert } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

type PageProps = {
    flash: {
        message?: string;
    },
    image: {
        original_image: string,
        cropped_image: string
    }
};

export default function Success() {
    const { flash, image } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <Head title="Success">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {flash.message && (
                <Alert variant="success" className="flex mb-4">
                    <CheckCircle />
                    {flash.message}
                </Alert>
            )}
            <div className="flex items-center justify-center">
                <div className="flex flex-col lg:flex-row gap-8 mb-8 lg:mb-12">
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-center mb-4">Original Image</h2>
                        <img
                            src={image.original_image}
                            alt="Original"
                            className="rounded-md shadow object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-center mb-4">New Image</h2>
                        <img
                            src={image.cropped_image}
                            alt="edited"
                            className="rounded-md shadow object-cover"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}