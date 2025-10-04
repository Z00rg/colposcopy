import { ROUTES } from "@/shared/constants/routes";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { useState } from "react";
import Image from "next/image";

export function PathologyPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imgContainer = ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"];
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
    `Картинка 4: Зона трансформации (3Т) 1го типа характеризуется полной визуализацией
          всей площади стыка многослойного плоского эпителия и цилиндрического
          эпителия, включая его наиболее важный для скрининга компонент —
          границу метаплазии, расположенную на эктоцервиксе.`,
  ];

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="withoutLogo" className="mt-6" />
      <div className="flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5">
        <UiScrollImg img={imgContainer} onIndexChange={handleImageChange} />

        {currentImageIndex === 3 ? (
          <Image
            src="/imageFourth.png"
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
