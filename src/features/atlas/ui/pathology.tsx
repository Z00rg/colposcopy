import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
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
    handleImageChange,
  } = usePathology();

  return (
      <div className={clsx(className, "flex flex-col justify-center w-full gap-3 flex-1 mb-4 px-5 mt-5")}>
        {isLoading && <UiSpinner/>}
        {isError && <div className="font-bold text-rose-500">Ошибка при загрузке деталей патологии</div>}
        {pathologyDetails && (
          <>
            <UiScrollImg img={pathologyDetails.imgContainer} onIndexChange={handleImageChange} />
              <UiTextArea className="mt-5">{pathologyDetails.description}</UiTextArea>
            <UiLink href={ROUTES.ATLAS} className="mr-auto">
              Назад
            </UiLink>
            <UiFooter activeStatus="atlas" />
          </>
        )}

      </div>
  );
}
