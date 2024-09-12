import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BlockedUserPage() {
  const loggedUserIsBlocked = useSelector(
    (state) => state.loggedUser.data.isBlocked
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUserIsBlocked) {
      navigate("/");
    } else {
      const timer = setTimeout(() => {
        signOut(auth)
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            throw new Error(error);
          });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loggedUserIsBlocked, navigate]);

  return (
    <div className="min-h-svh bg-gray-50 text-red-600 flex justify-center items-center text-center">
      <div>
        <h2 className="text-4xl font-bold pb-2">Sorry, You are Blocked!</h2>
        <p className="text-xl text-gray-500">You will be signed out!</p>
      </div>
    </div>
  );
}
export default BlockedUserPage;
