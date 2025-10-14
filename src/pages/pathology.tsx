import { Pathology } from "@/features/atlas";
import { UiHeader } from "@/shared/ui/ui-header";

export function PathologyDetailPage() {
  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <UiHeader
        variant="withoutLogo"
        className="mt-6 [@media(max-height:930px)]:hidden"
      />
      <Pathology />
    </div>
  );
}
