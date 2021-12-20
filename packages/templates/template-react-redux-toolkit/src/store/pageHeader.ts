import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
  title: string;
  subTitle: string;
  showTitle: boolean;
  showSubTitle: boolean;
  showBackArrow: boolean;
}

const initialState: IState = {
  title: '', // 页面标题
  subTitle: '', // 页面小标题
  showTitle: false, // 是否显示页面标题
  showSubTitle: false, // 是否显示页面小标题
  showBackArrow: false, // 是否显示返回按钮
};

const pageHeaderSlice = createSlice({
  name: 'pageHeader',
  initialState,
  reducers: {
    setTitle: (state, value: PayloadAction<IState['title']>) => {
      state.title = value.payload;
    },
    setSubTitle: (state, value: PayloadAction<IState['subTitle']>) => {
      state.subTitle = value.payload;
    },
    setShowTitle: (state, value: PayloadAction<IState['showTitle']>) => {
      state.showTitle = value.payload;
    },
    setShowSubTitle: (state, value: PayloadAction<IState['showSubTitle']>) => {
      state.showSubTitle = value.payload;
    },
    setShowBackArrow: (state, value: PayloadAction<IState['showBackArrow']>) => {
      state.showBackArrow = value.payload;
    },
  },
});

export const {
  setTitle,
  setSubTitle,
  setShowTitle,
  setShowSubTitle,
  setShowBackArrow,
} = pageHeaderSlice.actions;


export default pageHeaderSlice.reducer;

