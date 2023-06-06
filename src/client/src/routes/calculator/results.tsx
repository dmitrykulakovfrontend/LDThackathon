import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import IndustryIconSrc from "@/assets/industry.png";
import EntityIconSrc from "@/assets/entity.png";
import EmployeesIconSrc from "@/assets/employees.png";
import LocationIconSrc from "@/assets/location.png";
import TaxesIconSrc from "@/assets/taxes.png";
import OneTimePayIconSrc from "@/assets/one-time-pay.png";
import YearlyPayIconSrc from "@/assets/yearly-pay.png";
import { entityMap, papersTypeMap } from "@/types/form";
import type { Results } from "@/types/form";
import type { FormValues } from "./new";
import { API_URL } from "@/constants";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "@/contexts/useAuth";

/**
 * Страница результатов расчетов, сюда пользователь попадает после успешной отправки формы к серверу и получению результатов от него
 * Для распечатывания требуется быть зарегистрированным пользователем, это проверяется при помощь пользовательского контекста от useAuth, данные забираются из предыдущего места, важно что бы предыдущая страница передала state
 * @returns {any}
 */
function Results() {
  const location = useLocation();
  const { user } = useAuth();
  const [isHover, setIsHover] = useState(false);
  const {
    results,
    form,
  }: {
    form: FormValues;
    results: Results;
  } = location.state;
  const [token] = useState(JSON.parse(localStorage.getItem("user") as string));
  console.log({
    results,
    form,
  });
  async function handlePrint() {
    if (user) {
      const res = await fetch(`${API_URL}/invest/download`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = await res.blob();
      const downloadLink = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadLink;
      // the filename you want
      a.download = "review.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadLink);
    } else {
      toast.error(
        "Регистрация обязательна для получения более подробных результатов",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  }
  const oneTimePay =
    results.building +
    results.land +
    results.patentRegistration +
    results.equipment +
    results.entityRegistration +
    results.engineerOnce;
  const yearlyPay =
    results.salaries +
    results.ndfl +
    results.medic +
    results.retire +
    results.landTax +
    results.propertyTax +
    results.amortisation +
    results.accounting +
    results.engineerYear;
  return (
    <div className="">
      <ToastContainer />
      <h1 className="text-3xl font-bold uppercase max-sm:text-2xl">
        Обзор предварительных расходов
      </h1>
      <h2 className="mt-12 mb-6 text-xl font-semibold uppercase">
        Информация о вашей организации
      </h2>
      <div className="flex items-center gap-32 max-lg:flex-col-reverse max-lg:gap-8 max-lg:items-start">
        <div>
          <div className="flex items-center gap-6 max-sm:items-start">
            <img src={IndustryIconSrc} className="pb-4 max-sm:pb-0" />
            <div className="flex pb-4 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center max-sm:items-start">
              <div className="uppercase shrink-0 font-semibold w-[200px]">
                отрасль:{" "}
              </div>
              <div className="h-fit max-sm:text-center max-sm:text-sm max-sm:mt-4">
                {form.business_type}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 max-sm:items-start">
            <img src={EntityIconSrc} className="pb-4 max-sm:pb-0" />
            <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center max-sm:items-start">
              <div className="uppercase shrink-0 font-semibold w-[200px] ">
                Тип организации:
              </div>
              <div className="h-fit max-sm:text-center max-sm:text-sm max-sm:mt-4">
                {entityMap[form.entity]}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 max-sm:items-start">
            <img
              src={EmployeesIconSrc}
              className="pb-4 max-sm:pb-0 max-sm:pt-4"
            />
            <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center max-sm:items-start">
              <div className="uppercase shrink-0 font-semibold w-[200px] ">
                Количество сотрудников:
              </div>
              <div className="h-fit max-sm:text-center max-sm:text-sm max-sm:mt-4">
                {form.n_employee} человек(а)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 max-sm:items-start">
            <img
              src={LocationIconSrc}
              className="pb-4 max-sm:pb-0 max-sm:pt-4"
            />
            <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center max-sm:items-start">
              <div className="uppercase shrink-0 font-semibold w-[200px] ">
                Район расположения производсва:
              </div>
              <div className="h-fit max-sm:text-center max-sm:text-sm max-sm:mt-4">
                {form.district}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 max-sm:items-start">
            <img src={TaxesIconSrc} className="pb-4 max-sm:pb-0 max-sm:pt-4" />
            <div className="flex pb-4 pt-3 border-b-2 max-sm:flex-col border-ldt-red w-full max-w-[515px] items-center max-sm:items-start">
              <div className="uppercase shrink-0 font-semibold w-[200px] ">
                предполагаемая ставка налогообложения:
              </div>
              <div className="h-fit max-sm:text-center max-sm:text-sm max-sm:mt-4">
                {papersTypeMap[form.accounting_type]}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md border-l-[5px] border-ldt-red py-2 px-6">
          Спасибо, что воспользовались электронным сервисом{" "}
          <span className="font-bold">
            “Инвестиционный калькулятор города Москвы”
          </span>
          ! Мы надеемся, что предоставленная возможность предварительного
          расчета расходов на содержание персонала организации, размещение
          промышленных объектов на территории города Москвы, а также необходимые
          регистрационные и прочие услуги была полезна для Вас
        </div>
      </div>
      <h2 className="mt-12 mb-6 text-xl font-semibold uppercase">
        итоговые значения возможных затрат
      </h2>
      <div className="flex max-sm:flex-col">
        <div className="flex flex-col items-start justify-start gap-4 p-8 pl-0 border-r-2 max-sm:flex-row max-sm:border-r-0 max-sm:border-b-2 border-ldt-red">
          <img src={OneTimePayIconSrc} alt="" />
          <div className="flex flex-col items-start justify-start gap-4">
            <span className="font-semibold uppercase">
              единовременные затраты:
            </span>
            <span className="text-xl font-semibold">
              {formatNumber(oneTimePay)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-4 p-8 max-sm:pl-0 max-sm:flex-row">
          <img src={YearlyPayIconSrc} alt="" />
          <div className="flex flex-col items-start justify-start gap-4">
            <span className="font-semibold uppercase ">
              постоянные затраты (за 1 год):
            </span>
            <span className="text-xl font-semibold">
              {formatNumber(yearlyPay)}
            </span>
          </div>
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
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`relative px-12 py-2 mt-4 ml-auto text-blue-500 transition-all border-2 border-blue-500 hover:bg-blue-500 hover:text-white max-sm:mx-auto rounded-xl hover:scale-110 active:scale-95`}
        >
          {isHover && !user && (
            <div className="absolute flex bg-white items-center justify-center w-[300px] p-5 text-black border-2 bottom-16 left-28 h-fit rounded-xl text-left border-ldt-red max-lg:right-60 max-lg:left-auto max-sm:right-[50%] max-sm:left-[50%] max-sm:translate-x-[-50%]">
              Данная возможность существует только у зарегестрированных
              пользователей. Авторизуйтесь или пройдите регистрацию, это займет
              пару минут.
            </div>
          )}
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
    </div>
  );
}
/**
 * Простая функция для форматирования больших чисел в строки типа "123.23 млн. ₽"
 * @param {any} num  число для форматирования
 * @returns {any} отформатированная строка
 */
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
