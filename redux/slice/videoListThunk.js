import {createAsyncThunk} from '@reduxjs/toolkit';
import { videoList } from '../../services/videosListApi';

export const videoListThunk = createAsyncThunk(
  'videoList',
  async (pageNo, thunkAPI) => {
    try {
      const response =await  videoList(pageNo) ; 
      console.log("response" ,response)
      return response.data;
    } catch (error) {
      return error;
    }
  },
);