import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import Image from "next/image";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { UiLink } from "@/shared/ui/ui-link";
import { UiFooter } from "@/shared/ui/ui-footer";
import { ROUTES } from "@/shared/constants/routes";
import clsx from "clsx";
import { usePathology } from "../model/use-pathology";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function Pathology({ className }: { className?: string }) {
  const {
    pathologyDetails,
    isLoading,
    isError,
    currentImageIndex,
    handleImageChange,
  } = usePathology();

  const imgContainer = ["/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg", "/test.jpg"];
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.v";

  return (
    <div
      className={clsx(
        className,
        "flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5"
      )}
    >
      <UiScrollImg img={imgContainer} onIndexChange={handleImageChange} />
      <UiTextArea className="mt-5">{description}</UiTextArea>
      <UiLink href={ROUTES.ATLAS} className="mr-auto">
        Назад
      </UiLink>
      <UiFooter activeStatus="atlas" />
    </div>
      // <div className={clsx(className, "flex flex-col justify-center items-center gap-3 flex-1 mb-4 px-5 mt-5")}>
      //   {isLoading && <UiSpinner/>}
      //   {isError && <div className="font-bold text-rose-500">Ошибка при загрузке деталей патологии</div>}
      //   {pathologyDetails && (
      //     <>
      //       <UiScrollImg img={pathologyDetails.imgContainer} onIndexChange={handleImageChange} />
      //         {pathologyDetails.description}
      //       <UiLink href={ROUTES.ATLAS} className="mr-auto">
      //         Назад
      //       </UiLink>
      //       <UiFooter activeStatus="atlas" />
      //     </>
      //   )}

      // </div>
  );
}
