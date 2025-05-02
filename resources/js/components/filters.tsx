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
import { useState } from "react";

const PhotoFilters = ({ onApplyFilter }: { onApplyFilter: (filter: string) => void }) => {
    const [selectedFilter, setSelectedFilter] = useState<string | null>("original"); // Default to "Original"

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
        onApplyFilter(filter);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="bg-white p-3 shadow-md rounded-lg text-xs cursor-pointer">Filters</Button>
            </DrawerTrigger>
            <DrawerContent className="bg-white">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-gray-900">Add Filters</DrawerTitle>
                        <DrawerDescription>Select a filter to apply</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleFilterClick("original")}
                                className={`px-4 py-2 rounded-lg ${selectedFilter === "original" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                Original
                            </button>
                            <button
                                onClick={() => handleFilterClick("grayscale")}
                                className={`px-4 py-2 rounded-lg ${selectedFilter === "grayscale" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                Grayscale
                            </button>
                            <button
                                onClick={() => handleFilterClick("brightness")}
                                className={`px-4 py-2 rounded-lg ${selectedFilter === "brightness" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                Brightness
                            </button>
                            <button
                                onClick={() => handleFilterClick("contrast")}
                                className={`px-4 py-2 rounded-lg ${selectedFilter === "contrast" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                Contrast
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

export default PhotoFilters;