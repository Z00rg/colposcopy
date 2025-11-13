import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import Image from "next/image";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { UiLink } from "@/shared/ui/ui-link";
import { UiFooter } from "@/shared/ui/ui-footer";
import { ROUTES } from "@/shared/constants/routes";
import clsx from "clsx";
import { usePathology } from "../model/use-pathology";

export function Pathology({ className }: { className?: string }) {
  const {
    pathologyDetails,
    isLoading,
    isError,
    currentImageIndex,
    handleImageChange,
  } = usePathology();

  const imgContainer = ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"];
  const imgSchema = "/imageFourth.png";
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

  return (
    <div
      className={clsx(
        className,
        "flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5"
      )}
    >
      <UiScrollImg img={imgContainer} onIndexChange={handleImageChange} />

      {currentImageIndex === imgContainer.length - 1 ? (
        <Image
          src={imgSchema}
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
    //   <div className={clsx(className, "flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5")}>
    //     {isLoading && <UiSpinner/>}
    //     {isError && <div className="font-bold text-rose-500">Ошибка при загрузке деталей патологии</div>}
    //     {pathologyDetails && (
    //       <>
    //         <UiScrollImg isAtlas img={pathologyDetails.imgContainer} onIndexChange={handleImageChange} />
    //         {currentImageIndex === pathologyDetails.imgContainer.length-1 ? (
    //           <Image
    //             src={pathologyDetails.imgSchema}
    //             alt="Схематическое изображение"
    //             width={385}
    //             height={285}
    //             className="rounded-xl object-contain mt-5"
    //           />
    //         ) : (
    //           <UiTextArea className="mt-5">
    //             {pathologyDetails.textContainer[currentImageIndex]}
    //           </UiTextArea>
    //         )}
    //         <UiLink href={ROUTES.ATLAS} className="mr-auto">
    //           Назад
    //         </UiLink>
    //         <UiFooter activeStatus="atlas" />
    //       </>
    //     )}

    //   </div>
  );
}
