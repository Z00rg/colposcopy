import { ROUTES } from "@/shared/constants/routes";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export function PathologyDetailPage() {
  // 💡 Шаг 1: Получаем router
  const router = useRouter();
  
  // 💡 Шаг 2: Извлекаем динамический параметр (имя файла без скобок)
  const { pathologyId } = router.query; 
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imgContainer = ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg", "/imageFourth.png"];
  const textContainer = [
    `Картинка 1: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
    `Картинка 2: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
    `Картинка 3: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
  ];

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };


  // 💡 Шаг 3: Обработка состояния загрузки/отсутствия ID
  // Это важно для SSR/SSG и пока роутер не готов
  if (!pathologyId) {
    // Можно показать спиннер или просто вернуть null, 
    // пока Next.js не предоставит параметры
    return <div>Загрузка параметров...</div>; 
  }

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="withoutLogo" className="mt-6 [@media(max-height:930px)]:hidden" />
      <div className="flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5">
        <UiScrollImg img={imgContainer} onIndexChange={handleImageChange} />

        {currentImageIndex === 3 ? (
          <Image
            src={imgContainer[4]}
            alt="Test image"
            width={385}
            height={285}
            className="rounded-xl object-contain mt-5"
          />
        ) : (
          <UiTextArea className="mt-5">
            {textContainer[currentImageIndex]}
          </UiTextArea>
        )}
        <UiLink href={ROUTES.ATLAS} className="mr-auto">
          Назад
        </UiLink>
        <UiFooter activeStatus="atlas" />
      </div>
    </div>
  );
}
