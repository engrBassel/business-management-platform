import { configureStore } from "@reduxjs/toolkit";
import loggedUserSlice from "./state/loggedUserSlice";
import productsSlice from "./state/productsSlice";
import ordersSlice from "./state/ordersSlice";
import usersSlice from "./state/usersSlice";
import categoriesSlice from "./state/categoriesSlice";

export const store = configureStore({
  reducer: {
    loggedUser: loggedUserSlice,
    products: productsSlice,
    orders: ordersSlice,
    users: usersSlice,
    categories: categoriesSlice,
  },
});
