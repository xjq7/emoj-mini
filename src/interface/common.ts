import { PageInfo } from '@utils/types';

export interface ListResponse<T> extends PageInfo {
  list?: T[];
}
