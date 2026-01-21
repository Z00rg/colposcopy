import {Montserrat} from 'next/font/google';
import './globals.css';
import {AppProvider} from '@/shared/lib/app-provider';
import {Metadata} from "next";

const montserrat = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
    title: {
        default: "Атлас кольпоскопии",
        template: "%s — Атлас кольпоскопии",
    },
    description: "Интерактивное учебное пособие по кольпоскопии",
    applicationName: "Атлас кольпоскопии",
    appleWebApp: {
        title: "Атлас кольпоскопии",
        capable: true,
    },
    icons: {
        apple: "/apple-icon.png",
    },

    // OpenGraph preview
    openGraph: {
        title: "Атлас кольпоскопии",
        description: "Интерактивное учебное пособие по кольпоскопии",
        type: "website",
        url: "https://atlascolposcopy.ru/",
        images: [
            {
                url: "https://atlascolposcopy.ru/og-atlas.png",
                width: 1200,
                height: 630,
                alt: "Атлас кольпоскопии",
            },
        ],
    },


    manifest: "/manifest.webmanifest",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={montserrat.className}>
        <AppProvider>
            <div
                className={`relative overflow-hidden lg:flex lg:justify-center lg:items-center`}
            >
                <div className="absolute inset-0 -z-10">
                    {/* Верхний овал */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
               h-84.5 w-188.5 lg:h-137.5 lg:w-225 rounded-full bg-[#B8D3F9] blur-[100px]"
                    />
                    {/* Средний овал */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               h-155 w-188.5 rounded-full bg-[#E4E4E4] blur-[100px]"
                    />
                    {/* Нижний овал */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
               h-84.5 w-188.5 lg:h-137.5 lg:w-225 rounded-full bg-[#B8D3F9] blur-[100px]"
                    />
                </div>
                <div className="lg:w-[28svw] lg:shadow-xl lg:h-svh lg:overflow-y-auto relative min-h-svh">
                    {children}
                </div>
            </div>
        </AppProvider>
        </body>
        </html>
    );
}