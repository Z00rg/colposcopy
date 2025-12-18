import {UiHeader} from "@/shared/ui/ui-header";

export default function MenuLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className=
                "flex flex-col w-full"
        >
            <UiHeader variant="withoutLogo" />

            <div className="flex flex-col w-full flex-1">
                <div className="px-5">
                    {children}
                </div>
            </div>
        </div>
    );
}