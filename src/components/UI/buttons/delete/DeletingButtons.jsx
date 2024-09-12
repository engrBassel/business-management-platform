import CancelButton from "../CancelButton";
import DeleteButton from "./DeleteButton";

function DeletingButtons({ onClose, onDelete }) {
  return (
    <div className="flex justify-end gap-4 pt-4">
      <CancelButton onClose={onClose} />
      <DeleteButton onDelete={onDelete} />
    </div>
  );
}
export default DeletingButtons;
