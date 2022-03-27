import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Icon } from '@antmjs/vantui';
import styles from './index.module.scss';

const Component = (props) => {
  const { id, url = '', star, visit, onPress } = props;

  return (
    <View
      className={styles.item}
      onClick={() => {
        if (onPress) {
          onPress(props);
        } else {
          Taro.navigateTo({
            url: '/pages/emojDetail/index?id=' + id,
          });
        }
      }}
    >
      <Image className={styles.img} mode="aspectFit" src={url} />
      <View className={styles.data_wrap}>
        <View className={styles.like}>
          <Icon name="like" size={26} className={styles.like_icon} />
          <Text className={styles.like_label}>{star}</Text>
        </View>
        <View className={styles.visit}>
          <Icon name="eye" size={32} className={styles.visit_icon} />
          <Text className={styles.visit_label}>{visit}</Text>
        </View>
      </View>
    </View>
  );
};

export default Component;
