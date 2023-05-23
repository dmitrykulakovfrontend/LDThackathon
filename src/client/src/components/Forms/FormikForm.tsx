import React from "react";
import { Form } from "formik";

type Props = {
  children: React.ReactNode;
};

function FormikForm({ children }: Props) {
  return (
    <Form className="flex flex-col w-full max-w-xl gap-8 px-20 py-14 border shadow-[0_0_1px_0px_rgb(215,22,22)_inset,_0_0_1px_0px_rgb(215,22,22)] border-ldt-red rounded-xl">
      <h1 className="mx-auto text-3xl font-semibold">Авторизация</h1>
      {children}
    </Form>
  );
}

export default FormikForm;
