import React from "react";
import { Field } from "formik";

export type FieldProps = React.ComponentPropsWithoutRef<"input"> & {
  errors?: string;
  touched?: boolean;
};

function FormikField({
  children,
  className,
  touched,
  errors,
  ...props
}: FieldProps) {
  // Not touched - gray, touched and no errors - green, touched and errors - red
  const isError = touched && errors;
  const borderColor = !touched
    ? "border-ldt-gray"
    : touched && !errors
    ? "border-green-500"
    : "border-red-500";
  return (
    <>
      <label className="flex flex-col gap-2">
        <span className="font-semibold">{children}</span>
        {isError && <div>{errors}</div>}
        <Field
          {...props}
          className={`max-w-lg px-6 py-3 border-2 rounded-xl ${borderColor} ${className}`}
        />
      </label>
    </>
  );
}

export default FormikField;
