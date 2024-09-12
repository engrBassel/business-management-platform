import { useSelector } from "react-redux";
import Metrics from "../components/Dashboard/Metrics";
import useDocTitle from "../hooks/useDocTitle";

const DashboardPage = () => {
  const loggedUserData = useSelector((state) => state.loggedUser.data);

  useDocTitle("Dashboard");

  return (
    <>
      <h1 className="relative text-3xl font-semibold w-fit bg-blue-100 p-4 rounded-lg shadow-md">
        Welcome, {`${loggedUserData.fullName}`}{" "}
        <span
          className={`absolute top-[-5px] right-0 px-2 py-1 text-xs font-semibold rounded-full shadow-md ${
            loggedUserData.isAdmin
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {loggedUserData.isAdmin ? "Admin" : "User"}
        </span>
      </h1>
      <div className="pt-4">
        <Metrics />
      </div>
    </>
  );
};

export default DashboardPage;
