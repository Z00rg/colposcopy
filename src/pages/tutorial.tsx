import { Tutorial } from "@/features/tutorial";
import Head from "next/head";

export function TutorialPage() {
    return (<div className="flex flex-col w-full min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Обучение</title>
      </Head>
      <Tutorial/>
    </div>)
}