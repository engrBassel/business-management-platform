import { doc, setDoc } from "firebase/firestore";
import Modal from "../UI/Modal";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../state/ordersSlice";
import EditingButtons from "../UI/buttons/edit/EditingButtons";
import { useState } from "react";
import OrderForm from "./OrderForm";

const EditOrderModal = ({ isOpen, onClose, order }) => {
  const products = useSelector((state) => state.products.array);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    productTitle: order.productTitle,
    quantity: order.quantity,
    customerName: order.customerName,
    customerAddress: order.customerAddress,
    customerPhone: order.customerPhone,
    status: order.status,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const currProduct = products.find(
        (product) => product.title === values.productTitle
      );
      const newPrice = +values.quantity * +currProduct.price;
      const newOrder = {
        totalPrice: newPrice,
        ...values,
      };
      const docRef = doc(db, "orders", order.id);
      await setDoc(docRef, newOrder);

      dispatch(
        updateOrder({
          id: order.id,
          ...newOrder,
        })
      );
      resetForm();
      onClose();
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Order">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <OrderForm
        initialValues={initialValues}
        onFormSubmit={handleSubmit}
        products={products}
        OrderButtons={EditingButtons}
        onClose={onClose}
      />
    </Modal>
  );
};

export default EditOrderModal;
