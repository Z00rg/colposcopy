import { UiScrollImg } from "@/shared/ui/ui-scroll-img";

export default function Loading() {
    return (
        <div className="flex flex-col w-full gap-3 flex-1 mb-4 px-5 mt-5">
            {/* Скелетон прогресс-бара */}
            <div className="w-1/2 mx-auto h-12 bg-gray-300 rounded-2xl animate-pulse"></div>

            {/* Скелетон изображения */}
            <UiScrollImg img={[]} height="h-[28svh]" isLoading={true} />

            {/* Скелетон текстовой области с вопросами */}
            <div className="mt-5 w-full h-[34svh] bg-[#F1F1F1] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] pt-3 px-[17px] flex flex-col gap-3 animate-pulse">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mt-3"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="flex items-center gap-3 mt-4">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-4 bg-gray-300 rounded"></div>
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}