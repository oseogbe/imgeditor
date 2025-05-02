import { Link } from "@inertiajs/react";

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#FDFDFC]">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-indigo-600">
                        ImgEditor
                    </Link>
                    {/* Navigation */}
                    <nav>
                        <Link
                            href="/photos"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                        >
                            Upload Photo
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-grow items-center p-6 lg:justify-center lg:p-8">
                <div className="w-full max-w-[335px] lg:max-w-7xl">
                    <div className="mt-8 lg:mt-12">{children}</div>
                </div>
            </main>
        </div>
    );
}