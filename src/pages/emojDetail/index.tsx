import { useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { Image, Button } from '@taroify/core';
import { LikeOutlined, EyeOutlined } from '@taroify/icons';
import { inject, observer } from 'mobx-react';
import request from '@utils/request';
import EmojList from '@components/EmojList';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const { store } = props;
    const { userStore } = store;
    console.log(userStore);

    const router = useRouter();
    const { params } = router;

    const id = Number(params.id);

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [detail, setDetail] = useState();

    const { url } = detail || { url: '' };
    console.log(detail);

    const fetchDetail = async (data) => {
      setLoading(true);
      return request({
        url: '/emoj/detail',
        method: 'POST',
        data,
      })
        .then((res: any) => {
          const { emoj_list } = res;
          console.log(emoj_list);

          setList(emoj_list);
          setDetail(emoj_list.find((o) => o.id === id));
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      fetchDetail({ id, user_id: 1 });
    }, [id]);

    return (
      <View className={styles.container}>
        <View className={styles.header}>
          <Image className={styles.logo} mode="aspectFit" src={url} />
          <View className={styles.header_btn_wrap}>
            <Button
              color="danger"
              size="small"
              onClick={async () => {
                // Toast.show({ type: 'info', text1: '还在写...' });
              }}
            >
              发送微信
            </Button>
            <Button
              color="danger"
              size="small"
              onClick={async () => {
                // Toast.show({ type: 'info', text1: '还在写...' });
              }}
            >
              下载
            </Button>
            <View>
              <LikeOutlined size={25} className={styles.like_icon} />
              <EyeOutlined size={30} className={styles.eye_icon} />
            </View>
          </View>
        </View>
        <View style={{ height: 180 }} />
        <EmojList dataSource={list} hasMore={false} />
      </View>
    );
  }),
);

export default Component;
