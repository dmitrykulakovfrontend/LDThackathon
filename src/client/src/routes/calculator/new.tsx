import FormikField from "@/components/Forms/FormikField";
import FormikForm from "@/components/Forms/FormikForm";
import { Field, FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import fakeMapSrc from "@/assets/fake-map.png";
import "./new.css";
import { GeoJsonObject } from "geojson";
import {
  MapContainer,
  GeoJSON as GeoJsonLayer,
  TileLayer,
} from "react-leaflet";
import industryTypes from "@/industry.json";
import equipmentTypes from "@/equipmentTypes.json";
import { API_URL } from "@/constants";
// type Props = {};
const initialValues = {
  business_type: "",
  n_employee: "",
  square_area: "",
  square_buildings: "",
  equipment: [
    {
      time: "",
      price: "",
      type: "",
    },
  ],
  entity: "ip",
  accounting_type: "6%",
  accounting_papers: 1,
  is_patent: false,
  district: "",
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
      price: Yup.string().required("Обязательное поле"),
      time: Yup.string()
        .matches(/^\d+$/, "Должны быть только цифры")
        .required("Обязательное поле"),
      type: Yup.string().required("Обязательное поле"),
    })
  ),
  entity: Yup.string().required("Обязательное поле"),
  accounting_type: Yup.string().required("Обязательное поле"),
  accounting_papers: Yup.number().required("Обязательное поле"),
  is_patent: Yup.boolean().required("Обязательное поле"),
  district: Yup.string().required("Укажите район"),
});

