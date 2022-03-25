import { View, Text } from '@tarojs/components';
import { Image } from '@taroify/core';
import { Like, Eye } from '@taroify/icons';
import styles from './index.module.scss';

const Component = (props) => {
  const { id, url, like, visit, onPress = () => {} } = props;

  return (
    <View className={styles.item} onClick={() => onPress({ id })}>
      <Image className={styles.img} mode="aspectFit" src={url} />
      <View className={styles.data_wrap}>
        <View className={styles.like}>
          <Like size={13} className={styles.like_icon} />
          <Text className={styles.like_label}>{like}</Text>
        </View>
        <View className={styles.visit}>
          <Eye className={styles.visit_icon} />
          <Text className={styles.visit_label}>{visit}</Text>
        </View>
      </View>
    </View>
  );
};

export default Component;
