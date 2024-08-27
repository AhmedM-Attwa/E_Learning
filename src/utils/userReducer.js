import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../hooks/API";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await customFetch("/users/showMe");
    if (response.data && response) {
      const {
        data: { user },
      } = response;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    }
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      await customFetch("/auth/logout");
      localStorage.removeItem("user");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? { ...initialState, user: JSON.parse(user) } : initialState;
};

const userSlice = createSlice({
  name: "user",
  initialState: getUserFromLocalStorage(),

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
