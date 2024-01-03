import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

import authSlice from "../slices/auth-slice";

const authReduxWhitelist = createWhitelistFilter('auth');

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
  transforms: [authReduxWhitelist]
};

const reducers = combineReducers({
  auth: authSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/LogOut") {
    state = undefined;
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: true,
});

export default store;
