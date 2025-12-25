import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Клинический кейс",
};

export default function MenuLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        {children}
    );
}