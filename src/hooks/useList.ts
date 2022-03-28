import Taro from '@tarojs/taro';
import { ListResponse } from '@interface/common';
import { PageInfo } from '@utils/types';
import { useEffect, useState } from 'react';

interface Props<T> {
  fetchMethod(o: any): Promise<ListResponse<T>>;
}

function useList<T>(props: Props<T>) {
  const { fetchMethod } = props;
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, pageSize: 18, total: 0 });

  const fetchList = async (page?: number, pageSize?: number) => {
    if (!page) page = pageInfo.page;
    if (!pageSize) pageSize = pageInfo.pageSize;

    try {
      setLoading(true);
      const result = await fetchMethod({ page, pageSize });
      const { list: rList = [], total, page: rPage, pageSize: rPageSize } = result;

      if (rPage === 1) {
        setList([]);
        setList(rList);
      } else {
        setList(list.concat(rList));
      }

      setPageInfo({ page: rPage, pageSize: rPageSize, total });

      if (rPage * rPageSize < total) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (loading) return;
    await fetchList(1, pageInfo.pageSize);
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    await fetchList(pageInfo.page + 1, pageInfo.pageSize);
  };

  useEffect(() => {
    fetchList(1, pageInfo.pageSize);
  }, []);

  return { loading, refresh, loadMore, list, hasMore };
}

export default useList;
