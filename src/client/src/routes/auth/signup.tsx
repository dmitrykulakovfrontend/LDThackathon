import { Formik, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormikField from "../../components/Forms/FormikField";
import FormikForm from "../../components/Forms/FormikForm";
import { API_URL } from "@/constants";
import { useState } from "react";
import industryTypes from "@/industry.json";

type Values = typeof initialValues;
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Имя обязательное поле"),
  secondName: Yup.string(),
  fatherName: Yup.string(),
  phone: Yup.string().matches(
    /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
    "Неправильный формат номера"
  ),
  email: Yup.string()
    .email("Неправильный формат почты")
    .required("Почта обязательное поле"),
  organisation: Yup.string().required("Имя организации обязательное поле"),
  inn: Yup.string().required("ИНН обязательное поле"),
  website: Yup.string(),
  country: Yup.string(),
  city: Yup.string(),
  business_type: Yup.string().required("Тип бизнеса обязательное поле"),
  job: Yup.string(),
  password: Yup.string()
    .min(8, "Минимум 8 символов")
    .required("Пароль обязательное поле"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Повторите пароль"),
});

const initialValues = {
  firstName: "",
  secondName: "",
  fatherName: "",
  phone: "",
  email: "",
  organisation: "",
  inn: "",
  website: "",
  country: "",
  city: "",
  business_type: "",
  job: "",
  password: "",
  passwordConfirmation: "",
};
const steps = {
  1: "Персональные данные",
  2: "Организация",
  3: "Установка пароля",
  4: "Завершение регистрации",
} as const;

/**
 * Страница регистрации пользователя
 * @returns {any}
 */
