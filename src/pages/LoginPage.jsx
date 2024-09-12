import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useDocTitle from "../hooks/useDocTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLoggedUserData } from "../state/loggedUserSlice";
import { useState } from "react";
import InputFields from "../components/Forms/InputFields";
import Button from "../components/UI/buttons/Button";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useDocTitle("Login");

  const inputFields = [
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
  ];

  const handleSubmit = async (
    { email, password },
    { setSubmitting, resetForm }
  ) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      resetForm();
      dispatch(fetchLoggedUserData(user.uid));

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-svh p-4 bg-gray-50">
      <div className="bg-blue-100 px-4 py-10 rounded-md shadow-md max-w-sm w-full">
        <h2 className="text-3xl font-bold pb-6 text-center">Login</h2>

        {error && <div className="text-red-500 text-center pb-4">{error}</div>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-6">
              <InputFields inputFields={inputFields} />

              <Button
                type="submit"
                className="w-full bg-slate-800 text-white font-semibold rounded-md hover:text-blue-400"
                text={isSubmitting ? "Logging in..." : "Log In"}
              />
            </Form>
          )}
        </Formik>

        <div className="pt-4 flex gap-2">
          <p>No Account?</p>

          <Link
            to="/signup"
            className="text-blue-700 underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
