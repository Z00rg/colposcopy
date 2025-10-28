import { makeAutoObservable } from "mobx";

// Пример TimerStore
class TimerStore {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed++;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

// Корневой стор, где собираются все остальные
export class RootStore {
  timerStore: TimerStore;

  constructor() {
    this.timerStore = new TimerStore();
  }
}

// Создаём один экземпляр rootStore
export const rootStore = new RootStore();
