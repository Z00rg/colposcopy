import type { AppProps } from "next/app";
import { AppProvider } from "./app-provider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
export function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div
        className={`relative min-h-screen overflow-hidden lg:flex lg:justify-center lg:items-center ${montserrat.className}`}
      >
        <div className="absolute inset-0 -z-10">
          {/* Верхний овал */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
               h-[338px] w-[754px] lg:h-[550px] lg:w-[900px] rounded-full bg-[#B8D3F9] blur-[100px]"
          />
          {/* Средний овал */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               h-[620px] w-[754px] rounded-full bg-[#E4E4E4] blur-[100px]"
          />
          {/* Нижний овал */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
               h-[338px] w-[754px] lg:h-[550px] lg:w-[900px] rounded-full bg-[#B8D3F9] blur-[100px]"
          />
        </div>
        <div className="lg:min-h-[667px] lg:max-h-[956px] lg:w-[600px] lg:rounded-[44px] lg:border-[3px] lg:border-black lg:shadow-xl lg:shadow-black/30 lg:overflow-auto relative">
          <Component {...pageProps} />
        </div>
      </div>
    </AppProvider>
  );
}
