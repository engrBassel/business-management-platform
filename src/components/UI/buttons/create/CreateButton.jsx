import Button from "../Button";

function CreateButton({ isSubmitting }) {
  return (
    <Button
      type="submit"
      className="bg-slate-800 text-white hover:text-blue-400"
      text={isSubmitting ? "Creating..." : "Create"}
      disabled={isSubmitting}
    />
  );
}
export default CreateButton;
