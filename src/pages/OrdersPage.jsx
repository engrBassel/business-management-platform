import { useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import { useState } from "react";
import useDocTitle from "../hooks/useDocTitle";
import { capitalize } from "../utils/capitalize";
import Button from "../components/UI/buttons/Button";
import EditIconButton from "../components/UI/buttons/edit/EditIconButton";
import DeleteIconButton from "../components/UI/buttons/delete/DeleteIconButton";
import ViewIconLink from "../components/UI/Links/ViewIconLink";
import Table from "../components/UI/Table";
import Message from "../components/UI/Message";
import CreateOrderModal from "../components/Orders/CreateOrderModal";
import EditOrderModal from "../components/Orders/EditOrderModal";
import DeleteOrderModal from "../components/Orders/DeleteOrderModal";

function OrdersPage() {
  const orders = useSelector((state) => state.orders.array);
  const ordersNum = useSelector((state) => state.orders.number);
  const ordersIsLoading = useSelector((state) => state.orders.isLoading);
  const ordersError = useSelector((state) => state.orders.error);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idForModal, setIdForModal] = useState("");
  const [orderForModal, setOrderForModal] = useState({});

  useDocTitle("Orders");

  function handleEdit(orderToEdit) {
    setIsEditModalOpen(() => {
      setOrderForModal(orderToEdit);
      return true;
    });
  }

  function handleDelete(orderToDeleteId) {
    setIsDeleteModalOpen(() => {
      setIdForModal(orderToDeleteId);
      return true;
    });
  }

  if (ordersIsLoading) return <Loader />;

  if (ordersError) return <Message type="error" message={ordersError} />;

  const tableCols = [
    "Order ID",
    "Product",
    "Quantity",
    "Customer",
    "Status",
    "Actions",
  ];

  return (
    <div>
      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        order={orderForModal}
      />
      <DeleteOrderModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        orderId={idForModal}
      />
      <div className="flex justify-between items-center gap-2 pb-4">
        <h2 className="text-3xl font-semibold w-fit bg-blue-100 p-4 rounded-lg shadow-md">
          My Orders
        </h2>
        <Button
          className="bg-slate-800 text-white hover:text-blue-400"
          text="New Order"
          onButtonClick={() => setIsCreateModalOpen(true)}
        />
      </div>
      {ordersNum === 0 ? (
        <Message type="hint" message={"No Orders Yet!"} />
      ) : (
        <Table tableCols={tableCols}>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.productTitle}</td>
              <td className="py-2 px-4">{order.quantity}</td>
              <td className="py-2 px-4">{order.customerName}</td>
              <td className="py-2 px-4">
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : order.status === "shipped"
                      ? "bg-white text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {capitalize(order.status)}
                </span>
              </td>

              <td>
                <span className="flex justify-center items-center py-2 px-4 space-x-2">
                  <ViewIconLink to={`${order.id}`} />
                  <EditIconButton onEdit={() => handleEdit(order)} />
                  <DeleteIconButton onDelete={() => handleDelete(order.id)} />
                </span>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}

export default OrdersPage;
