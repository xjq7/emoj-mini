import Taro from '@tarojs/taro';
import { action, observable } from 'mobx';

const initWatermark = Taro.getStorageSync('config_watermark');

class ConfigStore {
  @observable watermark = initWatermark;

  @action.bound
  setWatermark(isOpen: boolean) {
    this.watermark = isOpen;
    Taro.setStorageSync('config_watermark', isOpen);
  }
}

export default new ConfigStore();
