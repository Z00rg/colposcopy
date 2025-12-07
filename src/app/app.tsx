import type { AppProps } from "next/app";
import { AppProvider } from "./app-provider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
export function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
        {/* Desktop Background Elements - only show on lg and above */}
        <div className="absolute inset-0 -z-10 hidden lg:block">
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

        {/* Desktop Header - only show on lg and above */}
        <header className="lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-4 hidden">
          <div className="text-2xl font-bold">AppName</div>
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-gray-600 transition-colors">Главная</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Атлас</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Профиль</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-[#B8D3F9] rounded-lg hover:bg-[#a0c0e5] transition-colors">
              Войти
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">
          {/* Mobile-style container for small screens, full width for desktop */}
          <div className="flex-grow lg:flex lg:justify-center lg:items-start lg:pt-12">
            <div className="w-full lg:w-auto">
              {/* Mobile view: constrained width with rounded borders */}
              <div className="lg:hidden min-h-screen w-full relative">
                <div className="absolute inset-0 -z-10">
                  {/* Mobile background elements */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     h-[338px] w-[754px] rounded-full bg-[#B8D3F9] blur-[100px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     h-[620px] w-[754px] rounded-full bg-[#E4E4E4] blur-[100px]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                     h-[338px] w-[754px] rounded-full bg-[#B8D3F9] blur-[100px]" />
                </div>
                <div className="relative z-10">
                  <Component {...pageProps} />
                </div>
              </div>
              
              {/* Desktop view: full content area with better layout */}
              <div className="hidden lg:block bg-white/90 backdrop-blur-sm rounded-[44px] border-[3px] border-black shadow-xl shadow-black/30 overflow-hidden min-h-[500px] w-full max-w-6xl">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation - only show on small screens */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6">
          <div className="flex justify-around">
            <a href="#" className="flex flex-col items-center text-blue-500">
              <span>Главная</span>
            </a>
            <a href="#" className="flex flex-col items-center text-gray-500">
              <span>Атлас</span>
            </a>
            <a href="#" className="flex flex-col items-center text-gray-500">
              <span>Профиль</span>
            </a>
          </div>
        </nav>
      </div>
    </AppProvider>
  );
}
