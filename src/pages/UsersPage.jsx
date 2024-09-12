import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateUserBlock } from "../state/usersSlice";
import useDocTitle from "../hooks/useDocTitle";
import { CheckIcon, NoSymbolIcon } from "@heroicons/react/16/solid";
import IconButton from "../components/UI/buttons/IconButton";
import ViewIconLink from "../components/UI/Links/ViewIconLink";
import Table from "../components/UI/Table";
import Message from "../components/UI/Message";
import { useState } from "react";

function UsersPage() {
  const loggedUserData = useSelector((state) => state.loggedUser.data);
  const users = useSelector((state) => state.users.array);
  const usersNum = useSelector((state) => state.users.number);
  const usersLoading = useSelector((state) => state.users.isLoading);
  const usersError = useSelector((state) => state.users.error);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useDocTitle("Users");

  if (usersLoading) return <Loader />;

  if (usersError) return <Message type="error" message={usersError} />;

  const handleBlock = async (newStatus, userId) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        isBlocked: newStatus,
      });
      dispatch(updateUserBlock({ newStatus, userId }));
    } catch (error) {
      setError(error.message);
    }
  };

  const tableCols = [
    "User ID",
    "Full Name",
    "Mobile",
    "Email",
    "Status",
    loggedUserData.isAdmin && "Actions",
  ];

  return (
    <>
      <h2 className="text-3xl font-semibold w-fit bg-blue-100 p-4 rounded-lg shadow-md mb-4">
        My Users
      </h2>
      {error && <div className="text-red-500 text-center pb-4">{error}</div>}
      {usersNum === 0 ? (
        <Message type="hint" message={"No Users Yet!"} />
      ) : (
        <Table tableCols={tableCols}>
          {users.map(
            (user) =>
              !user.isAdmin && (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.fullName}</td>
                  <td className="py-2 px-4">{user.phoneNumber}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Not Blocked"}
                    </span>
                  </td>
                  {loggedUserData.isAdmin && (
                    <td>
                      <span className="flex justify-center items-center py-2 px-4 space-x-2">
                        <ViewIconLink to={`${user.id}`} />
                        {user.isBlocked ? (
                          <IconButton
                            Icon={CheckIcon}
                            className="bg-green-500 text-white hover:bg-green-600"
                            onIconClick={() => handleBlock(false, user.id)}
                          />
                        ) : (
                          <IconButton
                            Icon={NoSymbolIcon}
                            className="bg-red-600 text-white hover:bg-red-700"
                            onIconClick={() => handleBlock(true, user.id)}
                          />
                        )}
                      </span>
                    </td>
                  )}
                </tr>
              )
          )}
        </Table>
      )}
    </>
  );
}
export default UsersPage;
