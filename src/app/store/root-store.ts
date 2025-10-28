import { ProfileStore } from "@/features/account/model/profile.store";

// Корневой стор
export class RootStore {
  profileStore: ProfileStore;

  constructor() {
    this.profileStore = new ProfileStore();
  }
}

// Создаём один экземпляр rootStore
export const rootStore = new RootStore();
