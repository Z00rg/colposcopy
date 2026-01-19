import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Админ-панель",
};

export default function MenuLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        {children}
    </>;
}