import { getTheme } from './theme';
export const jyChangeTheme = (theme = 'White', parmas) => {
  let styleVar = {};
  if (theme === 'White' || theme === 'Black') {
    styleVar = getTheme(theme, parmas);
  } else {
    styleVar = parmas;
  }
  for (let i in styleVar) {
    document.body.style.setProperty(i, styleVar[i]);
  }
};
