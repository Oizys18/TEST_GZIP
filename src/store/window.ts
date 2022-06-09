import { atom } from 'recoil';

type WindowSizeData = {
  width: number;
  height: number;
  size: number;
  padding: number;
  maxWidth: number;
};

export const windowSizeDataStore = atom<WindowSizeData>({
  key: 'windowSizeData',
  default: {
    width: 0,
    height: 0,
    size: 0,
    padding: 60,
    maxWidth: 1600,
  },
});
