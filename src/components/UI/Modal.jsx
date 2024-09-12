import { XMarkIcon } from "@heroicons/react/16/solid";
import IconButton from "../UI/buttons/IconButton";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-2 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[650px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <IconButton
            Icon={XMarkIcon}
            className="bg-red-600 text-white hover:text-red-600 hover:bg-white hover:border hover:border-red-600"
            onIconClick={onClose}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
