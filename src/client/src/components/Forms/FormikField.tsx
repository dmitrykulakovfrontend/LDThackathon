import React, { useState } from "react";
import { Field } from "formik";

export type FieldProps = React.ComponentPropsWithoutRef<"input"> & {
  errors?: string;
  touched?: boolean;
  labelClassname?: string;
  isSelect?: boolean;
  title: string;
};

function FormikField({
  children,
  className,
  touched,
  errors,
  labelClassname,
  isSelect,
  title,
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
      <label
        className={`flex flex-col  max-w-md gap-2 justify-between ${labelClassname}`}
      >
        <div className="flex flex-col justify-between gap-1">
          <span className="font-semibold w-fit">{title}</span>
          {isError && <div className="text-ldt-red w-fit">{errors}</div>}
        </div>
        <div className="relative w-full">
          {isSelect ? (
            <>
              <Field
                as="select"
                onClick={handleDropdownToggle}
                {...props}
                className={`px-6 py-3 w-full appearance-none  outline-blue-500 transition-all hover:border-blue-500 border rounded-xl ${borderColor} ${className}`}
              >
                {children}
              </Field>
              <span
                className={`absolute pointer-events-none w-3 h-3 transform ${arrowRotation} -translate-y-1/2 border-t-2 border-r-2 right-4 border-ldt-gray top-1/2`}
              ></span>
            </>
          ) : (
            <Field
              {...props}
              className={` px-6 py-3 border w-full rounded-xl outline-blue-500 transition-all hover:border-blue-500 ${borderColor} ${className}`}
            />
          )}
        </div>
      </label>
    </>
  );
}

export default FormikField;
