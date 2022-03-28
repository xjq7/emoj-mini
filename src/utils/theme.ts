// 主题颜色
const $Primary = '#fa331d';
const $Yellow = '#ffc65d';
const $Blue = '#40a9ff';

// 黑色
const $BlackS = '#141115';
const $BlackM = '#666666';
const $BlackL = '#9399a5';
const $BlackXL = '#c3cad5';
const $PageBg = '#f5f5f9';
const $Divider = '#e8e9ee';
const $White = '#ffffff';

interface ThemeMapProps {
  $Primary: string;
  $Yellow: string;
  $Blue: string;
  $BlackM: string;
  $BlackXL: string;
  $BlackL: string;
  $PageBg: string;
  $Divider: string;
  $White: string;
  $BlackS: string;
}

const themeMap: ThemeMapProps = {
  $Primary,
  $Yellow,
  $Blue,
  $BlackS,
  $BlackM,
  $BlackXL,
  $BlackL,
  $PageBg,
  $Divider,
  $White,
};

export default themeMap;
