import { action, observable } from 'mobx';

class ConfigStore {
  @observable watermark = true;

  @action.bound
  setWatermark(isOpen: boolean) {
    this.watermark = isOpen;
  }
}

export default new ConfigStore();