function AuthSignUp() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  async function handleSubmit(form: Values) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name: `${form.secondName} ${form.firstName} ${form.fatherName}`,
        phone: form.phone,
        email: form.email,
        organisation: form.organisation,
        inn: form.inn,
        website: form.website,
        country: form.country,
        city: form.city,
        business_type: form.business_type,
        job: form.job,
        password: form.password,
      }),
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
        <Link
          to="/auth/signin"
          className="text-blue-500 underline underline-offset-2"
        >
          Уже есть аккаунт?
        </Link>
      </div>
      <div className="flex justify-between w-full my-8 max-md:flex-col">
        {Object.entries(steps).map(([stepPage, text]) => (
          <div
            key={stepPage}
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
              className={`ml-auto mr-4 uppercase ${
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
          <FormikForm className="w-full">
            <PageRender page={page} errors={errors} touched={touched} />

            <div className="flex items-center justify-between w-full gap-4 my-8 max-sm:flex-col">
              <button
                type="button"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`px-8 py-2 bg-white border-2 rounded-md transition-all text-ldt-red border-ldt-red hover:border-red-700 hover:text-red-700 hover:scale-110 active:scale-95 ${
                  page === 1 ? " opacity-25 hover:cursor-not-allowed" : ""
                } `}
              >
                Назад
              </button>
              <button
                type={page === 3 ? "submit" : "button"}
                onClick={page === 3 ? undefined : () => setPage(page + 1)}
                disabled={page === 4}
                className="px-8 py-2 text-white transition-all border-2 rounded-md bg-ldt-red border-ldt-red hover:border-red-700 hover:bg-red-700 hover:scale-110 active:scale-95 "
              >
                {page === 3 ? "Зарегистрироваться" : "Далее"}
              </button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}
/*



*/

function PageRender({
  page,
  errors,
  touched,
}: {
  page: number;
  touched: FormikTouched<Values>;
  errors: FormikErrors<Values>;
}) {
  switch (page) {
    case 1:
      return (
        <>
          <div className="flex flex-wrap gap-16">
            <FormikField
              type="text"
              name="secondName"
              placeholder="Иванов"
              touched={touched.secondName}
              errors={errors.secondName}
              title="Фамилия"
              labelClassname="w-full max-w-lg"
            />
            <FormikField
              type="text"
              name="firstName"
              placeholder="Иван"
              touched={touched.firstName}
              errors={errors.firstName}
              title="Имя"
              labelClassname="w-full max-w-lg"
            />
            <FormikField
              type="text"
              name="fatherName"
              placeholder="Иванович"
              touched={touched.fatherName}
              errors={errors.fatherName}
              title="Отчество"
              labelClassname="w-full max-w-lg"
            />
            <FormikField
              type="email"
              name="email"
              placeholder="ivan.ivanov1999@gmail.com"
              touched={touched.email}
              errors={errors.email}
              labelClassname="w-full max-w-lg"
              title="Почта"
            />
            <FormikField
              type="phone"
              name="phone"
              placeholder="+7 (-----) -----  ---  --"
              touched={touched.phone}
              errors={errors.phone}
              labelClassname="w-full max-w-lg"
              title="Телефон"
            />
            <FormikField
              type="text"
              name="inn"
              placeholder="345217689035"
              touched={touched.inn}
              errors={errors.inn}
              labelClassname="w-full max-w-lg"
              title="ИНН"
            />
          </div>
          <ul className="mt-8 text-ldt-red">
            {Object.entries(errors)
              .filter(([key]) => ["inn", "email", "firstName"].includes(key))
              .map(([key, value]) => (
                <li key={key}>{typeof value === "string" ? value : ""}</li>
              ))}
          </ul>
        </>
      );
    case 2:
      return (
        <>
          <div className="flex flex-wrap gap-16">
            <FormikField
              type="text"
              name="organisation"
              placeholder="ООО 'Рога и копыта'"
              touched={touched.organisation}
              errors={errors.organisation}
              labelClassname="w-full max-w-lg"
              title="Организация"
            />
            <FormikField
              type="url"
              name="website"
              placeholder="mos.ru"
              touched={touched.website}
              errors={errors.website}
              labelClassname="w-full max-w-lg"
              title="Вебсайт"
            />
            <FormikField
              type="text"
              name="country"
              placeholder="Россия"
              touched={touched.country}
              errors={errors.country}
              labelClassname="w-full max-w-lg"
              title="Страна"
            />
            <FormikField
              type="text"
              name="city"
              placeholder="Москва"
              touched={touched.city}
              errors={errors.city}
              labelClassname="w-full max-w-lg"
              title="Город"
            />
            <FormikField
              isSelect
              type="text"
              name="business_type"
              placeholder="Пищевая промышленность"
              touched={touched.business_type}
              errors={errors.business_type}
              labelClassname="w-full max-w-lg"
              title="Тип бизнеса"
            >
              <option disabled value="">
                Не выбрано
              </option>
              {industryTypes.map((type) => (
                <option
                  value={type}
                  key={type}
                  style={{ width: "10px!important" }}
                >
                  {type.length > 40 ? type.slice(0, 40) + "..." : type}
                </option>
              ))}
            </FormikField>
            <FormikField
              type="text"
              name="job"
              placeholder="Менеджер"
              touched={touched.job}
              errors={errors.job}
              labelClassname="w-full max-w-lg"
              title="Должность"
            />
          </div>
          <ul className="mt-8 text-ldt-red">
            {Object.entries(errors)
              .filter(([key]) =>
                ["business_type", "organisation"].includes(key)
              )
              .map(([key, value]) => (
                <li key={key}>{typeof value === "string" ? value : ""}</li>
              ))}
          </ul>
        </>
      );
    case 3:
      return (
        <>
          <div className="flex flex-col gap-4">
            <FormikField
              type="password"
              name="password"
              placeholder=""
              touched={touched.password}
              errors={errors.password}
              title="Придумайте пароль"
            />
            <FormikField
              type="password"
              name="passwordConfirmation"
              placeholder=""
              touched={touched.passwordConfirmation}
              errors={errors.passwordConfirmation}
              title="Повторите пароль"
            />
          </div>
          <ul className="mt-8 text-ldt-red">
            {Object.entries(errors)
              .filter(([key]) =>
                ["passwordConfirmation", "password"].includes(key)
              )
              .map(([key, value]) => (
                <li key={key}>{typeof value === "string" ? value : ""}</li>
              ))}
          </ul>
        </>
      );
    default:
      return <div>404</div>;
  }
}

export default AuthSignUp;
