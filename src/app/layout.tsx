import {Montserrat} from 'next/font/google';
import './globals.css';
import {AppProvider} from '@/shared/lib/app-provider';

const montserrat = Montserrat({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={montserrat.className}>
        <AppProvider>
            <div
                className={`relative overflow-hidden lg:flex lg:justify-center lg:items-center`}
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
                <div className="lg:w-[28svw] lg:shadow-xl lg:h-[100svh] lg:overflow-y-auto relative min-h-svh">
                    {children}
                </div>
            </div>
        </AppProvider>
        </body>
        </html>
    );
}