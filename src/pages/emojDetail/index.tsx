import { useEffect } from 'react';
import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Image, Button } from '@taroify/core';
import { Like, Eye } from '@taroify/icons';

import styles from './index.module.scss';

const Component = (props) => {
  const {} = props;
  const router = useRouter();
  const { params } = router;

  const { id } = params;

  useEffect(() => {}, [id]);

  return (
    <View style={styles.header}>
      <Image style={styles.logo} />
      <View style={styles.header_btn_wrap}>
        <Button
          size="small"
          onClick={async () => {
            // Toast.show({ type: 'info', text1: '还在写...' });
          }}
        />
        <View>
          <Like size={30} className={styles.like_icon} />
          <Eye size={30} className={styles.like_icon} />
        </View>
      </View>
    </View>
  );
};

export default Component;
