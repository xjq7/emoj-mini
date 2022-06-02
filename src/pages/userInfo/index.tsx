import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Button, Field, Image } from '@antmjs/vantui';
import PageView from '@components/PageView';
import { useState } from 'react';
import { updateUserInfo as updateUserInfoService } from '@services/user';
import { inject } from 'mobx-react';
import { URL } from '@utils/config';
import styles from './index.module.scss';

const Component = inject('store')((props) => {
  const {
    store: { userStore },
  } = props;
  const { updateUserInfo } = userStore;
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleAvatar = () => {
    Taro.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath);
        Taro.uploadFile({
          url: URL + '/bucket',
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          success: function (res) {
            console.log(res);

            // const { url } = JSON.parse(res.data);
            // setAvatar(url);
          },
        });
      },
    });
  };

  const handleUpdateUserInfo = async () => {
    if (!avatar || !name) {
      Taro.showToast({ title: '昵称和头像不能为空!', icon: 'error' });
      return;
    }
    Taro.showLoading({ title: '加载中...' });
    try {
      const user = await updateUserInfoService({ avatar, name });
      updateUserInfo(user);
      setTimeout(() => {
        Taro.navigateBack();
      }, 1000);
    } catch (error) {
    } finally {
      Taro.hideLoading();
    }
  };

  return (
    <PageView className={styles.container}>
      <View className={styles.avatar_wrap}>
        <Image className={styles.avatar} src={avatar} onClick={handleAvatar} />
      </View>
      <View className={styles.avatar}></View>
      <Field
        //@ts-ignore
        type="nickname"
        value={name}
        required
        clearable
        label="昵称"
        placeholder="请输入昵称"
        maxlength={30}
        onChange={(e) => {
          setName(e.detail);
        }}
      />
      <Button className={styles.confirm} type="primary" onClick={handleUpdateUserInfo}>
        确定
      </Button>
    </PageView>
  );
});

export default Component;
