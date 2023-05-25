import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormikField from "../../components/Forms/FormikField";
import FormikForm from "../../components/Forms/FormikForm";

interface Values {
  login: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов")
    .required("Обязательное поле"),
});
function SignIn() {
  const navigate = useNavigate();
  async function handleSubmit({ login, password }: Values) {
    const res = await fetch("../api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ usernameOrEmail: login, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/");
    } else if (res.status === 400) {
      console.log("Incorrect form");
    }
    console.log({ login, password });
  }

  const initialValues = {
    login: "",
    password: "",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-12 sm:px-6 lg:px-8">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignInSchema}
      >
        {({ errors, touched }) => (
          <FormikForm className="flex flex-col w-full max-w-xl gap-8 px-20 py-14 border shadow-[0_0_1px_0px_rgb(215,22,22)_inset,_0_0_1px_0px_rgb(215,22,22)] border-ldt-red rounded-xl">
            <h1 className="mx-auto text-3xl font-semibold">Авторизация</h1>
            <FormikField
              type="text"
              name="login"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.login}
              errors={errors.login}
            >
              Логин / Адрес электронной почты
            </FormikField>
            <FormikField
              type="password"
              name="password"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.password}
              errors={errors.password}
            >
              Пароль
            </FormikField>
            <button
              type="submit"
              className="px-8 py-2 mx-auto tracking-wide text-white rounded-xl w-fit bg-ldt-red"
            >
              Войти
            </button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}

export default SignIn;
