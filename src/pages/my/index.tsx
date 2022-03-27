import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Button, Cell, CellGroup, Icon } from '@antmjs/vantui';
import { inject, observer } from 'mobx-react';
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

    return (
      <View className={styles.container}>
        <View className={styles.header}>
          <View className={styles.userinfo} onClick={handleLogin}>
            <Icon classPrefix="icon" size={120} name="my" />
            <Text className={styles.name}>{name}</Text>
          </View>
        </View>

        <CellGroup title="个人空间">
          <Cell isLink title="我的浏览" linkType="navigateTo" url="/pages/dashboard/index" />
          <Cell isLink title="我的点赞" linkType="navigateTo" url="/pages/dashboard/index" />
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
