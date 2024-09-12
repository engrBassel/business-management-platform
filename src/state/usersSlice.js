import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  array: [],
  number: 0,
  isLoading: true,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserBlock: (state, action) => {
      const index = state.array.findIndex(
        (user) => user.id === action.payload.userId
      );

      if (index >= 0) {
        const desiredUser = state.array[index];
        state.array[index] = {
          ...desiredUser,
          isBlocked: action.payload.newStatus,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.array = action.payload;
        state.number = state.array.length;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch users!";
        state.isLoading = false;
      });
  },
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const usersCollRef = collection(db, "users");
      const collSnap = await getDocs(usersCollRef);
      const fetchedUsers = collSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toISOString(),
      }));

      return fetchedUsers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { updateUserBlock } = usersSlice.actions;
export default usersSlice.reducer;
