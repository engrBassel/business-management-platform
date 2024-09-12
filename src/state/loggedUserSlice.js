import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
  data: null,
  isLoading: true,
  error: null,
};

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    clearLoggedUserData: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoggedUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchLoggedUserData.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch user data!";
        state.isLoading = false;
      });
  },
});

export const fetchLoggedUserData = createAsyncThunk(
  "loggedUserData/fetchLoggedUserData",
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { fullName, phoneNumber, email, isAdmin, isBlocked } =
          docSnap.data();
        return {
          fullName,
          phoneNumber,
          email,
          isAdmin,
          isBlocked,
        };
      } else {
        throw new Error("No User Data Found!");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { clearLoggedUserData } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
