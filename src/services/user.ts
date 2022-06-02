import { ListResponse } from '@interface/common';
import { IUser } from '@interface/user';
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

interface IEmojFavoriteListRequest extends PageInfo {}

export function getFavoriteEmojList<T>(data: IEmojFavoriteListRequest): Promise<ListResponse<T>> {
  return request({
    url: '/user/favorite-list',
    method: 'GET',
    data,
  }) as Promise<ListResponse<T>>;
}

export function login({ code }: { code: string }) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      code,
    },
  });
}

export function updateUserInfo(data: IUser) {
  return request({
    url: '/user',
    method: 'PUT',
    data,
  });
}
