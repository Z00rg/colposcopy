import { Profile } from "@/features/profile/ui/profile";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiList } from "@/shared/ui/ui-list";
import { UiListButtonTry } from "@/shared/ui/ui-list-button-try";

export default function HomePage() {
  const informationOfTry = [
    {
      id: "1",
      date: "21.04.2001",
      status: true,
      mark: "Отлично",
      time: "46:20",
    },
    {
      id: "2",
      date: "22.09.2006",
      status: false,
      mark: "Удовлетворительно",
      time: "35:10",
    },
    {
      id: "1",
      date: "21.04.2001",
      status: true,
      mark: "Отлично",
      time: "46:20",
    },
    {
      id: "2",
      date: "22.09.2006",
      status: false,
      mark: "Удовлетворительно",
      time: "35:10",
    },
    {
      id: "1",
      date: "21.04.2001",
      status: true,
      mark: "Отлично",
      time: "46:20",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="withoutLogo" className="mt-16" />
      <div className="flex flex-col justify-between items-center gap-5 flex-1 mb-4 px-5">
        <div>
          <div className="font-medium text-[20px] font-[#4B4242] mt-7">
            Основной аккаунт
          </div>
          <Profile/>
          {/* <TryList/> */}
          <UiList className="mt-4">
            {informationOfTry.map((item) => (
              <UiListButtonTry key={item.id} informationOfTry={item} />
            ))}
          </UiList>
        </div>
        <UiFooter activeStatus="main" />
      </div>
    </div>
  );
}
