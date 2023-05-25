import React from "react";
import { Form } from "formik";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function FormikForm({ children, className }: Props) {
  return <Form className={className}>{children}</Form>;
}

export default FormikForm;
