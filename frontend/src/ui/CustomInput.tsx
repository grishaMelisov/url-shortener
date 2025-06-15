import clsx from 'clsx';
import React from 'react';

interface CustomInputPropsInterface
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  errorText?: string;
  type?: string;
  inputClassname?: string;
  labelClassname?: string;
}

const shadowStyle = {
  base: 'shadow-[inset_0_0_0_1px_var(--color-shadow)] focus-within:shadow-[inset_0_0_0_2px_var(--color-shadow)]',
  error:
    'shadow-[inset_0_0_0_1px_var(--color-shadow-error)] focus-within:shadow-[inset_0_0_0_2px_var(--color-shadow-error)]',
};

export const CustomInput = ({
  label,
  type = 'text',
  placeholder,
  inputClassname,
  labelClassname,
  errorText,
  ...rest
}: CustomInputPropsInterface) => {
  return (
    <div className="flex flex-col border-none outline-hidden ">
      <label className="w-full">
        <div className={clsx(labelClassname)}>{label}</div>
      </label>
      <input
        className={clsx(
          inputClassname,
          'w-full p-2 rounded-md border-none bg-transparent p-0 text-inherit placeholder-grey-100 outline-hidden transition duration-100 ease-out',
          errorText ? [shadowStyle.error, ' text-red-500'] : shadowStyle.base
        )}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
      {errorText && <p className="text-red-500 mt-1 text-sm">{errorText}</p>}
    </div>
  );
};
