import { collection, addDoc } from "firebase/firestore";
import Modal from "../UI/Modal";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../state/ordersSlice";
import CreatingButtons from "../UI/buttons/create/CreatingButtons";
import { useState } from "react";
import OrderForm from "./OrderForm";

const CreateOrderModal = ({ isOpen, onClose }) => {
  const products = useSelector((state) => state.products.array);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    productTitle: "",
    quantity: "",
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    status: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const currProduct = products.find(
        (product) => product.title === values.productTitle
      );
      const totalPrice = +values.quantity * +currProduct.price;
      const newOrder = {
        totalPrice,
        ...values,
      };
      const { id } = await addDoc(collection(db, "orders"), newOrder);
      dispatch(
        addOrder({
          id,
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
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Order">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <OrderForm
        initialValues={initialValues}
        onFormSubmit={handleSubmit}
        products={products}
        OrderButtons={CreatingButtons}
        onClose={onClose}
      />
    </Modal>
  );
};

export default CreateOrderModal;
