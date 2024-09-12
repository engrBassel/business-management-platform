import { Form, Formik } from "formik";
import * as Yup from "yup";
import SelectField from "../Forms/SelectField";
import { capitalize } from "../../utils/capitalize";
import InputFields from "../Forms/InputFields";

function OrderForm({
  initialValues,
  onFormSubmit,
  products,
  OrderButtons,
  onClose,
}) {
  const inputFields = [
    {
      inputType: "number",
      inputName: "quantity",
      inputPlaceholder: "Quantity",
    },
    {
      inputType: "text",
      inputName: "customerName",
      inputPlaceholder: "Customer Name",
    },
    {
      inputType: "text",
      inputName: "customerAddress",
      inputPlaceholder: "Customer Address",
    },
    {
      inputType: "text",
      inputName: "customerPhone",
      inputPlaceholder: "Customer Phone",
    },
  ];

  const validationSchema = Yup.object().shape({
    productTitle: Yup.string().required("Product title is required"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .positive("Quantity must be greater than zero")
      .integer("Quantity must be an integer"),
    customerName: Yup.string().required("Customer name is required"),
    customerAddress: Yup.string().required("Customer address is required"),
    customerPhone: Yup.string()
      .required("Customer phone number is required")
      .matches(/^\d{11}$/, "Customer phone number must be exactly 11 digits"),
    status: Yup.string()
      .oneOf(
        ["pending", "shipped", "delivered"],
        "Status must be one of: pending, shipped, delivered"
      )
      .required("Status is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-4">
          <SelectField fieldName="productTitle" firstOptLabel="Product">
            {products.map((product) => (
              <option
                key={product.id}
                value={product.title}
                label={capitalize(product.title)}
              />
            ))}
          </SelectField>

          <InputFields inputFields={inputFields} />

          <SelectField fieldName="status" firstOptLabel="Status">
            <option value="pending" label="Pending" />
            <option value="shipped" label="Shipped" />
            <option value="delivered" label="Delivered" />
          </SelectField>

          <OrderButtons onClose={onClose} isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
}
export default OrderForm;
