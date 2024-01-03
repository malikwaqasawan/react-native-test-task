import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosBaseUrl } from "../../config/axios-configuration";

const axios = axiosBaseUrl();

export const SignIn = createAsyncThunk(
  "auth/signIn",
  async (user, thunkAPI) => {
    try {
      const { email, password } = user;
      const response = await axios.post("/auth/sign-in", { email, password });
      console.log(response, "response")
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

export const ForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (user, thunkAPI) => {
    try {
      const { email } = user;
      const response = await axios.post("/auth/forgot-password", { email });
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

export const ResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (user, thunkAPI) => {
    try {
      const { password, userId } = user;
      const response = await axios.patch("/auth/reset-password", {
        password,
        userId,
      });
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

export const UserRegistration = createAsyncThunk(
  "user/userRegistration",
  async (user, thunkAPI) => {
    try {
      const {
        userName,
        email,
        password,
      } = user;
      const response = await axios.post("/auth/register", {
        userName,
        email,
        password,

      });
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
  name: "auth",
  initialState: {
    userName: "",
    email: "",
    message: "",
    err: "",
    token: "",
    success: false,
    loading: false,
    role: "",
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
    LogOut: (state) => ({
      userName: "",
      email: "",
      message: "",
      err: "",
      token: "",
      success: "",
    }),
  },
  extraReducers: {
    [SignIn.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [SignIn.fulfilled]: (state, action) => ({
      userName: action.payload.userName,
      email: action.payload.email,
      role: action.payload.role,
      token: action.payload.token,
      loading: false,
    }),
    [SignIn.rejected]: (state, action) => ({
      ...state,
      err: action.payload.err?.error,
      loading: false,
    }),
    [ForgotPassword.pending]: (state, action) => ({
      ...state,
      success: false,
      loading: true,
    }),
    [ForgotPassword.fulfilled]: (state, action) => ({
      ...state,
      message: action.payload.message,
      success: true,
      loading: false,
    }),
    [ForgotPassword.rejected]: (state, action) => ({
      ...state,
      err: action.payload.err.error,
      success: false,
      loading: false,
    }),
    [ResetPassword.pending]: (state, action) => ({
      ...state,
      success: false,
    }),
    [ResetPassword.fulfilled]: (state, action) => ({
      ...state,
      message: action.payload.message,
      success: true,
    }),
    [ResetPassword.rejected]: (state, action) => ({
      ...state,
      err: action.payload.err?.error,
      success: false,
    }),
    [UserRegistration.pending]: (state, action) => ({
      ...state,
      success: false,
    }),
    [UserRegistration.fulfilled]: (state, action) => ({
      ...state,
      userName: action.payload.userName,
      email: action.payload.email,
      role: action.payload.role,
      token: action.payload.token,
      message: action.payload.message,
      success: true,
    }),
    [UserRegistration.rejected]: (state, action) => ({
      ...state,
      err: action.payload.err?.error,
      success: false,
    }),
  },
});

const { reducer, actions } = auth;

export const { SetState, LogOut } = actions;

export default reducer;
