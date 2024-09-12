import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import BackIconLink from "../components/UI/Links/BackIconLink";
import { formatDateTime } from "../utils/formatDateTime";
import Message from "../components/UI/Message";

function OneUserPage() {
  const { id } = useParams();
  const users = useSelector((state) => state.users.array);
  const currUser = users.find((user) => user.id === id);

  useDocTitle("User");

  const userDetails = [
    { name: "User ID", value: currUser.id },
    { name: "Full Name", value: currUser.fullName },
    { name: "Email", value: currUser.email },
    { name: "Mobile", value: currUser.phoneNumber },
    { name: "Status", value: currUser.isBlocked ? "Blocked" : "Not Blocked" },
    { name: "Created at", value: formatDateTime(currUser.createdAt) },
  ];

  return (
    <>
      <div className="pb-4">
        <BackIconLink />
      </div>
      {!currUser ? (
        <Message type="error" message="No such user!" />
      ) : (
        <div className="md:max-w-md mx-auto grid gap-4 p-4 bg-blue-100 rounded-md">
          {userDetails.length > 0 &&
            userDetails.map((object, indx) => (
              <p key={indx} className="bg-white p-2 rounded-md">
                <span className="font-semibold">{object.name}: </span>
                {object.value}
              </p>
            ))}
        </div>
      )}
    </>
  );
}
export default OneUserPage;
