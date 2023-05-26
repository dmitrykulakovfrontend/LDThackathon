import FormikField from "@/components/Forms/FormikField";
import FormikForm from "@/components/Forms/FormikForm";
import { Field, FieldArray, Formik, getIn } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import fakeMapSrc from "@/assets/fake-map.png";
import "./new.css";
// type Props = {};

const initialValues = {
  business_type: "",
  n_employee: "",
  square_area: "",
  square_buildings: "",
  buildings_type: "",
  equipment: [
    {
      time: "",
      amount: "",
      name: "",
    },
  ],
  entity: "ip",
  taxes: "6%",
};
type Values = typeof initialValues;

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
  equipments: Yup.array().of(
    Yup.object().shape({
      number: Yup.string().required("Обязательное поле"),
      time: Yup.string()
        .matches(/^\d+$/, "Должны быть только цифры")
        .required("Обязательное поле"),
      name: Yup.string().required("Обязательное поле"),
    })
  ),
  entity: Yup.string().required("Обязательное поле"),
  taxes: Yup.string().required("Обязательное поле"),
});

function NewCalculator() {
  async function handleSubmit(form: Values) {
    console.log(form);
  }
  return (
    <>
      <h1 className="text-2xl font-bold mt-14">Расчет инвестиций</h1>
      <div className="text-xl max-sm:text-xs">
        создание нового предприятия{" "}
        <span className="relative text-3xl font-bold max-sm:text-lg top-1">
          /
        </span>{" "}
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
        {({ errors, values, touched }) => (
          <FormikForm className="flex gap-5 max-xl:flex-col-reverse">
            <div>
              <div className="flex flex-1 gap-5 mt-12 max-xl:flex-col">
                <div>
                  <div className="flex gap-5 max-md:flex-col">
                    <FormikField
                      name="business_type"
                      touched={touched.business_type}
                      errors={errors.business_type}
                      labelClassname="w-[454px] max-md:w-full max-md:max-w-none"
                      isSelect
                      title="Отрасль ведения хозяйственной деятельности"
                    >
                      <option disabled value="">
                        Не выбрано
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </FormikField>
                    <FormikField
                      type="text"
                      name="n_employee"
                      labelClassname="w-[336px] max-md:w-full max-md:max-w-none"
                      placeholder="Укажите число"
                      touched={touched.n_employee}
                      errors={errors.n_employee}
                      title="Численность сотрудников"
                    />
                  </div>
                  <div className="flex gap-5 max-md:flex-col">
                    <FormikField
                      type="text"
                      name="square_area"
                      placeholder="Укажите кол-во кв. м"
                      labelClassname="w-[454px] max-md:w-full max-md:max-w-none"
                      touched={touched.square_area}
                      errors={errors.square_area}
                      title="Площадь земельного участка для расположения промышленного
                производства"
                    />
                    <FormikField
                      type="text"
                      name="square_buildings"
                      placeholder="Укажите кол-во кв. м"
                      labelClassname="w-[336px] max-md:w-full max-md:max-w-none"
                      touched={touched.square_buildings}
                      errors={errors.square_buildings}
                      title="Площадь объектов капитального строительства"
                    />
                  </div>
                </div>
              </div>
              <h2 className="mt-12 text-xl font-bold">
                Необходимое оборудование
              </h2>
              <div>
                <FieldArray
                  name="equipment"
                  render={(arrayHelpers) => (
                    <div>
                      {values.equipment && values.equipment.length > 0 ? (
                        <>
                          {values.equipment.map((equipment, index) => (
                            <div key={index}>
                              <div className="max-w-md">
                                <FormikField
                                  type="text"
                                  name={`equipment.${index}.name`}
                                  placeholder="Название оборудования"
                                  labelClassname="w-full max-w-none"
                                  touched={
                                    touched.equipment &&
                                    touched.equipment.length > 0 &&
                                    touched.equipment[index]?.name
                                  }
                                  title="Укажите виды техники"
                                />
                                <div className="flex gap-5 max-sm:flex-col">
                                  <FormikField
                                    type="text"
                                    name={`equipment.${index}.amount`}
                                    placeholder="Укажите число"
                                    labelClassname="w-[336px] max-md:w-full max-md:max-w-none"
                                    touched={
                                      touched.equipment &&
                                      touched.equipment.length > 0 &&
                                      touched.equipment[index]?.amount
                                    }
                                    title="Количество оборудования"
                                  />
                                  <FormikField
                                    type="text"
                                    name={`equipment.${index}.time`}
                                    placeholder="Укажите время в годах"
                                    labelClassname="w-[336px] max-md:w-full max-md:max-w-none"
                                    touched={
                                      touched.equipment &&
                                      touched.equipment.length > 0 &&
                                      touched.equipment[index]?.time
                                    }
                                    title="Срок использования"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start justify-center gap-2">
                                <button
                                  type="button"
                                  className="flex items-center text-ldt-red"
                                  onClick={() => arrayHelpers.remove(index)} // remove a object from the list
                                >
                                  <span className="text-3xl w-[18px]"> - </span>{" "}
                                  <span className="text-lg underline underline-offset-2">
                                    Удалить
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            className="flex items-center text-ldt-gray"
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                name: "",
                                time: "",
                                amount: "",
                              })
                            } // insert an empty object at a position
                          >
                            <span className="text-3xl  w-[18px]"> + </span>{" "}
                            <span className="text-lg underline underline-offset-2">
                              Добавить
                            </span>
                          </button>
                        </>
                      ) : (
                        <button
                          className="flex items-center text-ldt-gray"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              name: "",
                              time: "",
                              amount: "",
                            })
                          } // insert an empty object at a position
                        >
                          <span className="text-3xl  w-[18px]"> + </span>{" "}
                          <span className="text-lg underline underline-offset-2">
                            Добавить
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>
              <h2 className="mt-12 text-xl font-bold">
                Предоставление бухгалтерских услуг
              </h2>
              <h3 className="mt-8 text-lg font-medium">Юридическое лицо</h3>
              <div className="flex gap-5 my-5 radio-toolbar">
                <Field type="radio" name="entity" value="ip" id="entity1" />
                <label htmlFor="entity1">ИП</label>
                <Field type="radio" name="entity" value="ooo" id="entity2" />
                <label htmlFor="entity2">ООО</label>
                <Field type="radio" name="entity" value="zao" id="entity3" />
                <label htmlFor="entity3">ЗАО</label>
                <Field type="radio" name="entity" value="pao" id="entity4" />
                <label htmlFor="entity4">ПАО</label>
              </div>
              <h3 className="mt-8 text-lg font-medium">
                Ставка налогообложения
              </h3>
              <div className="flex gap-5 my-5 radio-toolbar">
                <Field type="radio" name="taxes" value="6%" id="taxes1" />
                <label htmlFor="taxes1">УСН 6%</label>
                <Field type="radio" name="taxes" value="15%" id="taxes2" />
                <label htmlFor="taxes2">УСН 15%</label>
                <Field type="radio" name="taxes" value="OCH" id="taxes3" />
                <label htmlFor="taxes3">ОСН</label>
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-xl"
                >
                  Расчитать
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 max-xl:max-w-lg">
              Территория расположения производства
              <img src={fakeMapSrc} className="w-full" alt="" />
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}
export default NewCalculator;
