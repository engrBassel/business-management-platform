import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import { capitalize } from "../utils/capitalize";
import BackIconLink from "../components/UI/Links/BackIconLink";
import Message from "../components/UI/Message";

function OneOrderPage() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.array);
  const currOrder = orders.find((order) => order.id === id);

  useDocTitle("Order");

  const orderDetails = [
    { name: "Order ID", value: currOrder.id },
    { name: "Product", value: currOrder.productTitle },
    { name: "Quantity", value: currOrder.quantity },
    { name: "Total Price", value: currOrder.totalPrice },
    { name: "Customer Name", value: currOrder.customerName },
    { name: "Customer Address", value: currOrder.customerAddress },
    { name: "Customer Phone", value: currOrder.customerPhone },
    { name: "Order Status", value: capitalize(currOrder.status) },
  ];

  return (
    <>
      <div className="pb-4">
        <BackIconLink />
      </div>

      {!currOrder ? (
        <Message type="error" message="No such order!" />
      ) : (
        <div className="md:max-w-md mx-auto grid gap-4 p-4 bg-blue-100 rounded-md">
          {orderDetails.map((object, indx) => (
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
export default OneOrderPage;
