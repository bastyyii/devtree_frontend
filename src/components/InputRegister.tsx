import { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";
import ErrorMessage from './ErrorMessage';

interface InputRegisterProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    error?: FieldError;
  }

export default function InputRegister({
  id,
  label,
  type = "text",
  placeholder,
  register,
  rules,
  error
} : InputRegisterProps) {
  return (
    <div className="grid grid-cols-1 space-y-3">
      <label htmlFor={id} className="text-2xl text-slate-500">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
        {...register(id, rules)}
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};