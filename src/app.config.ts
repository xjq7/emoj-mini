export default defineAppConfig({
  pages: ['pages/home/index', 'pages/my/index', 'pages/login/index', 'pages/emojDetail/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  // lazyCodeLoading: 'requiredComponents',
  // tabBar: {
  //   color: '#ccccc',
  //   selectedColor: themeMap.$Primary,
  //   backgroundColor: themeMap.$White,
  //   position: 'bottom',
  //   borderStyle: 'black',
  //   list: [
  //     {
  //       pagePath: 'pages/home/index',
  //       text: '首页',
  //     },
  //   ],
  // },
});
