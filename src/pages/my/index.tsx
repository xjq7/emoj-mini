import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Button, Cell, CellGroup, Icon } from '@antmjs/vantui';
import { inject, observer } from 'mobx-react';
import { CellProps } from '@antmjs/vantui/types/cell';
import PageView from '@components/PageView';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const {
      store: { userStore },
    } = props;
    const { logout, isLogin, userInfo } = userStore;
    console.log(userStore);

    const { name = '登录/注册' } = userInfo;

    const handleLogout = () => {
      logout();
    };

    const handleLogin = () => {
      if (isLogin) return;
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
          <View className={styles.userinfo} onClick={handleLogin}>
            <Icon classPrefix="icon" size={120} name="my" />
            <Text className={styles.name}>{name}</Text>
          </View>
        </View>

        <CellGroup title="个人空间">
          {cellProps.map((props) => (
            <Cell key={props.title} {...props} />
          ))}
        </CellGroup>
        {isLogin && (
          <Button className={styles.logout} type="info" size="large" onClick={handleLogout}>
            退出登录
          </Button>
        )}
      </PageView>
    );
  }),
);

export default Component;
