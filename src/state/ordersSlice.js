import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  array: [],
  number: 0,
  isLoading: true,
  error: null,
  totalSales: 0,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.array.push(action.payload);
      state.number++;
    },
    updateOrder: (state, action) => {
      const index = state.array.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index >= 0) {
        state.array[index] = action.payload;
      }
    },
    deleteOrder: (state, action) => {
      state.array = state.array.filter((order) => order.id !== action.payload);
      state.number--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.array = action.payload;
        state.number = state.array.length;
        state.totalSales = state.array.reduce(
          (total, curr) => total + +curr.totalPrice,
          0
        );
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch orders!";
        state.isLoading = false;
      });
  },
});

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const ordersCollRef = collection(db, "orders");
      const collSnap = await getDocs(ordersCollRef);
      const fetchedOrders = collSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return fetchedOrders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { addOrder, updateOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
