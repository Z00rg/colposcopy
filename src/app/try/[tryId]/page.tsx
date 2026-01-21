import { ViewingTry } from "@/features/try";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Просмотр попытки",
    description: "Просмотр попытки по тестированию",
};

export default function TryDetailPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Отображение выбранной попытки */}
            <ViewingTry />
        </div>
    );
}
