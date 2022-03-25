export interface AnyOptions {
  [key: string]: any;
}

export interface Response<T = AnyOptions> {
  code?: number;
  message?: string;
  data?: T;
}

export interface PageInfo {
  page?: number;
  pageSize?: number;
  total?: number;
}

export interface ResponseList<T> {
  code?: number;
  message?: string;
  data?: {
    list?: T[];
  } & PageInfo;
}
