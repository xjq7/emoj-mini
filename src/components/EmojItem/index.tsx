import { View, Image, Text } from '@tarojs/components';
import { Icon } from '@antmjs/vantui';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  id?: number;
  url?: string;
  star?: number;
  visit?: number;
  onPress?(): void;
  isSelect?: boolean;
  className?: string;
}

const Component = (props: Props) => {
  const { url = '', star, visit, onPress, isSelect = false, className } = props;
  return (
    <View
      className={classnames(styles.item, className, isSelect && styles.isSelect)}
      onClick={() => {
        onPress && onPress();
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
