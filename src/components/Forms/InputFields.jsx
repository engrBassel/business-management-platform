import { ErrorMessage, Field } from "formik";

function InputFields({ inputFields }) {
  return (
    <>
      {inputFields.map((input, indx) => (
        <div key={indx}>
          <Field
            type={input.inputType}
            name={input.inputName}
            placeholder={input.inputPlaceholder}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <ErrorMessage
            name={input.inputName}
            component="div"
            className="text-red-500"
          />
        </div>
      ))}
    </>
  );
}
export default InputFields;
