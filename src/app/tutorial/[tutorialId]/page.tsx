import { Tutorial } from "@/features/tutorial";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Обучение",
};

export default function TutorialPage() {
    return (<div className="flex flex-col w-full">
        <Tutorial/>
    </div>)
}