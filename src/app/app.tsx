import type { AppProps } from "next/app";
import { AppProvider } from "./app-provider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
export function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className={`relative min-h-screen overflow-hidden ${montserrat.className}`}>
        <div className="absolute inset-0 -z-10">
          {/* Верхний овал */}
          <div
            className="absolute top-[-169px] h-[338px] w-[754px] rounded-full bg-[#C1D5F1] blur-[100px] 
            left-1/2 -translate-x-1/2" // <-- Изменено
          />
          {/* Средний овал */}
          <div
            className="absolute top-[131px] h-[620px] w-[754px] rounded-full bg-[#E4E4E4] blur-[100px]
            left-1/2 -translate-x-1/2" // <-- Изменено
          />
          {/* Нижний овал */}
          <div
            className="absolute top-[763px] h-[338px] w-[754px] rounded-full bg-[#B8D3F9] blur-[100px]
            left-1/2 -translate-x-1/2" // <-- Изменено
          />
        </div>
        
        <Component {...pageProps} />
      </div>
    </AppProvider>
  );
}
