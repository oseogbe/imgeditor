import { Link, usePage } from "@inertiajs/react";
import { Step } from "@/types";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { currentStep = 1, photoId = '' } = usePage<{ currentStep?: number; photoId?: string }>().props;

    const steps: Step[] = [
        { id: 1, name: 'Upload a Photo', href: '/photos' },
        { id: 2, name: 'Edit Photo', href: photoId && `/photos/edit/${photoId}` },
        { id: 3, name: 'Finish', href: photoId && `/photos/finish/${photoId}` },
    ];

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
            <div className="flex w-full items-center justify-center lg:grow">
                <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                    <div className="w-full rounded-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-lg lg:p-20">
                        <ol className="lg:flex items-center w-full space-y-4 lg:space-y-0 lg:space-x-4">
                            {steps.map((step, idx) => {
                                const status =
                                    step.id < currentStep ? "complete" : step.id === currentStep ? "current" : "upcoming";

                                let circleClasses = "w-6 h-6 flex items-center justify-center mr-3 text-sm rounded-full ";
                                let textClasses = "text-base font-medium ";
                                let iconStroke = "stroke-gray-900";

                                if (["current", "complete"].includes(status)) {
                                    circleClasses += "bg-indigo-600 text-white border-transparent";
                                    textClasses += "text-indigo-600";
                                    iconStroke = "stroke-indigo-600";
                                } else {
                                    circleClasses += "bg-gray-50 text-gray-900 border border-gray-200";
                                    textClasses += "text-gray-900";
                                }

                                const isLinkDisabled = step.id > currentStep;

                                return (
                                    <li key={idx} className="relative flex items-center w-full lg:w-auto">
                                        {isLinkDisabled ? (
                                            <span className="flex items-center w-full opacity-50">
                                                <span className={circleClasses}>{step.id}</span>
                                                <div className="block">
                                                    <h4 className={textClasses}>{step.name}</h4>
                                                </div>
                                            </span>
                                        ) : (
                                            <Link href={step.href} className="flex items-center w-full">
                                                <span className={circleClasses}>{step.id}</span>
                                                <div className="block">
                                                    <h4 className={textClasses}>{step.name}</h4>
                                                </div>
                                            </Link>
                                        )}
                                        {idx < steps.length - 1 && (
                                            <svg
                                                className={`w-5 h-5 ml-2 ${iconStroke} sm:ml-4`}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 18L9.67462 13.0607C10.1478 12.5607 10.3844 12.3107 10.3844 12C10.3844 11.6893 10.1478 11.4393 9.67462 10.9393L5 6M12.6608 18L17.3354 13.0607C17.8086 12.5607 18.0452 12.3107 18.0452 12C18.0452 11.6893 17.8086 11.4393 17.3354 10.9393L12.6608 6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>

                        <div className="mt-8 lg:mt-12">{children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
}