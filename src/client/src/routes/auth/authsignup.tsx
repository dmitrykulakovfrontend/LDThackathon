import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormikField from "../../components/Forms/FormikField";
import FormikForm from "../../components/Forms/FormikForm";
import { API_URL } from "@/constants";
import { useState } from "react";

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
const steps = {
  1: "Персональные данные",
  2: "Организация",
  3: "Установка пароля",
  4: "Завершение регистрации",
} as const;
function AuthSignUp() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold max-sm:text-xl">Регистрация</h1>
        <Link to="/auth/signin" className="text-blue-500">
          Уже есть аккаунт
        </Link>
      </div>
      <div className="flex justify-between w-full">
        {Object.entries(steps).map(([stepPage, text]) => (
          <div
            className={`flex items-center justify-start w-full max-w-xs text-center bg-gradient-to-r ${
              +stepPage === page ? "from-ldt-red" : "from-ldt-gray"
            } via-white to-white`}
          >
            <span
              className={`ml-2 text-3xl font-extrabold  ${
                +stepPage === page ? "text-white" : "text-ldt-dark-gray"
              }`}
            >
              {stepPage}
            </span>
            <span
              className={`mx-auto uppercase ${
                +stepPage === page ? "text-ldt-red" : "text-black"
              }`}
            >
              {text}
            </span>
          </div>
        ))}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignUpSchema}
      >
        {({ errors, touched }) => (
          <FormikForm>
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

export default AuthSignUp;
