import React from "react";
import { Field } from "formik";

export type FieldProps = React.ComponentPropsWithoutRef<"input"> & {
  errors?: string;
  touched?: boolean;
  labelClassname?: string;
};

function FormikField({
  children,
  className,
  touched,
  errors,
  labelClassname,
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
      <label
        className={`flex flex-col  max-w-md gap-2 h-fit ${labelClassname}`}
      >
        <span className="font-semibold">{children}</span>
        {isError && <div>{errors}</div>}
        <Field
          {...props}
          className={`max-w-md px-6 py-3 border rounded-xl ${borderColor} ${className}`}
        />
      </label>
    </>
  );
}

export default FormikField;
