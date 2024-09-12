import { TrashIcon } from "@heroicons/react/16/solid";
import IconButton from "../IconButton";

function DeleteIconButton({ onDelete }) {
  return (
    <IconButton
      Icon={TrashIcon}
      className="bg-red-600 text-white hover:bg-red-700"
      onIconClick={onDelete}
    />
  );
}
export default DeleteIconButton;
