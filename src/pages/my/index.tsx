import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Cell, CellGroup, Image } from '@antmjs/vantui';
import { inject, observer } from 'mobx-react';
import { CellProps } from '@antmjs/vantui/types/cell';
import PageView from '@components/PageView';
import { login } from '@utils/user';
import { defaultAvatar } from '@utils/config';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const {
      store: { userStore },
    } = props;
    const { isLogin, userInfo } = userStore;

    const { name = '登录', avatar = defaultAvatar } = userInfo;

    const handleUpdateUserInfo = () => {
      return;
      if (isLogin) {
        Taro.navigateTo({ url: '/pages/userInfo/index' });
        return;
      }
      Taro.showLoading();
      try {
        login();
      } catch (error) {
      } finally {
        Taro.hideLoading();
      }
    };

    // @ts-ignore
    const cellProps: CellProps[] = [
      {
        isLink: true,
        linkType: 'navigateTo',
        url: '/pages/starList/index',
        clickable: true,
        title: '我的点赞',
      },
      {
        isLink: true,
        linkType: 'navigateTo',
        url: '/pages/visitList/index',
        clickable: true,
        title: '我的浏览',
      },
      {
        isLink: true,
        linkType: 'navigateTo',
        url: '/pages/favorite/index',
        clickable: true,
        title: '收藏夹',
      },
      {
        isLink: true,
        linkType: 'navigateTo',
        url: '/pages/feedback/index',
        clickable: true,
        title: '反馈中心',
      },
    ].map((item) => ({ ...item, isLink: isLogin, clickable: isLogin, url: isLogin ? item.url : '' }));

    return (
      <PageView className={styles.container}>
        <View className={styles.header}>
          <View className={styles.userinfo} onClick={handleUpdateUserInfo}>
            <Image src={avatar} radius={75} width={150} height={150} />
            <Text className={styles.name}>{name}</Text>
          </View>
        </View>

        <CellGroup title="个人空间">
          {cellProps.map((props) => (
            <Cell key={props.title} {...props} />
          ))}
        </CellGroup>
      </PageView>
    );
  }),
);

export default Component;
