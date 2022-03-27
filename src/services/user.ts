import { ListResponse } from '@interface/common';
import request from '@utils/request';
import { PageInfo } from '@utils/types';

type IUserStarListRequest = PageInfo;

export function getUserStarList<T>(data: IUserStarListRequest): Promise<ListResponse<T>> {
  return request({
    url: '/user/star-list',
    method: 'GET',
    data,
  }) as Promise<ListResponse<T>>;
}

type IUserVisitListRequest = PageInfo;

export function getUserVisitList<T>(data: IUserVisitListRequest): Promise<ListResponse<T>> {
  return request({
    url: '/user/visit-list',
    method: 'GET',
    data,
  }) as Promise<ListResponse<T>>;
}
