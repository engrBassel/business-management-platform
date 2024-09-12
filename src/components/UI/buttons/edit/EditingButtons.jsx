import CancelButton from "../CancelButton";
import EditButton from "./EditButton";

function EditingButtons({ onClose, isSubmitting }) {
  return (
    <div className="flex justify-end gap-4">
      <CancelButton onClose={onClose} />
      <EditButton isSubmitting={isSubmitting} />
    </div>
  );
}
export default EditingButtons;
