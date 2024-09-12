import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import {
  fetchLoggedUserData,
  clearLoggedUserData,
} from "./state/loggedUserSlice";
import { fetchOrders } from "./state/ordersSlice";
import { fetchProducts } from "./state/productsSlice";
import { fetchUsers } from "./state/usersSlice";
import { fetchCategories } from "./state/categoriesSlice";
import RequireAuth from "./auth/RequireAuth";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/UI/Layout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import OneProductPage from "./pages/OneProductPage";
import OrdersPage from "./pages/OrdersPage";
import OneOrderPage from "./pages/OneOrderPage";
import UsersPage from "./pages/UsersPage";
import OneUserPage from "./pages/OneUserPage";
import BlockedUserPage from "./pages/BlockedUserPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchLoggedUserData(user.uid));
      } else {
        dispatch(clearLoggedUserData());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route path="/blocked" exact element={<BlockedUserPage />} />
        <Route element={<Layout />}>
          <Route path="/" exact element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<OneProductPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OneOrderPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<OneUserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
