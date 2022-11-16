import Text from "../Typography/Text";
import { errorInput, errorMessage } from "./Errors";
import { ReactComponentElement } from "react";
import { FieldValues, UseFormRegister, UseFormSetError } from "react-hook-form";

function Input({
  label,
  placeholder,
  icon,
  type,
  name,
  defaultValue,
  register,
  validationsSchema,
  errors,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-[320px] z-50">
      <Text normal small>
        <span className={` transition-all`}>{label}</span>
      </Text>
      <div className="relative">
        <input
          name={name}
          {...register(name, validationsSchema)}
          defaultValue={defaultValue && defaultValue}
          className={`h-[50px] text-s ${errorInput(
            errors,
            name
          )} transition-all focus:outline-none focus:ring-1 focus:ring-purple_dark rounded-lg bg-blue_light w-full pl-11 placeholder:font-semi_normal placeholder:text-xs`}
          placeholder={placeholder}
          type={type}
        />
        {errorMessage(errors, name)}
        <span className="absolute top-4 left-3"> {icon} </span>
      </div>
    </div>
  );
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  icon?: ReactComponentElement<any>;
  type?: string;
  name?: string;
  defaultValue?: string;
  register?: UseFormRegister<FieldValues>;
  validationsSchema?: Object;
  errors?: UseFormSetError<any>;
}

export default Input;
