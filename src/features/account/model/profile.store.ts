import { makeAutoObservable } from "mobx";
import type { GetProfileInfoDto } from "@/shared/api/api";

export class ProfileStore {
  // локальное состояние
  isEditing = false;
  selectedTab: "info" | "settings" = "info";

  // сюда можно временно класть данные профиля для формы редактирования в будущем
  tempProfile: Partial<GetProfileInfoDto> | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  setTab(tab: "info" | "settings") {
    this.selectedTab = tab;
  }

  setTempProfile(profile: Partial<GetProfileInfoDto>) {
    this.tempProfile = profile;
  }

  get fullName() {
    if (!this.tempProfile) return "";
    const { surname, firstName, middleName } = this.tempProfile;
    return [surname, firstName, middleName].filter(Boolean).join(" ");
  }
}
