import { configureStore } from "@reduxjs/toolkit";
import { verdeApiSlice } from "../features/verde/verde-slice";
import verdeReducer from "../features/verde/verde-slice";

export const store = configureStore({
  reducer: {
    [verdeApiSlice.reducerPath]: verdeApiSlice.reducer,
    verde: verdeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(verdeApiSlice.middleware);
  },
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
