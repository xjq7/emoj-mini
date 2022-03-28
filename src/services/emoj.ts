import { ListResponse } from '@interface/common';
import request from '@utils/request';
import { PageInfo } from '@utils/types';

interface IEmojListRequest extends PageInfo {
  type?: string;
  group_id?: number;
}

export function getEmojList<T>(data: IEmojListRequest): Promise<ListResponse<T>> {
  return request({
    url: '/emoj/list',
    method: 'GET',
    data,
  }) as Promise<ListResponse<T>>;
}

interface IEmojListByGroupRequestExt extends PageInfo {}

export function getEmojListByGroup<T>(data: IEmojListByGroupRequestExt): Promise<ListResponse<T>> {
  return request({
    url: '/emoj/list-by-group',
    method: 'GET',
    data,
  }) as Promise<ListResponse<T>>;
}
