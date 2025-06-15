import { type ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';
import clsx from 'clsx';

interface CustomButtonPropsInterface
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  text?: string;
}

export const CustomButton = ({
  text,
  isLoading = false,
  ...rest
}: CustomButtonPropsInterface) => {
  return (
    <>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded relative overflow-hidden transition active:scale-95 disabled:pointer-events-none disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isLoading}
        {...rest}
      >
        {isLoading && <Spinner size="sm" />}
        <div
          className={clsx(
            'relative z-10 flex items-center font-medium',
            isLoading && 'invisible'
          )}
        >
          <div className="flex-1 basis-0 text-center">{text}</div>
        </div>
      </button>
    </>
  );
};
