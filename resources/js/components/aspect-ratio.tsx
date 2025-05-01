import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const AspectRatio = ({ onAspectRatioChange }: { onAspectRatioChange: (ratio: number) => void }) => {
    const [selectedRatio, setSelectedRatio] = useState<number>(1); // Default to 1:1

    const handleRatioChange = (ratio: number) => {
        setSelectedRatio(ratio);
        onAspectRatioChange(ratio);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="bg-white p-3 shadow-md rounded-lg text-xs cursor-pointer">Aspect Ratio</Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-gray-900">Change Aspect Ratio</DrawerTitle>
                        <DrawerDescription>Select an aspect ratio for cropping</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleRatioChange(1)}
                                className={`px-4 py-2 rounded-lg ${selectedRatio === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                1:1
                            </button>
                            <button
                                onClick={() => handleRatioChange(16 / 9)}
                                className={`px-4 py-2 rounded-lg ${selectedRatio === 16 / 9 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                16:9
                            </button>
                            <button
                                onClick={() => handleRatioChange(4 / 3)}
                                className={`px-4 py-2 rounded-lg ${selectedRatio === 4 / 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                4:3
                            </button>
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default AspectRatio;