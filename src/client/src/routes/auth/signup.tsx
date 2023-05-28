import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FormikField from "../../components/Forms/FormikField";
import FormikForm from "../../components/Forms/FormikForm";
import { API_URL } from "@/constants";

type Values = typeof initialValues;
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  email: Yup.string()
    .email("Неправильный формат почты")
    .required("Обязательное поле"),
  organisation: Yup.string().required("Обязательное поле"),
  inn: Yup.string().required("Обязательное поле"),
  website: Yup.string().required("Обязательное поле"),
  country: Yup.string().required("Обязательное поле"),
  city: Yup.string().required("Обязательное поле"),
  business_type: Yup.string().required("Обязательное поле"),
  job: Yup.string().required("Обязательное поле"),
  password: Yup.string().min(8).required("Обязательное поле"),
});

const initialValues = {
  name: "",
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
function Signup() {
  const navigate = useNavigate();
  async function handleSubmit(form: Values) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-12 sm:px-6 lg:px-8">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignUpSchema}
      >
        {({ errors, touched }) => (
          <FormikForm className="flex flex-col w-full max-w-xl gap-8 px-20 py-14 border shadow-[0_0_1px_0px_rgb(215,22,22)_inset,_0_0_1px_0px_rgb(215,22,22)] border-ldt-red rounded-xl max-sm:py-7 max-sm:px-10">
            <h1 className="mx-auto text-3xl font-semibold max-sm:text-xl">
              Регистрация
            </h1>
            <FormikField
              type="text"
              name="name"
              placeholder="Иванов Иван Иванович"
              touched={touched.name}
              errors={errors.name}
              title="ФИО"
            />
            <FormikField
              type="password"
              name="password"
              placeholder="Минимум 8 символов"
              touched={touched.password}
              errors={errors.password}
              title="Пароль"
            />
            <FormikField
              type="email"
              name="email"
              placeholder="ivan.ivanov1999@gmail.com"
              touched={touched.email}
              errors={errors.email}
              title="Почта"
            />
            <FormikField
              type="text"
              name="organisation"
              placeholder="ООО 'Рога и копыта'"
              touched={touched.organisation}
              errors={errors.organisation}
              title="Организация"
            />
            <FormikField
              type="text"
              name="inn"
              placeholder="Только числа"
              touched={touched.inn}
              errors={errors.inn}
              title="ИНН"
            />
            <FormikField
              type="url"
              name="website"
              placeholder="mos.ru"
              touched={touched.website}
              errors={errors.website}
              title="Вебсайт"
            />
            <FormikField
              type="text"
              name="country"
              placeholder="Россия"
              touched={touched.country}
              errors={errors.country}
              title="Страна"
            />
            <FormikField
              type="text"
              name="city"
              placeholder="Москва"
              touched={touched.city}
              errors={errors.city}
              title="Город"
            />
            <FormikField
              type="text"
              name="business_type"
              placeholder="Пищевая промышленность"
              touched={touched.business_type}
              errors={errors.business_type}
              title="Тип бизнеса"
            />
            <FormikField
              type="text"
              name="job"
              placeholder="Менеджер"
              touched={touched.job}
              errors={errors.job}
              title="Должность"
            />
            <button
              type="submit"
              className="px-8 py-2 mx-auto tracking-wide text-white rounded-xl w-fit bg-ldt-red max-sm:px-4 max-sm:py-2"
            >
              Регистрация
            </button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
