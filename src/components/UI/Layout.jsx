import { signOut } from "firebase/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "./buttons/Button";

const Layout = () => {
  const loggedUserData = useSelector((state) => state.loggedUser.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUserData.isBlocked) {
      navigate("/blocked");
    }
  }, [loggedUserData.isBlocked, navigate]);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  return (
    <div className="min-h-svh md:h-svh md:overflow-hidden bg-gray-50 text-slate-900 font-[Arial]">
      <header className="bg-blue-100 shadow-md">
        <div className="container mx-auto flex justify-between gap-2 items-center p-4">
          <h1 className="text-4xl text-slate-900 font-bold hover:text-slate-700 transition-colors">
            <Link to="/">My Business</Link>
          </h1>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            text="Logout"
            onButtonClick={handleLogout}
          />
        </div>
      </header>

      <div className="md:h-[calc(100svh-72px)] md:flex md:gap-4 p-4">
        <aside className="p-4 bg-slate-800 text-white rounded-lg">
          <ul className="grid justify-center gap-4 text-center md:text-left">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 font-bold" : "hover:text-blue-400"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 font-bold" : "hover:text-blue-400"
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 font-bold" : "hover:text-blue-400"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? "text-yellow-300 font-bold" : "hover:text-blue-400"
                }
              >
                Users
              </NavLink>
            </li>
          </ul>
        </aside>
        <main className="flex-1 overflow-y-auto py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
