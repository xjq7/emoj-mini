import Taro, { useReachBottom, useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useEffect, useMemo, useState } from 'react';
import { Image, Button } from '@taroify/core';
import { inject, observer } from 'mobx-react';
import request from '@utils/request';
import EmojList from '@components/EmojList';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const router = useRouter();
    const { params } = router;

    const id = Number(params.id);

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [detail, setDetail] = useState();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { url } = detail || { url: '' };

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
      Taro.downloadFile({
        url: url,
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

    return (
      <View className={styles.container}>
        <View className={styles.header}>
          <Image className={styles.logo} mode="aspectFill" src={url} />
          <View className={styles.header_btn_wrap}>
            <Button color="danger" className={styles.share} onClick={handleShare}>
              分享
            </Button>
            <Button
              color="danger"
              className={styles.download}
              onClick={() => {
                handleDownload(url);
              }}
            >
              下载
            </Button>
          </View>
        </View>
        <View style={{ height: 180 }} />
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
