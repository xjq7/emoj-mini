import themeMap from './utils/theme';

export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/my/index',
    'pages/login/index',
    'pages/emojDetail/index',
    'pages/emojPack/index',
    'pages/starList/index',
    'pages/visitList/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  // lazyCodeLoading: 'requiredComponents',
  tabBar: {
    color: '#ccccc',
    selectedColor: themeMap.$Primary,
    backgroundColor: themeMap.$White,
    position: 'bottom',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/home.png',
        selectedIconPath: './assets/home_selected.png',
      },
      // {
      //   pagePath: 'pages/emojPack/index',
      //   text: '表情包',
      //   iconPath: './assets/emojPack.png',
      //   selectedIconPath: './assets/emojPack_selected.png',
      // },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/my.png',
        selectedIconPath: './assets/my_selected.png',
      },
    ],
  },
});
