"use client";

import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
// import { useRouter } from "next/navigation";

interface SubscribeFormProps {
    price: number;
    planName: string;
}

export function SubscribeForm({ price, planName }: SubscribeFormProps) {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
    // const router = useRouter();

    // 1. Запрос на создание платежа
    const createPayment = async () => {
        setIsLoading(true);
        try {
            // Тут твой реальный запрос к API
            // const res = await fetch('/api/subscription/create');
            // const { qrLink, orderId } = await res.json();

            setQrCode("https://www.sberbank.com/sms/pbpn?requisiteNumber=79171305378"); // Заглушка
            setStatus("pending");
        } catch (e) {
            setStatus("error");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Функция проверки статуса (Polling)
    const checkStatus = useCallback(async () => {
        if (status !== "pending") return;

        try {
            // const res = await fetch('/api/subscription/check-status');
            // if (res.data.paid) {
            //    setStatus("success");
            //    router.refresh(); // Обновляем данные сервера (куки)
            //    router.push('/'); // Улетаем на главную
            // }
        } catch (e) {
            console.error("Ошибка проверки статуса");
            console.error(e);
        }
    }, [status]);
    // }, [status, router]);

    // Запускаем проверку каждые 3 секунды, если ждем оплату
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === "pending") {
            interval = setInterval(checkStatus, 3000);
        }
        return () => clearInterval(interval);
    }, [status, checkStatus]);

    return (
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">{planName}</h2>
                <p className="text-3xl font-black mt-2 text-blue-600">{price} ₽</p>
            </div>

            {!qrCode ? (
                <button
                    onClick={createPayment}
                    disabled={isLoading}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Генерация счета..." : "Оплатить по QR-коду"}
                </button>
            ) : (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-white p-3 border-2 border-slate-100 rounded-xl mb-4">
                        <QRCodeSVG value={qrCode} size={200} />
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-slate-700">
                            Отсканируйте код в приложении банка
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            <span className="text-xs text-slate-500">Ожидание подтверждения...</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setQrCode(null)}
                        className="mt-6 text-xs text-slate-400 hover:text-slate-600 underline"
                    >
                        Отмена
                    </button>
                </div>
            )}

            {status === "error" && (
                <p className="text-red-500 text-xs text-center mt-4">
                    Произошла ошибка. Попробуйте позже.
                </p>
            )}
        </div>
    );
}