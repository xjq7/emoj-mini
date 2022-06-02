const SURL = 'https://c.xjq.icu';
const LURL = 'http://127.0.0.1:39002';

const ENV = process.env.NODE_ENV;

export const URL = ENV === 'development' ? LURL : SURL;

export const defaultAvatar = 'https://image.xjq.icu/2022/5/31/1653967782671_duck.jpeg';
