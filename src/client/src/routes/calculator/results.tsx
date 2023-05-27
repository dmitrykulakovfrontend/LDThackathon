import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IndustryIconSrc from "@/assets/industry.png";
import EntityIconSrc from "@/assets/entity.png";
import EmployeesIconSrc from "@/assets/employees.png";
import LocationIconSrc from "@/assets/location.png";
import TaxesIconSrc from "@/assets/taxes.png";
import OneTimePayIconSrc from "@/assets/one-time-pay.png";
import YearlyPayIconSrc from "@/assets/yearly-pay.png";
import { FormValues, entityMap, Results } from "@/types/form";
import { papersTypeMap } from "../../types/form";
import { API_URL } from "@/constants";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    results,
    form,
  }: {
    form: FormValues;
    results: Results;
  } = location.state;
  console.log({
    results,
    form,
  });
  async function handlePrint() {
    try {
      // manually navigate user
      window.location.href = `${API_URL}/invest/download`;
      // const res = await fetch();
      // console.log(res);
      // const data = await res.json();
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
    // navigate("/auth/signin");
  }
  const oneTimePay =
    results.building +
    results.land +
    results.patentRegistration +
    results.equipment +
    results.entityRegistration;
  const yearlyPay =
    results.salaries +
    results.ndfl +
    results.medic +
    results.retire +
    results.landTax +
    results.propertyTax +
    results.amortisation +
    results.accounting;
  return (
    <>
      <h1 className="text-3xl font-bold uppercase max-sm:text-2xl">
        Обзор предварительных расходов
      </h1>
      <h2 className="mt-12 mb-6 text-xl font-semibold uppercase">
        Информация о вашей организации
      </h2>
      <div>
        <div className="flex items-center gap-6">
          <img src={IndustryIconSrc} className="pb-4" />
          <div className="flex pb-4 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center">
            <div className="uppercase shrink-0 font-medium w-[200px]  max-sm:text-center">
              отрасль:{" "}
            </div>
            <div className="h-fit max-sm:text-center">{form.business_type}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <img src={EntityIconSrc} className="pb-4" />
          <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center">
            <div className="uppercase shrink-0 font-medium w-[200px]  max-sm:text-center">
              Тип организации:
            </div>
            <div className="h-fit max-sm:text-center">
              {entityMap[form.entity]}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <img src={EmployeesIconSrc} className="pb-4" />
          <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center">
            <div className="uppercase shrink-0 font-medium w-[200px]  max-sm:text-center">
              Количество сотрудников:
            </div>
            <div className="h-fit max-sm:text-center">
              {form.n_employee} человек(а)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <img src={LocationIconSrc} className="pb-4" />
          <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center">
            <div className="uppercase shrink-0 font-medium w-[200px]  max-sm:text-center">
              Район раположения производсва:
            </div>
            <div className="h-fit max-sm:text-center">{form.district}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <img src={TaxesIconSrc} className="pb-4" />
          <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center">
            <div className="uppercase shrink-0 font-medium w-[200px]  max-sm:text-center">
              предполагаемая ставка налогообложения:
            </div>
            <div className="h-fit max-sm:text-center">
              {papersTypeMap[form.accounting_type]}
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-12 mb-6 text-xl font-semibold uppercase">
        итоговые значения возможных затрат
      </h2>
      <div className="flex max-sm:flex-col">
        <div className="flex flex-col items-start justify-start gap-4 p-8 pl-0 border-r-2 max-sm:border-r-0 max-sm:border-b-2 border-ldt-red">
          <img src={OneTimePayIconSrc} alt="" />
          <span className="uppercase">единовременные затраты:</span>
          <span className="text-xl font-semibold">
            {formatNumber(oneTimePay)}
          </span>
        </div>
        <div className="flex flex-col items-start justify-start gap-4 p-8 max-sm:pl-0">
          <img src={YearlyPayIconSrc} alt="" />
          <span className="uppercase">постоянные затраты (за 1 год):</span>
          <span className="text-xl font-semibold">
            {formatNumber(yearlyPay)}
          </span>
        </div>
      </div>
      <h2 className="mt-12 text-2xl font-bold uppercase">
        итого:{" "}
        <span className="text-blue-500">{formatNumber(results.total)}</span>
        <span className="relative text-xl text-ldt-dark-gray -top-2 left-1">
          *
        </span>
      </h2>
      <div className="flex w-full max-w-2xl">
        <button
          onClick={handlePrint}
          className="px-12 py-2 mt-4 ml-auto text-blue-500 border-2 border-blue-500 max-sm:mx-auto rounded-xl"
        >
          Распечатать
        </button>
      </div>
      <span className="block max-w-lg mt-4 text-sm text-ldt-dark-gray">
        *Указанные значения возможных издержек на создание промышленного
        производства в городе Москве носят рекомендательный характер и не
        являются официальной позицией Правительства Москвы. За более подробным
        расчетом необходимо обратиться в Департамент инвестиционной и
        промышленной политики города Москвы.
      </span>
    </>
  );
}
function formatNumber(num: number) {
  const suffixes = ["", "тыс.", "млн.", "млрд.", "трлн.", "квадр."];
  const tier = (Math.log10(Math.abs(num)) / 3) | 0;

  if (tier === 0) return num;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaledNumber = num / scale;

  const roundedNumber = Math.round(scaledNumber * 100) / 100;

  return `${roundedNumber} ${suffix} ₽`;
}
export default Results;