function NewCalculator() {
  async function handleSubmit(form: Values) {
    const res = await fetch(`${API_URL}/invest/calculate`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("backend-response: ", data);
  }
  const [accountingPapers, setAccountingPapers] = useState(1);
  const [isPatent, setIsPatent] = useState(false);
  const [data, setData] = useState<null | GeoJsonObject>(null);
  const [isMapActive, setIsMapActive] = useState(false);

  useEffect(() => {
    import("@/moscowGeo.json").then((data) => {
      setData(data as GeoJsonObject);
    });
  }, []);
  console.log(data);
  return (
    <>
      <h1 className="text-2xl font-bold mt-14">Расчет инвестиций</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        {({ errors, values, touched, setFieldValue }) => (
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
                      {industryTypes.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
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
                                  name={`equipment.${index}.type`}
                                  touched={
                                    touched.equipment &&
                                    touched.equipment.length > 0 &&
                                    touched.equipment[index]?.type
                                  }
                                  labelClassname="w-full max-w-none"
                                  isSelect
                                  title="Укажите виды техники"
                                >
                                  <option disabled value="">
                                    Не выбрано
                                  </option>
                                  {equipmentTypes.map((type) => (
                                    <option value={type} key={type}>
                                      {type}
                                    </option>
                                  ))}
                                </FormikField>
                                <div className="flex gap-5 max-sm:flex-col">
                                  <FormikField
                                    type="text"
                                    name={`equipment.${index}.price`}
                                    placeholder="Укажите число"
                                    labelClassname="w-[336px] max-md:w-full max-md:max-w-none"
                                    touched={
                                      touched.equipment &&
                                      touched.equipment.length > 0 &&
                                      touched.equipment[index]?.price
                                    }
                                    title="Количество оборудования"
                                  />
                                  <FormikField
                                    type="text"
                                    name={`equipment.${index}.time`}
                                    placeholder="Укажите годы"
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
                                type: "",
                                time: "",
                                price: "",
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
                              type: "",
                              time: "",
                              price: "",
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
              <div className="flex max-md:flex-col">
                <div>
                  <h2 className="mt-12 text-xl font-bold">
                    Предоставление бухгалтерских услуг
                  </h2>
                  <h3 className="mt-8 text-lg font-medium">Юридическое лицо</h3>
                  <div className="flex flex-wrap justify-start gap-5 my-5 radio-toolbar">
                    <Field type="radio" name="entity" value="ip" id="entity1" />
                    <label htmlFor="entity1">ИП</label>
                    <Field
                      type="radio"
                      name="entity"
                      value="ooo"
                      id="entity2"
                    />
                    <label htmlFor="entity2">ООО</label>
                    <Field
                      type="radio"
                      name="entity"
                      value="zao"
                      id="entity3"
                    />
                    <label htmlFor="entity3">ЗАО</label>
                    <Field
                      type="radio"
                      name="entity"
                      value="pao"
                      id="entity4"
                    />
                    <label htmlFor="entity4">ПАО</label>
                    <Field
                      type="radio"
                      name="entity"
                      value="oao"
                      id="entity5"
                    />
                    <label htmlFor="entity5">ОАО</label>
                  </div>
                  <h3 className="mt-8 text-lg font-medium">
                    Ставка налогообложения
                  </h3>
                  <div className="flex gap-5 my-5 radio-toolbar">
                    <Field
                      type="radio"
                      name="accounting_type"
                      value="6%"
                      id="accounting_type1"
                    />
                    <label htmlFor="accounting_type1">УСН 6%</label>
                    <Field
                      type="radio"
                      name="accounting_type"
                      value="15%"
                      id="accounting_type2"
                    />
                    <label htmlFor="accounting_type2">УСН 15%</label>
                    <Field
                      type="radio"
                      name="accounting_type"
                      value="OCH"
                      id="accounting_type3"
                    />
                    <label htmlFor="accounting_type3">ОСН</label>
                  </div>
                </div>
                <div className="flex-1 mt-28 max-md:mt-4">
                  <label
                    htmlFor="customRange1"
                    className="inline-block mb-2 text-neutral-700 dark:text-neutral-200"
                  >
                    Количество операций в месяц
                  </label>
                  <div className="relative max-w-md mt-4">
                    <input
                      type="range"
                      name="accounting_papers"
                      min="1"
                      max="1000000"
                      onChange={(e) => {
                        setFieldValue("accounting_papers", +e.target.value);
                        setAccountingPapers(+e.target.value);
                      }}
                      value={accountingPapers}
                      className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                      id="customRange1"
                    />
                    <div className="flex justify-between w-full">
                      <span>1</span>
                      <span>1000000</span>
                    </div>
                    <span className="absolute left-0 w-full h-full text-center top-6 text-neutral-700 dark:bg-blue-500">
                      {accountingPapers}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mb-8 switch">
                    <label className="flex flex-col items-start w-fit">
                      <span className="mt-5 ">Оформление патента</span>
                      <input
                        className="relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none cursor-pointer mt-7 "
                        type="checkbox"
                        onChange={() => {
                          setFieldValue("is_patent", !isPatent);
                          setIsPatent(!isPatent);
                        }}
                        checked={isPatent}
                        name="is_patent"
                      />
                    </label>
                  </div>
                </div>
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
            <div className="flex flex-col gap-3 mt-12 max-xl:max-w-lg">
              Территория расположения производства{" "}
              {values.district ? `(${values.district})` : ""}
              {isMapActive ? (
                <div className="relative z-10 w-full">
                  <img src={fakeMapSrc} className="opacity-0" alt="" />
                  <MapContainer
                    zoom={10}
                    center={[55.751244, 37.618423]}
                    // className="h-[370px] w-[535px]  max-sm:w-[290px] max-sm:h-[300px] max-md:w-[380px] rounded-xl"
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <GeoJsonLayer
                      data={data as GeoJsonObject}
                      onEachFeature={(feat, layer) => {
                        layer.on({
                          mouseover: () => {
                            layer
                              .bindTooltip(feat.properties.name)
                              .openTooltip();
                          },
                          mouseout: () => {
                            layer.unbindTooltip();
                          },
                          click: () => {
                            setFieldValue("district", feat.properties.name);
                          },
                        });
                      }}
                    />
                  </MapContainer>
                </div>
              ) : (
                <div
                  className="relative w-full cursor-pointer"
                  onClick={() => setIsMapActive(true)}
                >
                  <img src={fakeMapSrc} className="w-full" alt="" />
                  <span className="absolute z-10 text-center text-white translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2">
                    Кликните на карту, чтобы выбрать местоположение
                  </span>
                </div>
              )}
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}
export default NewCalculator;
