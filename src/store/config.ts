import Taro from '@tarojs/taro';
import { action, observable } from 'mobx';

let initWatermark = Taro.getStorageSync('config_watermark');
if (initWatermark === '') initWatermark = true;

class ConfigStore {
  @observable watermark = initWatermark;

  @action.bound
  setWatermark(isOpen: boolean) {
    this.watermark = isOpen;
    Taro.setStorageSync('config_watermark', isOpen);
  }
}

export default new ConfigStore();
