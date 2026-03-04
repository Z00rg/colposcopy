"use client";

// import { useState } from "react";
import { UiHeader } from "@/shared/ui/ui-header";
// import { SubscribeForm } from "@/features/subscribe";
import {SignOutButton} from "@/features/auth";

// const PLANS = [
//     {
//         months: 1,
//         price: 300,
//         label: "1 месяц",
//         badge: null,
//         pricePerMonth: 300,
//     },
//     {
//         months: 3,
//         price: 750,
//         label: "3 месяца",
//         badge: "−17%",
//         pricePerMonth: 250,
//     },
//     {
//         months: 6,
//         price: 1200,
//         label: "6 месяцев",
//         badge: "−33%",
//         pricePerMonth: 200,
//     },
//     {
//         months: 12,
//         price: 1800,
//         label: "12 месяцев",
//         badge: "Выгоднее всего",
//         pricePerMonth: 150,
//     },
// ];

export default function SubscribePage() {
    // const [selected, setSelected] = useState(PLANS[3]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-slate-50">
            <UiHeader variant="logo" />

            <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-lg mx-auto">
                {/*<div className="mb-8 text-center leading-tight">*/}
                {/*    <h1 className="text-3xl font-extrabold text-slate-900">Почти готово!</h1>*/}
                {/*    <p className="text-slate-500 mt-2">Выберите план и активируйте аккаунт</p>*/}
                {/*</div>*/}

                {/*/!* Plan selector *!/*/}
                {/*<div className="w-full grid grid-cols-2 gap-3 mb-6">*/}
                {/*    {PLANS.map((plan) => {*/}
                {/*        const isActive = selected.months === plan.months;*/}
                {/*        return (*/}
                {/*            <button*/}
                {/*                key={plan.months}*/}
                {/*                onClick={() => setSelected(plan)}*/}
                {/*                className={[*/}
                {/*                    "relative flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all duration-150 text-left cursor-pointer",*/}
                {/*                    isActive*/}
                {/*                        ? "border-blue-600 bg-blue-50 shadow-md"*/}
                {/*                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm",*/}
                {/*                ].join(" ")}*/}
                {/*            >*/}
                {/*                {plan.badge && (*/}
                {/*                    <span*/}
                {/*                        className={[*/}
                {/*                            "absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap",*/}
                {/*                            plan.badge === "Выгоднее всего"*/}
                {/*                                ? "bg-emerald-500 text-white"*/}
                {/*                                : "bg-slate-800 text-white",*/}
                {/*                        ].join(" ")}*/}
                {/*                    >*/}
                {/*                        {plan.badge}*/}
                {/*                    </span>*/}
                {/*                )}*/}

                {/*                <span*/}
                {/*                    className={[*/}
                {/*                        "text-sm font-semibold mb-1",*/}
                {/*                        isActive ? "text-blue-700" : "text-slate-600",*/}
                {/*                    ].join(" ")}*/}
                {/*                >*/}
                {/*                    {plan.label}*/}
                {/*                </span>*/}

                {/*                <span*/}
                {/*                    className={[*/}
                {/*                        "text-2xl font-black",*/}
                {/*                        isActive ? "text-blue-600" : "text-slate-900",*/}
                {/*                    ].join(" ")}*/}
                {/*                >*/}
                {/*                    {plan.price} ₽*/}
                {/*                </span>*/}

                {/*                <span className="text-[11px] text-slate-400 mt-0.5">*/}
                {/*                    {plan.pricePerMonth} ₽/мес*/}
                {/*                </span>*/}

                {/*                {isActive && (*/}
                {/*                    <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">*/}
                {/*                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">*/}
                {/*                            <path*/}
                {/*                                d="M1 3.5L3.5 6L8 1"*/}
                {/*                                stroke="white"*/}
                {/*                                strokeWidth="1.5"*/}
                {/*                                strokeLinecap="round"*/}
                {/*                                strokeLinejoin="round"*/}
                {/*                            />*/}
                {/*                        </svg>*/}
                {/*                    </span>*/}
                {/*                )}*/}
                {/*            </button>*/}
                {/*        );*/}
                {/*    })}*/}
                {/*</div>*/}

                {/*/!* Savings callout *!/*/}
                {/*{selected.months > 1 && (*/}
                {/*    <div className="w-full mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">*/}
                {/*        <p className="text-sm text-emerald-700 font-medium">*/}
                {/*            Экономия{" "}*/}
                {/*            <span className="font-black">*/}
                {/*                {(PLANS[0].price * selected.months - selected.price)} ₽*/}
                {/*            </span>{" "}*/}
                {/*            по сравнению с ежемесячной оплатой*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*/!* Payment form *!/*/}
                {/*<SubscribeForm*/}
                {/*    key={selected.months}*/}
                {/*    price={selected.price}*/}
                {/*    planName={`Подписка на ${selected.label}`}*/}
                {/*/>*/}

                <div className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-8 flex flex-col items-center gap-3 shadow-sm text-center">
                    <span className="text-4xl">🛠️</span>
                    <p className="text-lg font-bold text-slate-800">Оплата в разработке</p>
                    <p className="text-sm text-slate-500 max-w-[260px] leading-relaxed">
                        Мы уже работаем над этим. Скоро здесь появится возможность оформить подписку.
                    </p>
                </div>

                <div>
                    <SignOutButton className="mt-5"/>
                </div>

                {/*<footer className="mt-10 text-[10px] text-slate-400 max-w-[300px] text-center">*/}
                {/*    Нажимая кнопку оплаты, вы соглашаетесь с условиями сервиса и правилами возврата средств.*/}
                {/*</footer>*/}
            </main>
        </div>
    );
}