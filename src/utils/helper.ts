import Taro from '@tarojs/taro';
import configStore from '../store/config';

export function downloadImage(url: string) {
  return new Promise<string>((resolve, reject) => {
    if (configStore.watermark) {
      watermark(url, '5bCP5aSP55qE6KGo5oOF5YyF')
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
      return;
    }
    resolve(url);
  }).then((url) => {
    Taro.downloadFile({
      url,
      success(res) {
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          fail(err) {
            throw new Error(err.errMsg);
          },
        });
      },
    });
  });
}

export function watermark(url: string, text: string) {
  return new Promise<string>((resolve, reject) => {
    Taro.getImageInfo({
      src: url,
      success(res) {
        const { width } = res;
        let size = 20;
        if (width >= 500) {
          size = 28;
        } else if (width >= 400) {
          size = 24;
        } else if (width >= 300) {
          size = 20;
        } else if (width >= 200) {
          size = 14;
        } else if (width >= 150) {
          size = 10;
        } else if (width >= 100) {
          size = 7;
        } else {
          resolve(url);
          return;
        }
        const color = '9399a5';
        resolve(
          `${url}?x-oss-process=image/watermark,text_${text},size_${size},type_ZmFuZ3poZW5naGVpdGk,color_${color}`,
        );
      },
      fail(err) {
        reject(err.errMsg);
      },
    });
  });
}

export function shareImage(url: string) {
  return new Promise<string>((resolve, reject) => {
    if (configStore.watermark) {
      watermark(url, '5bCP5aSP55qE6KGo5oOF5YyF')
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
      return;
    }
    resolve(url);
  }).then((url) => {
    Taro.downloadFile({
      url: url.replace('https://', 'http://'),
      success: (res) => {
        Taro.showShareImageMenu({
          path: res.tempFilePath,
        });
      },
    });
  });
}
