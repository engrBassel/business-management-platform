import Button from "../Button";

function DeleteButton({ onDelete }) {
  return (
    <Button
      className="text-white bg-red-600 hover:bg-white hover:text-red-600 border hover:border-red-600"
      text="Delete"
      onButtonClick={onDelete}
    />
  );
}
export default DeleteButton;
