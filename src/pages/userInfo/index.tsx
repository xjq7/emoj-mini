import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Button, Field, Image } from '@antmjs/vantui';
import PageView from '@components/PageView';
import { useState } from 'react';
import { updateUserInfo as updateUserInfoService } from '@services/user';
import { inject } from 'mobx-react';
import { defaultAvatar, URL } from '@utils/config';
import styles from './index.module.scss';

const Component = inject('store')((props) => {
  const {
    store: { userStore },
  } = props;
  const { updateUserInfo, userInfo } = userStore;

  const { avatar: _defaultAvatar = defaultAvatar, name: defaultName } = userInfo;

  const [name, setName] = useState(defaultName);
  const [avatar, setAvatar] = useState(_defaultAvatar);

  const handleAvatar = () => {
    const token = Taro.getStorageSync('token');
    Taro.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        Taro.uploadFile({
          url: URL + '/emoj/upload',
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          header: {
            Authorization: `Bearer ${token}`,
          },
          success: function (res: any) {
            const result = JSON.parse(res.data);
            const { data, code, message } = result;
            if (!code) {
              const { url } = data;
              setAvatar(url);
              return;
            }
            Taro.showToast({
              title: message,
              icon: 'error',
            });
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
      Taro.showToast({ title: '修改成功!', icon: 'success' });
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
        <Image className={styles.avatar} src={avatar} radius={100} onClick={handleAvatar} />
        <Text className={styles.avatar_prompt}>点击头像可切换</Text>
      </View>
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
