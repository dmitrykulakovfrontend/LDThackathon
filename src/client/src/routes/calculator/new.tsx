import FormikDropdown from "@/components/Forms/FormikDropdown";
import FormikField from "@/components/Forms/FormikField";
import FormikForm from "@/components/Forms/FormikForm";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import fakeMapSrc from "@/assets/fake-map.png";

// type Props = {};

interface Values {
  business_type: string;
  n_employee: string;
  square_area: string;
  square_buildings: string;
  buildings_type: string;
}

const initialValues = {
  business_type: "",
  n_employee: "",
  square_area: "",
  square_buildings: "",
  buildings_type: "",
};

const FormSchema = Yup.object().shape({
  business_type: Yup.string().required("Обязательное поле"),
  n_employee: Yup.string()
    .matches(/^\d+$/, "Должны быть только цифры")
    .required("Укажите численность"),
  square_area: Yup.string()
    .matches(/^\d+$/, "Должны быть только цифры")
    .required("Обязательное поле"),
  square_buildings: Yup.string()
    .matches(/^\d+$/, "Должны быть только цифры")
    .required("Обязательное поле"),
  buildings_type: Yup.string().required("Обязательное поле"),
});

function NewCalculator() {
  async function handleSubmit(form: Values) {
    console.log(form);
  }
  return (
    <>
      <h1 className="text-2xl font-bold mt-14">Расчет инвестиций</h1>
      <div className="text-xl">
        создание нового предприятия{" "}
        <span className="relative text-3xl font-bold top-1">/</span>{" "}
        <Link
          to="/calculator/existing"
          className="border-b-2 border-dotted text-ldt-dark-gray"
        >
          развитие промышленного предприятия
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        {({ errors, touched }) => (
          <FormikForm className="flex justify-between gap-5 mt-12 max-md:flex-col">
            <div className="flex flex-col flex-1 gap-5">
              <div className="flex gap-5">
                <FormikDropdown
                  name="business_type"
                  labelClassname="flex-grow"
                  touched={touched.business_type}
                  errors={errors.business_type}
                  title="Отрасль ведения хозяйственной деятельности"
                >
                  <option disabled value="">
                    Не выбрано
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </FormikDropdown>
                <FormikField
                  type="text"
                  labelClassname="flex-grow-[0.5]"
                  name="n_employee"
                  placeholder="Укажите число"
                  touched={touched.n_employee}
                  errors={errors.n_employee}
                >
                  Число сотрудников
                </FormikField>
              </div>
              <div className="flex gap-5">
                <FormikField
                  type="text"
                  name="square_area"
                  labelClassname="flex-grow"
                  placeholder="Укажите кол-во кв. м"
                  touched={touched.square_area}
                  errors={errors.square_area}
                >
                  Площадь земельного участка для расположения промышленного
                  производства
                </FormikField>
                <FormikField
                  type="text"
                  name="square_buildings"
                  labelClassname="flex-grow-[0.5]"
                  placeholder="Укажите кол-во кв. м"
                  touched={touched.square_buildings}
                  errors={errors.square_buildings}
                >
                  Площадь объектов капитального строительства
                </FormikField>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              Территория расположения производства
              <img src={fakeMapSrc} alt="" />
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}

export default NewCalculator;
