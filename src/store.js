// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./utils/userReducer"; // Update with the correct path

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
