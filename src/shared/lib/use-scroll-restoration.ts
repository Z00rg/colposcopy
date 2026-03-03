"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useScrollRestoration(key: string) {
    const ref = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const storageKey = `scroll-restoration:${key}`;

    // Восстановление положения скролла
    useIsomorphicLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const saved = sessionStorage.getItem(storageKey);
        if (saved !== null) {
            el.scrollTop = parseInt(saved, 10);
        }
    }, [storageKey]);

    // Сохранение скролла
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            sessionStorage.setItem(storageKey, String(el.scrollTop));
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, [storageKey]);

    // Сбрасываем при смене маршрута
    useEffect(() => {
        return () => {
        };
    }, [pathname]);

    return ref;
}