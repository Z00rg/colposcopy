import { UiHeader } from "@/shared/ui/ui-header";
import { SubscribeForm } from "@/features/subscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Подписка",
    robots: { index: false, follow: false },
};

export default function SubscribePage() {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <UiHeader variant="logo" />

            <main className="flex-1 flex flex-col items-center justify-center p-4 w-full">
                <div className="mb-8 text-center leading-tight">
                    <h1 className="text-3xl font-extrabold text-slate-900">Почти готово!</h1>
                    <p className="text-slate-500 mt-2">Активируйте аккаунт, чтобы начать работу</p>
                </div>

                {/* Вызов нашей фичи */}
                <SubscribeForm
                    price={490}
                    planName="Плати деньги"
                />

                <footer className="mt-12 text-[10px] text-slate-400 max-w-[300px] text-center">
                    Нажимая кнопку оплаты, вы соглашаетесь с условиями сервиса и правилами возврата средств.
                </footer>
            </main>
        </div>
    );
}
