import { useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteProduct } from "../../state/productsSlice";
import DeletingButtons from "../UI/buttons/delete/DeletingButtons";

const DeleteProductModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "products", product.id));
      dispatch(deleteProduct(product.id));
      onClose();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <p>Are you sure you want to delete: {`"${product.title}"`}?</p>
      <DeletingButtons onClose={onClose} onDelete={handleDelete} />
    </Modal>
  );
};

export default DeleteProductModal;
