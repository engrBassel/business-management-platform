import { db, auth } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDocTitle from "../hooks/useDocTitle";
import InputFields from "../components/Forms/InputFields";
import Button from "../components/UI/buttons/Button";

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits.")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useDocTitle("Signup");

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const inputFields = [
    {
      inputType: "text",
      inputName: "fullName",
      inputPlaceholder: "Full Name",
    },
    {
      inputType: "text",
      inputName: "phoneNumber",
      inputPlaceholder: "Phone Number",
    },
    {
      inputType: "email",
      inputName: "email",
      inputPlaceholder: "Email",
    },
    {
      inputType: "password",
      inputName: "password",
      inputPlaceholder: "Password",
    },
    {
      inputType: "password",
      inputName: "confirmPassword",
      inputPlaceholder: "Confirm Password",
    },
  ];

  const handleSubmit = async (
    { fullName, phoneNumber, email, password },
    { setSubmitting, resetForm }
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = doc(db, "users", user.uid);

      await setDoc(docRef, {
        fullName,
        phoneNumber,
        email,
        isAdmin: false,
        isBlocked: false,
        createdAt: serverTimestamp(),
      });

      resetForm();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-svh p-4 bg-gray-50">
      <div className="bg-blue-100 p-4 rounded-md shadow-md max-w-sm w-full">
        <h2 className="text-3xl font-bold pb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4">
              <InputFields inputFields={inputFields} />
              <Button
                type="submit"
                className="w-full bg-slate-800 text-white font-semibold rounded-md hover:text-blue-400"
                text={isSubmitting ? "Signing up..." : "Sign Up"}
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
        <div className="pt-4 flex gap-2">
          <p>Have account?</p>
          <Link
            to="/login"
            className="text-blue-700 underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
