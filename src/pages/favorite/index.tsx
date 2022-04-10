import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PageView from '@components/PageView';
import { Tab, Tabs } from '@antmjs/vantui';
import { getFavoriteEmojList } from '@services/user';
import FlatList from '@components/FlatList';
import { IEmoj } from '@interface/emoj';
import EmojItem from '@components/EmojItem';
import styles from './index.module.scss';

function Component() {
  const fetchList = async (o: any) => {
    return getFavoriteEmojList<IEmoj>(o).then((res) => ({
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
    <PageView>
      <FlatList className={styles.list} fetchMethod={fetchList} renderItem={renderItem} />
      {/* <Tabs>
        <Tab title="表情">
          
        </Tab>
        <Tab title="表情包">内容 2</Tab>
      </Tabs> */}
    </PageView>
  );
}

export default Component;
