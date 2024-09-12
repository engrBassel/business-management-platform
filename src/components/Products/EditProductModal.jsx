import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { updateProduct } from "../../state/productsSlice";
import EditingButtons from "../UI/buttons/edit/EditingButtons";
import { useState } from "react";
import ProductForm from "./ProductForm";

const EditProductModal = ({ isOpen, onClose, product }) => {
  const categories = useSelector((state) => state.categories.array);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    title: product.title,
    image: product.image,
    price: product.price,
    description: product.description,
    category: product.category,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const docRef = doc(db, "products", product.id);
      await setDoc(docRef, {
        ...values,
      });
      resetForm();
      dispatch(updateProduct({ id: product.id, ...values }));
      onClose();
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Product">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ProductForm
        initialValues={initialValues}
        onFormSubmit={handleSubmit}
        categories={categories}
        ProductButtons={EditingButtons}
        onClose={onClose}
      />
    </Modal>
  );
};

export default EditProductModal;
