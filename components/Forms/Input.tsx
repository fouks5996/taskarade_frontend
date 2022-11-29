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
  textarea,
  id
}: InputProps) {

  if (!textarea) return (
    <div className="flex flex-col gap-1.5 w-full z-50">
      <Text medium size="14">
        <span className={` transition-all`}>{label}</span>
      </Text>
      <div className="relative">
        <input
        id={id}
          name={name}
          {...register(name, validationsSchema)}
          defaultValue={defaultValue && defaultValue}
          className={`h-[46px] ${errorInput(
            errors,
            name
          )} transition-all peer focus:text-grey-text-active focus:outline-none text-grey-text-inactive text-14 font-medium focus:ring-2 focus:ring-stroke-blue rounded-md bg-blue-600 w-full ${icon ? "pl-11" : "pl-4"} placeholder:text-grey-text-placeholder placeholder:text-13 placeholder:font-regular`}
          placeholder={placeholder}
          type={type}
        />
        {errorMessage(errors, name)}
        <span className="absolute font-regular text-20 text-grey-text-placeholder peer-focus:text-grey-text-active top-3 left-3"> {icon} </span>
      </div>
    </div>
  )
  if(textarea) return ( 
    <>
      <textarea
      name={name}
      defaultValue={defaultValue && defaultValue}
      className={` ${errorInput(
        errors,
        name
      )} block focus:ring-2 bg-blue-600 focus:ring-stroke-blue w-full h-[200px] p-4 resize-none rounded-md text-grey-text-active text-14 placeholder:text focus:outline-none placeholder:font-regular placeholder:text-14 placeholder:text-grey-text-placeholder`}
      placeholder={placeholder}
      {...register(name, validationsSchema)}
      />
      {errorMessage(errors, name)}
    </> 
  )
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
  textarea?: boolean;
  id?: any;
}

export default Input;
