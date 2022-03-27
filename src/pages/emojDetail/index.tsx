import Taro, { usePullDownRefresh, useReachBottom, useRouter, useShareAppMessage } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useEffect, useMemo, useState } from 'react';
import { Button, Icon } from '@antmjs/vantui';
import { inject, observer } from 'mobx-react';
import request from '@utils/request';
import EmojList from '@components/EmojList';
import themeMap from '@utils/theme';
import { IEmoj } from '@interface/emoj';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const { store } = props;

    const { userStore } = store;

    const { isLogin } = userStore;

    const router = useRouter();
    const { params } = router;

    const id = Number(params.id);

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [detail, setDetail] = useState<IEmoj>({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { url = '' } = detail;

    const groupId = useMemo(() => (detail || ({} as any)).group_id, [detail]);

    const fetchDetail = async (data) => {
      setLoading(true);
      try {
        const emojInfo = (await request({
          url: '/emoj',
          method: 'GET',
          data,
        })) as any;
        setDetail(emojInfo);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchList(1);
    }, [groupId]);

    useShareAppMessage((res) => {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: detail.name,
        path: '/pages/emojDetail?id=' + id,
      };
    });

    usePullDownRefresh(() => {
      fetchDetail({ id });
    });

    const fetchList = async (page: number) => {
      if (!groupId) return;

      const res: any = await request({
        url: '/emoj/list',
        method: 'GET',
        data: {
          group_id: groupId,
          page: page,
          pageSize: 12,
        },
      });
      if (page === 1) {
        setList(res.list || []);
      } else {
        setList(list.concat(res.list || []));
      }
      setPage(res.page || 1);
      setHasMore(res.page * res.pageSize < res.total);
    };

    useReachBottom(() => {
      if (hasMore) {
        fetchList(page + 1);
      }
    });

    useEffect(() => {
      fetchDetail({ id });
    }, [id]);

    const handleDownload = (url: string) => {
      Taro.downloadFile({
        url,
        success(res) {
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              Taro.showToast({
                title: '保存成功!',
                icon: 'success',
                duration: 2000,
              });
            },
          });
        },
      });
    };

    const handleShare = () => {
      if (!url) return;
      Taro.downloadFile({
        url,
        success: (res) => {
          Taro.showShareImageMenu({
            path: res.tempFilePath,
            success() {
              Taro.showToast({
                title: '分享成功!',
                icon: 'success',
                duration: 2000,
              });
            },
          });
        },
      });
    };

    const handleStar = () => {
      if (!isLogin) {
        Taro.navigateTo({
          url: '/pages/login/index',
        });
      } else {
        console.log(11);
      }
    };

    return (
      <View className={styles.container}>
        <View className={styles.header}>
          <Image className={styles.logo} mode="aspectFit" src={url} />
          <View className={styles.header_operator}>
            <Icon name="like-o" size={50} onClick={handleStar} />
            {/* <Icon name="like" color={themeMap.$Primary} size={50} onClick={handleStar} /> */}
            <Icon name="share-o" size={50} onClick={handleShare} />
            <Icon name="down" size={50} onClick={() => handleDownload(url)} />
            {/* <Button type="info" className={styles.share} onClick={handleShare}>
              分享
            </Button>
            <Button
              type="info"
              className={styles.download}
              onClick={() => {
                handleDownload(url);
              }}
            >
              下载
            </Button> */}
          </View>
        </View>
        <View style={{ height: 210 }} />
        <EmojList
          dataSource={list}
          loading={loading}
          hasMore={false}
          onPress={(item) => {
            setDetail(item);
          }}
        />
      </View>
    );
  }),
);

export default Component;
