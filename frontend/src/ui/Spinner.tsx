import clsx from 'clsx';

interface BonaSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
};

const Spinner = ({ size = 'md', className }: BonaSpinnerProps) => {
  const dotStyles = clsx(
    sizeMap[size],
    'animate-pulse-smooth rounded-full bg-white',
    className
  );

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0">
      <div
        className={clsx(
          'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center space-x-2 bg-transparent'
        )}
      >
        <div
          className={clsx(dotStyles, '[animation-delay:-0.4s!important]')}
        ></div>
        <div
          className={clsx(dotStyles, '[animation-delay:-0.2s!important]')}
        ></div>
        <div className={dotStyles}></div>
      </div>
    </div>
  );
};

export default Spinner;
