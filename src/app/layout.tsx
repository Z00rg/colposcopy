import { Montserrat } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/shared/lib/app-provider';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={montserrat.className}>
        <AppProvider>
            <div className="relative overflow-hidden lg:flex lg:justify-center lg:items-center min-h-screen">
                {/* Фоновые градиенты */}
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-gray-50 via-white to-blue-50">
                    {/* Верхний овал */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                  h-84.5 w-188.5 lg:h-150 lg:w-250
                  rounded-full bg-linear-to-br from-blue-200/40 to-blue-300/30
                  blur-[120px] animate-pulse-slow"
                    />
                    {/* Средний овал */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  h-155 w-188.5 lg:h-175 lg:w-225
                  rounded-full bg-linear-to-br from-gray-200/20 to-gray-300/20
                  blur-[100px]"
                    />
                    {/* Нижний овал */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                  h-84.5 w-188.5 lg:h-150 lg:w-250
                  rounded-full bg-linear-to-br from-blue-200/40 to-indigo-300/30
                  blur-[120px] animate-pulse-slow"
                    />
                </div>

                {/* Контейнер приложения */}
                <div className="lg:w-[28svw] lg:h-svh lg:overflow-y-auto lg:rounded-2xl lg:shadow-2xl lg:border lg:border-white/20 relative min-h-svh bg-white/80 lg:bg-white/90 backdrop-blur-sm">
                    {children}
                </div>
            </div>
        </AppProvider>
        </body>
        </html>
    );
}