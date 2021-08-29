const fonts = {
  family: {
    base: `'Noto Sans KR', sans-serif`,
    title: `'Merriweather', serif`,
  },
  size: {
    xm: '1rem',
    sm: '1.4rem',
    base: '1.6rem',
    lg: '2rem',
    xl: '2.5rem',
    title: '6rem',
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const size = {
  mobile: '425px',
  tablet: '768px',
  desktop: '1440px',
};

const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

const colors = {
  purple: '#9B51E0',
  gray8: '#f2f2f2',
  gray7: '#E5E5E5',
  gray6: '#333333',
  gray3: '#828282',
};

const DefaultTheme = {
  device,
  colors,
  fonts,
};

export default DefaultTheme;
