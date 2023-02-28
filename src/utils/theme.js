import { colorRgba, mixColor } from 'GildataDesign/src/utils/util';
const commonTheme = {
  White: {
    '--color-white': '#ffffff',
    '--color-black': '#000000',
    '--color-primary': '#256dff',
    '--color-success': '#35b55f',
    '--color-warning': '#ffaa0e',
    '--color-danger': '#ee5640',
    '--color-info': '#202020',
    '--color-main': '#256dff',
    '--color-neutral': '#ffffff',
    '--color-tip': '#ffffff',
    '--background-primary-color-light': '#f7f9fc',
    '--background-primary-color-neutral': '#f7f7f7',
    '--popper-box-shadow': '0px 8px 20px 0px rgba(0, 0, 0, 0.1)',
    '--menu-active-background-color': '#e5edff',
    '--menu-active-color': '#256dff',
    '--loading-spinner-background-color': 'rgba(255, 255, 255, 0.9)',
    '--tooltip-fill': '#202020',
    '--table-border-color': '#efefef'
  },
  Black: {
    '--color-white': '#ffffff',
    '--color-black': '#000000',
    '--color-primary': '#f5ba63',
    '--color-success': '#35b55f',
    '--color-warning': '#ffaa0e',
    '--color-danger': '#ee5640',
    '--color-info': '#e6e6e6',
    '--color-main': '#256dff',
    '--color-neutral': '#15181a',
    '--color-tip': '#2b2b2c',
    '--background-primary-color-light': '#1b1d1f',
    '--background-primary-color-neutral': '#252525',
    '--popper-box-shadow': '0px 8px 20px 0px rgba(0, 0, 0, 0.6)',
    '--menu-active-background-color': '#f5ba63',
    '--menu-active-color': '#fff',
    '--loading-spinner-background-color': 'rgba(0, 0, 0, 0.9)',
    '--tooltip-fill': '#2b2b2c',
    '--table-border-color': '#323232'
  }
};
const colorWeight = (theme, parmas) => {
  let baseColor = theme === 'White' ? '#fff' : '#000';
  let borderpercent = theme === 'White' ? '0.88' : '0.66';
  let backgroundpercent = theme === 'White' ? '0.88' : '0.75';
  let primaryColor = parmas['--color-primary'];
  let successColor = parmas['--color-success'];
  let warningColor = parmas['--color-warning'];
  let dangerColor = parmas['--color-danger'];
  let infoColor = parmas['--color-info'];
  let mainColor = parmas['--color-main'];
  return {
    '--color-primary-hover': mixColor('#fff', primaryColor, 0.12),
    '--color-success-hover': mixColor('#fff', successColor, 0.12),
    '--color-warning-hover': mixColor('#fff', warningColor, 0.12),
    '--color-danger-hover': mixColor('#fff', dangerColor, 0.12),
    '--color-neutral-hover': theme === 'White' ? '#f0f0f0' : colorRgba(infoColor, 0.12),
    '--color-primary-pressed': mixColor('#000', primaryColor, 0.12),
    '--color-success-pressed': mixColor('#000', successColor, 0.12),
    '--color-warning-pressed': mixColor('#000', warningColor, 0.12),
    '--color-danger-pressed': mixColor('#000', dangerColor, 0.12),
    '--color-neutral-pressed': theme === 'White' ? '#e1e1e1' : colorRgba(infoColor, 0.06),
    '--color-text-regular': colorRgba(infoColor, 0.65),
    '--color-text-disabled': colorRgba(infoColor, 0.3),
    '--color-text-placeholder': colorRgba(infoColor, 0.45),
    '--border-color-disabled': colorRgba(infoColor, 0.04),
    '--border-primary-color': mixColor(baseColor, primaryColor, borderpercent),
    '--border-success-color': mixColor(baseColor, successColor, borderpercent),
    '--border-warning-color': mixColor(baseColor, warningColor, borderpercent),
    '--border-danger-color': mixColor(baseColor, dangerColor, borderpercent),
    '--border-main-color': mixColor(baseColor, mainColor, borderpercent),
    // '--background-color-base': colorRgba(infoColor, 0.07),
    '--background-primary-color': mixColor(baseColor, primaryColor, backgroundpercent),
    '--background-success-color': mixColor(baseColor, successColor, backgroundpercent),
    '--background-warning-color': mixColor(baseColor, warningColor, backgroundpercent),
    '--background-danger-color': mixColor(baseColor, dangerColor, backgroundpercent),
    '--background-main-color': mixColor(baseColor, mainColor, backgroundpercent),
    '--background-modal-color': colorRgba('#000', 0.45),
    '--scrollbar-background-color': theme === 'White' ? colorRgba(infoColor, 0.5) : colorRgba(infoColor, 0.3),
    '--scrollbar-hover-background-color': colorRgba(infoColor, 0.4),
    '--scrollbar-pressed-background-color': theme === 'White' ? colorRgba(infoColor, 0.6) : colorRgba(infoColor, 0.2),
    '--menu-active-border-box-shadow-color': `0px -1px 4px 0px ${colorRgba(primaryColor, 0.15)}`
  };
};
export function getTheme(theme, parmas = {}) {
  let setParams = Object.assign({}, commonTheme[theme], parmas);
  let data = colorWeight(theme, setParams);
  setParams = Object.assign(setParams, data);
  return setParams;
}
