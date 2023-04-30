export const mqSize = {
  largest: '75em', // 1200px
  large: '56.25em', // 900px
  medium: '37.5em', // 600px
  small: '31.25em', // 500px
  smallest: '25em', // 400px
};

export const size = {
  fontMd: '1.5rem',
  sidebarWidth: '27rem',
};

export const color = {
  white: '#FFFFFF',
  gray900: '#222222',
  gray800: '#424242',
  gray700: '#616161',
  gray600: '#757575',
  gray500: '#9E9E9E',
  gray400: '#BDBDBD',
  gray300: '#E0E0E0',
  gray200: '#EEEEEE',
  gray100: '#F5F5F5',
  gray50: '#FAFAFA',
  primary500: '#FF6E40',
  primary400: '#FF8B66',
  primary300: '#FFA88C',
  primary200: '#FFC5B3',
  primary100: '#FFF1EC',
  prmary50: '#FFF6F4',
  blue100: '#E1EFFE',
  blue800: '#1E429F',
  green: '#1EC780', // TODO: 색상코드 확인 or 이름변경
  green100: '#DEF7EC',
  green800: '#03543F',
  red: '#F3213B',
  red200: '#FBD5D5',
  red800: '#9B1C1C',
  pink: '#FDDCFC',
  blueGray: '#4B5563',
};

export const theme = {
  color,
  size,
  mq: {
    laptop: `@media only screen and (min-width: ${mqSize.largest})`,
    tablet: `@media only screen and (min-width: ${mqSize.large})`,
    mobile: `@media only screen and (min-width: ${mqSize.small})`,
  },
};
