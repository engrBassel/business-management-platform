import { ErrorMessage, Field } from "formik";

function TextareaField({ fieldName, fieldPlaceholder }) {
  return (
    <div>
      <Field
        as="textarea"
        name={fieldName}
        placeholder={fieldPlaceholder}
        className="block w-full min-h-16 max-h-20 border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage name={fieldName} component="div" className="text-red-500" />
    </div>
  );
}
export default TextareaField;
