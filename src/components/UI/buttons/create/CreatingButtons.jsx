import CancelButton from "../CancelButton";
import CreateButton from "./CreateButton";

function CreatingButtons({ onClose, isSubmitting }) {
  return (
    <div className="flex justify-end gap-4">
      <CancelButton onClose={onClose} />
      <CreateButton isSubmitting={isSubmitting} />
    </div>
  );
}
export default CreatingButtons;
