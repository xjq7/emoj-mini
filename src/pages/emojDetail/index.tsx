import Taro, { usePullDownRefresh, useRouter, useShareAppMessage } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import { Icon, Toast } from '@antmjs/vantui';
import { inject, observer } from 'mobx-react';
import request from '@utils/request';
import themeMap from '@utils/theme';
import { IEmoj } from '@interface/emoj';
import { getEmojList } from '@services/emoj';
import FlatList from '@components/FlatList';
import EmojItem from '@components/EmojItem';
import styles from './index.module.scss';

const Component = inject('store')(
  observer((props) => {
    const { store } = props;

    const { userStore } = store;

    const { isLogin } = userStore;

    const router = useRouter();
    const { params } = router;

    const id = Number(params.id);

    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState<IEmoj>({});

    const { url = '', id: emoj_id, isStar, group_id } = detail;

    const [listParams, setListParams] = useState<IEmoj>();

    const fetchList = useCallback(
      async (data) => {
        if (!listParams) throw new Error();
        return getEmojList({ ...data, group_id: listParams.group_id });
      },
      [listParams],
    );

    usePullDownRefresh(() => {
      fetchDetail({ id });
    });

    useEffect(() => {
      if (!group_id || listParams) return;
      setListParams({ group_id: group_id });
    }, [group_id, listParams]);

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

    useShareAppMessage((res) => {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: detail.name,
        path: '/pages/emojDetail/index?id=' + id,
      };
    });

    const refresh = () => {
      if (!emoj_id) return;
      fetchDetail({ id: emoj_id });
    };

    useEffect(() => {
      if (!id) return;
      fetchDetail({ id });
    }, [id]);

    const handleDownload = (url: string) => {
      Taro.showLoading({ title: '加载中...' });
      Taro.downloadFile({
        url,
        success(res) {
          Taro.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              Taro.hideLoading();
              Toast.show({
                type: 'success',
                message: '保存成功!',
              });
            },
            fail() {
              Taro.hideLoading();
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
        <FlatList<IEmoj>
          className={styles.list}
          fetchMethod={fetchList}
          enabledPullDownRefresh={false}
          renderItem={(item) => (
            <EmojItem
              {...item}
              isSelect={item.id === emoj_id}
              onPress={() => {
                setDetail(item);
              }}
            />
          )}
        />

        <Toast id="vanToast" />
      </View>
    );
  }),
);

export default Component;
