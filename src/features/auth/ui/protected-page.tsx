import { getCookie } from "@/shared/api/api-instance";
import { ROUTES } from "@/shared/constants/routes";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";

export function protectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsClient(true);

      const refreshToken = getCookie('refresh');
      if (!refreshToken) {
        router.replace(ROUTES.SIGN_IN);
      } else {
        setIsLoading(false);
      }
    }, [router]);

    // На сервере и в первом рендере — показываем спиннер/заглушку
    if (!isClient || isLoading) {
      return <UiPageSpinner message="Загрузка странички..." />;
    }

    // После проверки — рендерим защищённый компонент
    return <Component {...props} />;
  };
}