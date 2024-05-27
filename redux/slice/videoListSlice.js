import {createSlice} from '@reduxjs/toolkit';
import { videoListThunk } from './videoListThunk';

const initialState = {
  videoListData: {},
  status: 'idle',
  error: null,
};

const videoListApiSlice = createSlice({
  name: 'getVideosData',
  initialState,
  extraReducers: builder => {
    builder.addCase(videoListThunk.pending, (state, action) => {
      state.status = 'loading';
    }); 
    builder.addCase(videoListThunk.fulfilled, (state, action) => {
      state.status = 'success';
      const data = action.payload
      state.videoListData = data;
    });
    builder.addCase(videoListThunk.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default videoListApiSlice.reducer;