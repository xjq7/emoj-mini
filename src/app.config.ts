export default defineAppConfig({
  pages: ['pages/home/index', 'pages/my/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#ccccc',
    selectedColor: '#42BD55',
    backgroundColor: '',
    position: 'bottom',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
  },
});
