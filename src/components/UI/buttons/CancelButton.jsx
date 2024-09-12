import Button from "./Button";

function CancelButton({ onClose }) {
  return (
    <Button
      className="bg-gray-500 text-white hover:bg-gray-600"
      text="Cancel"
      onButtonClick={onClose}
    />
  );
}
export default CancelButton;
