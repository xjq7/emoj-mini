import { View } from '@tarojs/components';
import { Icon } from '@antmjs/vantui';
import themeMap from '@utils/theme';
import styles from './index.module.scss';

interface Props {
  onPress: () => void;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  icon: string;
}

function Component(props: Props) {
  const { onPress, top, right, left, bottom, icon } = props;
  return (
    <View className={styles.container} style={{ top, right, left, bottom }} onClick={onPress}>
      <Icon classPrefix="icon" name={icon} size={50} color={themeMap.$White} />
    </View>
  );
}

export default Component;
