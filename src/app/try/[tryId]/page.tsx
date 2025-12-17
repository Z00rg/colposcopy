import { ViewingTry } from "@/features/try";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Просмотр попытки",
};

export default function TryDetailPage() {
    return (
        <div className="flex flex-col w-full">
            <ViewingTry />
        </div>
    );
}
