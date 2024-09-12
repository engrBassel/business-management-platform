import IconButton from "../IconButton";
import { PencilIcon } from "@heroicons/react/16/solid";

function EditIconButton({ onEdit }) {
  return (
    <IconButton
      Icon={PencilIcon}
      className="bg-yellow-400 text-slate-900 hover:bg-yellow-500"
      onIconClick={onEdit}
    />
  );
}
export default EditIconButton;
