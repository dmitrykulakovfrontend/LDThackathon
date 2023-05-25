import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormikField from "../../components/Forms/FormikField";
import FormikForm from "../../components/Forms/FormikForm";
import { API_URL } from "@/constants";

interface Values {
  name: string;
  username: string;
  email: string;
  organisation: string;
  inn: string;
  website: string;
  country: string;
  city: string;
  business_type: string;
  job: string;
  password: string;
}
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  organisation: Yup.string().required("Organisation is required"),
  inn: Yup.string().required("INN is required"),
  website: Yup.string().required("Website is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  business_type: Yup.string().required("Business type is required"),
  job: Yup.string().required("Job is required"),
  password: Yup.string().min(8).required("Password is required"),
});
function Signup() {
  const navigate = useNavigate();
  async function handleSubmit(form: Values) {
    console.log(`${API_URL}/auth/signup`);
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/");
    } else if (res.status === 400) {
      console.log("Incorrect form");
    }
  }

  const initialValues = {
    name: "",
    username: "",
    email: "",
    organisation: "",
    inn: "",
    website: "",
    country: "",
    city: "",
    business_type: "",
    job: "",
    password: "",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-12 sm:px-6 lg:px-8">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignUpSchema}
      >
        {({ errors, touched }) => (
          <FormikForm className="flex flex-col w-full max-w-xl gap-8 px-20 py-14 border shadow-[0_0_1px_0px_rgb(215,22,22)_inset,_0_0_1px_0px_rgb(215,22,22)] border-ldt-red rounded-xl">
            <h1 className="mx-auto text-3xl font-semibold">Регистрация</h1>
            <FormikField
              type="text"
              name="name"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.name}
              errors={errors.name}
            >
              ФИО
            </FormikField>
            <FormikField
              type="text"
              name="username"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.username}
              errors={errors.username}
            >
              Имя аккаунта
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
            <FormikField
              type="email"
              name="email"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.email}
              errors={errors.email}
            >
              Почта
            </FormikField>
            <FormikField
              type="text"
              name="organisation"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.organisation}
              errors={errors.organisation}
            >
              Организация
            </FormikField>
            <FormikField
              type="text"
              name="inn"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.inn}
              errors={errors.inn}
            >
              ИНН
            </FormikField>
            <FormikField
              type="url"
              name="website"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.website}
              errors={errors.website}
            >
              Вебсайт
            </FormikField>
            <FormikField
              type="text"
              name="country"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.country}
              errors={errors.country}
            >
              Страна
            </FormikField>
            <FormikField
              type="text"
              name="city"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.city}
              errors={errors.city}
            >
              Город
            </FormikField>
            <FormikField
              type="text"
              name="business_type"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.business_type}
              errors={errors.business_type}
            >
              Тип бизнеса
            </FormikField>
            <FormikField
              type="text"
              name="job"
              placeholder="alexandra.moroz1703@gmail.com"
              touched={touched.job}
              errors={errors.job}
            >
              job
            </FormikField>
            <button
              type="submit"
              className="px-8 py-2 mx-auto tracking-wide text-white rounded-xl w-fit bg-ldt-red"
            >
              Зарегистрироваться
            </button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
