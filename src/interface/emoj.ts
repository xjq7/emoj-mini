export interface IEmoj {
  name?: string;
  id?: number;
  desc?: string;
  url?: string;
  group_id?: number;
  updatedAt?: string;
  createdAt?: string;
  star?: number;
  visit?: number;
  isStar?: boolean;
  isFavorite?: boolean;
  author?: string;
  author_id?: number;
}

export interface IEmojGroup {
  id?: number;
  name?: string;
  desc?: string;
  updatedAt?: string;
  createdAt?: string;
}
