import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { addProduct } from "../../state/productsSlice";
import CreatingButtons from "../UI/buttons/create/CreatingButtons";
import { useState } from "react";
import ProductForm from "./ProductForm";

const CreateProductModal = ({ isOpen, onClose }) => {
  const categories = useSelector((state) => state.categories.array);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    image: "",
    price: "",
    description: "",
    category: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { id } = await addDoc(collection(db, "products"), {
        ...values,
      });
      dispatch(
        addProduct({
          id,
          ...values,
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
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Product">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ProductForm
        initialValues={initialValues}
        onFormSubmit={handleSubmit}
        categories={categories}
        ProductButtons={CreatingButtons}
        onClose={onClose}
      />
    </Modal>
  );
};

export default CreateProductModal;
