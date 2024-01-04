import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetImages = createAsyncThunk(
  "image/getImages",
  async (data, thunkAPI) => {
    try {
      const { url } = data;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      }
      return thunkAPI.rejectWithValue({
        err: {
          error: "Network Error",
        },
      });
    }
  }
);

const auth = createSlice({
  name: "images",
  initialState: {
    pageNumber: 1,
    count: 0,
    items: [{}],
    loading: false,
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
  },
  extraReducers: {
    [GetImages.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [GetImages.fulfilled]: (state, action) => ({
      ...state,
      items: [...state.items, ...action.payload.data],
      // items: action.payload.data,
      count: action.payload.pagination.total_count,
      loading: false,
    }),
    [GetImages.rejected]: (state, action) => ({
      ...state,
      err: action.payload.err?.error,
      loading: false,
    }),
  },
});

const { reducer, actions } = auth;

export const { SetState, LogOut } = actions;

export default reducer;
