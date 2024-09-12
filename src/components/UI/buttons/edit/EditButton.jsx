import Button from "../Button";

function EditButton({ isSubmitting }) {
  return (
    <Button
      type="submit"
      className="bg-yellow-400 text-slate-900 hover:bg-yellow-500"
      text={isSubmitting ? "Updating..." : "Update"}
      disabled={isSubmitting}
    />
  );
}
export default EditButton;
