import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Button, Cell, CellGroup, Icon } from '@antmjs/vantui';
import { inject, observer } from 'mobx-react';
import { CellProps } from '@antmjs/vantui/types/cell';
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
      Taro.navigateTo({
        url: '/pages/login/index',
      });
    };

    const cellProps: CellProps[] = isLogin
      ? [
          {
            isLink: true,
            linkType: 'navigateTo',
            url: '/pages/starList/index',
            clickable: true,
          },
          {
            isLink: true,
            linkType: 'navigateTo',
            url: '/pages/visitList/index',
            clickable: true,
          },
        ]
      : [{}];

    return (
      <View className={styles.container}>
        <View className={styles.header}>
          <View className={styles.userinfo} onClick={handleLogin}>
            <Icon classPrefix="icon" size={120} name="my" />
            <Text className={styles.name}>{name}</Text>
          </View>
        </View>

        <CellGroup title="个人空间">
          <Cell title="我的点赞" {...cellProps[0]} />
          <Cell title="我的浏览" {...cellProps[1]} />
        </CellGroup>
        {isLogin && (
          <Button className={styles.logout} type="info" size="large" onClick={handleLogout}>
            退出登录
          </Button>
        )}
      </View>
    );
  }),
);

export default Component;
