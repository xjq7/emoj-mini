import Taro, { usePullDownRefresh, useReachBottom, useRouter, useShareAppMessage } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { Icon, Toast } from '@antmjs/vantui';
import { inject, observer } from 'mobx-react';
import request from '@utils/request';
import EmojList from '@components/EmojList';
import themeMap from '@utils/theme';
import { IEmoj } from '@interface/emoj';
import useList from '@hooks/useList';
import { getEmojList } from '@services/emoj';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const { store } = props;

    const { userStore } = store;

    const { isLogin, userInfo } = userStore;

    const { id: userId } = userInfo;

    const router = useRouter();
    const { params } = router;

    const id = Number(params.id);

    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState<IEmoj>({});

    const fetchList = async (data) => {
      if (!detail.group_id) throw new Error();
      return getEmojList({ ...data, group_id: detail.group_id });
    };

    const { loading: listLoading, list, refresh: listRefresh, loadMore, hasMore } = useList({ fetchMethod: fetchList });

    const { url = '', id: emoj_id, isStar, group_id } = detail;

    const fetchDetail = async (data) => {
      setLoading(true);
      try {
        const emojInfo = (await request({
          url: '/emoj',
          method: 'GET',
          data: {
            ...data,
            user_id: userId,
          },
        })) as any;
        setDetail(emojInfo);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      listRefresh();
    }, [group_id]);

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
      if (!emoj_id) return;
      fetchDetail({ id: emoj_id });
    });

    useReachBottom(() => {
      loadMore();
    });

    useEffect(() => {
      if (!emoj_id) return;
      fetchDetail({ id: emoj_id });
    }, [emoj_id]);

    const refresh = () => {
      if (!emoj_id) return;
      fetchDetail({ id: emoj_id });
    };

    useEffect(() => {
      if (!id) return;
      fetchDetail({ id });
    }, [id]);

    const handleDownload = (url: string) => {
      Taro.downloadFile({
        url,
        success(res) {
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              Toast.show({
                type: 'success',
                message: '保存成功!',
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
              Toast.show({
                type: 'success',
                message: '分享成功!',
              });
            },
          });
        },
      });
    };

    const handleStar = async () => {
      if (!isLogin) {
        Taro.navigateTo({
          url: '/pages/login/index',
        });
      } else {
        Taro.showLoading({
          title: '处理中...',
        });
        try {
          await request({
            url: '/emoj/star',
            method: 'POST',
            data: {
              emoj_id,
            },
          });
          Toast.show({ message: isStar ? '取消点赞成功' : '点赞成功' });
          refresh();
        } catch (error) {
        } finally {
          Taro.hideLoading();
        }
      }
    };

    return (
      <View className={styles.container}>
        <View className={styles.header}>
          <Image className={styles.logo} mode="aspectFit" src={url} />
          <View className={styles.header_operator}>
            {isStar ? (
              <Icon name="like" color={themeMap.$Primary} size={50} onClick={handleStar} />
            ) : (
              <Icon name="like-o" size={50} onClick={handleStar} />
            )}

            <Icon name="share-o" size={50} onClick={handleShare} />
            <Icon name="down" size={50} onClick={() => handleDownload(url)} />
          </View>
        </View>
        <View style={{ height: 210 }} />
        <EmojList
          dataSource={list}
          loading={listLoading}
          hasMore={hasMore}
          onPress={(item) => {
            setDetail(item);
          }}
        />
        <Toast id="vanToast" />
      </View>
    );
  }),
);

export default Component;
