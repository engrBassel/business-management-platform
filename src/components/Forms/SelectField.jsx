import { ErrorMessage, Field } from "formik";

function SelectField({ fieldName, firstOptLabel, children }) {
  return (
    <div>
      <Field
        as="select"
        name={fieldName}
        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
      >
        <option value="" label={`Select ${firstOptLabel}`} />
        {children}
      </Field>
      <ErrorMessage name={fieldName} component="div" className="text-red-500" />
    </div>
  );
}
export default SelectField;
