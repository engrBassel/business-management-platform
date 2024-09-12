import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputFields from "../Forms/InputFields";
import SelectField from "../Forms/SelectField";
import TextareaField from "../Forms/TextareaField";
import { capitalize } from "../../utils/capitalize";

function ProductForm({
  initialValues,
  onFormSubmit,
  categories,
  ProductButtons,
  onClose,
}) {
  const inputFields = [
    {
      inputType: "text",
      inputName: "title",
      inputPlaceholder: "Product Title",
    },
    {
      inputType: "text",
      inputName: "image",
      inputPlaceholder: "Image URL",
    },
    {
      inputType: "number",
      inputName: "price",
      inputPlaceholder: "Price",
    },
  ];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Product title is required"),
    image: Yup.string()
      .url("Invalid image URL")
      .required("Product image URL is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-4">
          <InputFields inputFields={inputFields} />

          <SelectField fieldName="category" firstOptLabel="Category">
            {categories.map((category, indx) => (
              <option
                key={indx}
                value={category}
                label={capitalize(category)}
              />
            ))}
          </SelectField>

          <TextareaField
            fieldName="description"
            fieldPlaceholder="Description"
          />

          <ProductButtons onClose={onClose} isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
export default ProductForm;
