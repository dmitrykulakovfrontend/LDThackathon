import React, { useState } from "react";
import { Field, useField } from "formik";

export type FieldProps = React.ComponentPropsWithoutRef<"select"> & {
  errors?: string;
  touched?: boolean;
  name: string;
  labelClassname?: string;
};

function FormikField({
  children,
  className,
  touched,
  errors,
  title,
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
  const [isDropdownActive, setDropdownActive] = useState(false);
  const arrowRotation = isDropdownActive ? "rotate-[135deg]" : "rotate-45";

  const handleDropdownToggle = () => {
    setDropdownActive(!isDropdownActive);
  };
  return (
    <>
      <label className={`flex flex-col max-w-md gap-2 h-fit ${labelClassname}`}>
        <span className="font-semibold">{title}</span>
        <div className="relative w-full">
          <Field
            as="select"
            onClick={handleDropdownToggle}
            {...props}
            className={`px-6 py-3 w-full appearance-none border rounded-xl ${borderColor} ${className}`}
          >
            {children}
          </Field>
          <span
            className={`absolute pointer-events-none w-3 h-3 transform ${arrowRotation} -translate-y-1/2 border-t-2 border-r-2 right-4 border-ldt-gray top-1/2 right-1`}
          ></span>
        </div>
        {isError && <div>{errors}</div>}
      </label>
    </>
  );
}

export default FormikField;
