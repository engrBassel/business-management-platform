import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  array: [],
  number: 0,
  isLoading: true,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.array.unshift(action.payload);
      state.number++;
    },
    updateProduct: (state, action) => {
      const index = state.array.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index >= 0) {
        state.array[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.array = state.array.filter(
        (product) => product.id !== action.payload
      );
      state.number--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.array = action.payload;
        state.number = state.array.length;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch products!";
        state.isLoading = false;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      const apiProducts = data.map((product) => ({
        id: `${product.id}`,
        image: product.image,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        fromApi: true,
      }));

      const productsCollRef = collection(db, "products");
      const collSnap = await getDocs(productsCollRef);
      const firestoreProducts = collSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const combinedProducts = [...firestoreProducts, ...apiProducts];

      return combinedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
