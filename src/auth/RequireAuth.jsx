import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";

function RequireAuth() {
  const loggedUserData = useSelector((state) => state.loggedUser.data);
  const loggedUserDataIsLoading = useSelector(
    (state) => state.loggedUser.isLoading
  );
  const loggedUserDataError = useSelector((state) => state.loggedUser.error);
  const location = useLocation();

  if (loggedUserDataIsLoading) return <Loader />;

  if (loggedUserDataError) {
    return (
      <div className="min-h-svh flex justify-center items-center">
        <Message type="error" message={loggedUserDataError} />
      </div>
    );
  }

  if (!loggedUserData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
export default RequireAuth;
