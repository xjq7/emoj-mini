import { View } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { observer, inject } from 'mobx-react';
import themeMap from '@utils/theme';
import { Icon, Tabs, Tab } from '@antmjs/vantui';
import FlatList from '@components/FlatList';
import { IEmoj } from '@interface/emoj';
import EmojItem from '@components/EmojItem';
import { getEmojList } from '@services/emoj';
import ActionButton from '@components/ActionButton';
import styles from './index.module.scss';

type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}

enum TabType {
  hot = 'hot',
  new = 'new',
}

const Index = inject('store')(
  observer((props) => {
    const fetchList = async (data: any) => {
      return getEmojList({ ...data }).then((res) => ({
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
    };

    useShareAppMessage((res) => {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '表情包集合',
        path: '/pages/home/index',
      };
    });

    const renderItem = (list) => {
      return (
        <View className={styles.item_list}>
          {list.map((item) => {
            return (
              <EmojItem
                key={item.id}
                {...item}
                onPress={() => {
                  Taro.navigateTo({
                    url: '/pages/emojDetail/index?id=' + item.id,
                  });
                }}
              ></EmojItem>
            );
          })}
        </View>
      );
    };

    return (
      <View className={styles.container}>
        <Tabs>
          <Tab title="最新">
            <FlatList
              className={styles.list}
              fetchMethod={(o) => fetchList({ ...o, type: TabType.new })}
              renderItem={renderItem}
            />
          </Tab>
          <Tab title="最热">
            <FlatList
              className={styles.list}
              fetchMethod={(o) => fetchList({ ...o, type: TabType.hot })}
              renderItem={renderItem}
            />
          </Tab>
        </Tabs>

        <ActionButton
          icon="iconfontzhizuobiaozhun023131"
          right={30}
          bottom={50}
          onPress={() => {
            Taro.navigateTo({ url: '/pages/emojSearch/index' });
          }}
        />
      </View>
    );
  }),
);

export default Index;
