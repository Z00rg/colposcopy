import { UiButton } from "@/shared/ui/ui-button";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiFooterButton } from "@/shared/ui/ui-footer-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiList } from "@/shared/ui/ui-list";
import { UiListButtonAtlas } from "@/shared/ui/ui-list-button-atlas";
import { UiListButtonTry } from "@/shared/ui/ui-list-button-try";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
// import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { Profile } from "@/shared/widgets/profile";

export default function HomePage() {
  const imgContainer = ["/logo.png", "/logo.png", "/logo.png", "/logo.png"];
  const informationOfTry1 = {
    date: "21.04.2001",
    status: true,
    mark: "Отлично",
    time: "46:20",
  };

  const informationOfTry2 = {
    date: "22.09.2006",
    status: false,
    mark: "Удовлетворительно",
    time: "35:10",
  };

  const informationOfPathology1 = {
    id: 1,
    name: "Многослойный плоский эпителий ",
  };

  const informationOfPathology2 = {
    id: 2,
    name: "Сквамозно –цилиндрический стык визуализируемый полностью на экзоцервиксе",
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen flex-col gap-10`}
    >
      <UiHeader variant="logo" />
      <UiButton>Начать</UiButton>
      <UiSpinner />
      <UiLink href={"/"}>Ссылка</UiLink>
      {/* <UiPageSpinner/> */}
      <UiTextField placeholder="Email" />
      <UiFooterButton variant="book" active></UiFooterButton>
      <UiFooterButton variant="man">as</UiFooterButton>
      <UiFooterButton variant="check">as</UiFooterButton>
      <UiFooter activeStatus="atlas" />
      <UiFooter activeStatus="main" />
      <UiFooter activeStatus="test" />
      <UiScrollImg img={imgContainer} />
      <UiList>
        <UiListButtonTry informationOfTry={informationOfTry1} />
        <UiListButtonTry informationOfTry={informationOfTry2} />
        <UiListButtonTry informationOfTry={informationOfTry1} />
        <UiListButtonTry informationOfTry={informationOfTry2} />
        <UiListButtonTry informationOfTry={informationOfTry1} />
        <UiListButtonTry informationOfTry={informationOfTry2} />
        <UiListButtonTry informationOfTry={informationOfTry1} />
        <UiListButtonTry informationOfTry={informationOfTry2} />
        <UiListButtonTry informationOfTry={informationOfTry1} />
        <UiListButtonTry informationOfTry={informationOfTry2} />
      </UiList>
      <UiList>
        <UiListButtonAtlas
          index={1}
          informationOfPathology={informationOfPathology1}
        />
        <UiListButtonAtlas
          index={2}
          informationOfPathology={informationOfPathology2}
        />
        <UiListButtonAtlas
          index={1}
          informationOfPathology={informationOfPathology1}
        />
        <UiListButtonAtlas
          index={2}
          informationOfPathology={informationOfPathology2}
        />
        <UiListButtonAtlas
          index={1}
          informationOfPathology={informationOfPathology1}
        />
        <UiListButtonAtlas
          index={2}
          informationOfPathology={informationOfPathology2}
        />
        <UiListButtonAtlas
          index={1}
          informationOfPathology={informationOfPathology1}
        />
        <UiListButtonAtlas
          index={2}
          informationOfPathology={informationOfPathology2}
        />
        <UiListButtonAtlas
          index={1}
          informationOfPathology={informationOfPathology1}
        />
        <UiListButtonAtlas
          index={2}
          informationOfPathology={informationOfPathology2}
        />
        <UiListButtonAtlas
          index={1}
          informationOfPathology={informationOfPathology1}
        />
        <UiListButtonAtlas
          index={2}
          informationOfPathology={informationOfPathology2}
        />
      </UiList>
      <UiTextArea>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo cumque
        vero, est nobis praesentium nisi excepturi perspiciatis earum repellat
        animi asperiores assumenda odio a iure accusamus similique esse sint
        ratione! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
        cumque vero, est nobis praesentium nisi excepturi perspiciatis earum
        repellat animi asperiores assumenda odio a iure accusamus similique esse
        sint ratione! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Nemo cumque vero, est nobis praesentium nisi excepturi perspiciatis
        earum repellat animi asperiores assumenda odio a iure accusamus
        similique esse sint ratione! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Nemo cumque vero, est nobis praesentium nisi excepturi
        perspiciatis earum repellat animi asperiores assumenda odio a iure
        accusamus similique esse sint ratione! Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Nemo cumque vero, est nobis praesentium
        nisi excepturi perspiciatis earum repellat animi asperiores assumenda
        odio a iure accusamus similique esse sint ratione!Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Nemo cumque vero, est nobis
        praesentium nisi excepturi perspiciatis earum repellat animi asperiores
        assumenda odio a iure accusamus similique esse sint ratione! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Nemo cumque vero, est
        nobis praesentium nisi excepturi perspiciatis earum repellat animi
        asperiores assumenda odio a iure accusamus similique esse sint ratione!
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo cumque
        vero, est nobis praesentium nisi excepturi perspiciatis earum repellat
        animi asperiores assumenda odio a iure accusamus similique esse sint
        ratione! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
        cumque vero, est nobis praesentium nisi excepturi perspiciatis earum
        repellat animi asperiores assumenda odio a iure accusamus similique esse
        sint ratione! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Nemo cumque vero, est nobis praesentium nisi excepturi perspiciatis
        earum repellat animi asperiores assumenda odio a iure accusamus
        similique esse sint ratione!
      </UiTextArea>
      <Profile/>
    </div>
  );
}
