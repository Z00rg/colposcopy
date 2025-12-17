import { Case } from "@/features/clinical-case/ui/case";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Клинический кейс",
};

export default function CasePage() {
    return (
        <div className="flex flex-col w-full">
            <Case />
        </div>
    );
}
