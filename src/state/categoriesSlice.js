import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  array: [],
  isLoading: true,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.array = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch categories!";
        state.isLoading = false;
      });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );

      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default categoriesSlice.reducer;
