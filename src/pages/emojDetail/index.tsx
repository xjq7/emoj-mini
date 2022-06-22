import Taro, { usePullDownRefresh, useRouter, useShareAppMessage } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { useCallback, useEffect, useState } from 'react';
import { Icon, Toast } from '@antmjs/vantui';
import request from '@utils/request';
import themeMap from '@utils/theme';
import { IEmoj } from '@interface/emoj';
import { getEmojList, postFavoriteEmoj } from '@services/emoj';
import FlatList from '@components/FlatList';
import EmojItem from '@components/EmojItem';
import PageView from '@components/PageView';
import dayjs from 'dayjs';
import { downloadImage, shareImage } from '@utils/helper';
import styles from './index.module.scss';

const Component = () => {
  const router = useRouter();
  const { params } = router;

  const id = Number(params.id);

  const [detail, setDetail] = useState<IEmoj>({});

  const [emojId, setEmojId] = useState<number>(id);

  const { url = '', name, author, isStar = false, isFavorite = false, group_id, createdAt } = detail;

  const [listParams, setListParams] = useState<IEmoj>();

  const fetchList = useCallback(
    async (data) => {
      if (!listParams) throw new Error();
      return getEmojList({ ...data, group_id: listParams.group_id }).then((res) => ({
        ...res,
        list: res.list?.reduce((acc: IEmoj[][], cur: IEmoj, index: number) => {
          if (index % 3 === 0) {
            acc.push([cur]);
          } else {
            acc[acc.length - 1].push(cur);
          }
          return acc;
        }, []),
      }));
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
    Taro.showLoading({ title: '加载中...' });
    try {
      const emojInfo = (await request({
        url: '/emoj',
        method: 'GET',
        data,
      })) as any;
      setDetail(emojInfo);
    } catch (error) {
    } finally {
      Taro.hideLoading();
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
    fetchDetail({ id: emojId });
  };

  useEffect(() => {
    if (!emojId) return;
    fetchDetail({ id: emojId });
  }, [emojId]);

  const handleDownload = async (url: string) => {
    if (!url) return;
    Taro.showLoading({ title: '加载中...' });
    try {
      await downloadImage(url);
      Toast.show({
        type: 'success',
        message: '保存成功!',
      });
    } catch (error) {
    } finally {
      Taro.hideLoading();
    }
  };

  const handleShare = async (url: string) => {
    if (!url) return;
    Taro.showLoading({ title: '加载中...' });
    try {
      await shareImage(url);
    } catch (error) {
    } finally {
      Taro.hideLoading();
    }
  };

  const handleStar = async () => {
    Taro.showLoading({
      title: '处理中...',
    });
    try {
      await request({
        url: '/emoj/star',
        method: 'POST',
        data: {
          emoj_id: emojId,
        },
      });
      Toast.show({ message: isStar ? '取消点赞成功' : '点赞成功' });
      refresh();
    } catch (error) {
    } finally {
      Taro.hideLoading();
    }
  };

  const handleFavorite = async () => {
    Taro.showLoading({
      title: '处理中...',
    });
    try {
      await postFavoriteEmoj({
        emoj_id: emojId,
        status: isFavorite ? 0 : 1,
      });
      Toast.show({ message: isFavorite ? '已取消收藏' : '已收藏' });
      refresh();
    } catch (error) {
    } finally {
      Taro.hideLoading();
    }
  };

  const renderItem = (list) => {
    return (
      <View className={styles.item_list}>
        {list.map((item) => {
          return (
            <EmojItem
              key={item.id}
              {...item}
              onPress={() => {
                setEmojId(item.id);
              }}
            ></EmojItem>
          );
        })}
      </View>
    );
  };

  return (
    <PageView className={styles.container}>
      <View className={styles.header}>
        <Image className={styles.logo} mode="aspectFit" src={url} />
        <View className={styles.info_wrap}>
          <View className={styles.info}>
            <Text className={styles.name}>{name}</Text>
            <Text className={styles.author}>作者: {author}</Text>
            <Text className={styles.createdAt}>创建时间: {dayjs(createdAt).format('YYYY.MM.DD')}</Text>
          </View>
          <View className={styles.operator}>
            {isStar ? (
              <Icon name="like" color={themeMap.$Primary} size={48} onClick={handleStar} />
            ) : (
              <Icon name="like-o" size={48} onClick={handleStar} />
            )}
            <Icon name="share-o" size={50} onClick={() => handleShare(url)} />
            {isFavorite ? (
              <Icon
                classPrefix="icon"
                color={themeMap.$Primary}
                name="shoucangxuanzhong"
                size={54}
                onClick={handleFavorite}
              />
            ) : (
              <Icon classPrefix="icon" name="shoucang_o" size={54} onClick={handleFavorite} />
            )}
            <Icon classPrefix="icon" name="xiazai-wenjianxiazai-07" size={46} onClick={() => handleDownload(url)} />
          </View>
        </View>
      </View>
      <View style={{ height: 176 }} />
      <FlatList<IEmoj[]> fetchMethod={fetchList} enabledPullDownRefresh={false} renderItem={renderItem} />

      <Toast id="vanToast" />
    </PageView>
  );
};

export default Component;
