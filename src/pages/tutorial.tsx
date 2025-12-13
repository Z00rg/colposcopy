import { Tutorial } from "@/features/tutorial";
import Head from "next/head";

export function TutorialPage() {
    return (<div className="flex flex-col w-full">
      <Head>
        <title>Обучение</title>
      </Head>
      <Tutorial/>
    </div>)
}