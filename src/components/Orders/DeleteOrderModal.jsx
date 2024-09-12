import { doc, deleteDoc } from "firebase/firestore";
import Modal from "../UI/Modal";
import { db } from "../../firebase";
import { deleteOrder } from "../../state/ordersSlice";
import { useDispatch } from "react-redux";
import DeletingButtons from "../UI/buttons/delete/DeletingButtons";

const DeleteOrderModal = ({ isOpen, onClose, orderId }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      dispatch(deleteOrder(orderId));
      onClose();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Order">
      <p>Are you sure you want to delete the order with ID: {`${orderId}`}?</p>
      <DeletingButtons onClose={onClose} onDelete={handleDelete} />
    </Modal>
  );
};

export default DeleteOrderModal;
