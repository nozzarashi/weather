import { type ChangeEvent } from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  inputType?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  startIcon?: string;
}

export function Input({
  inputClassName = '',
  wrapperClassName = '',
  placeholder,
  inputType = 'text',
  onChange,
  onFocus,
  startIcon,
  value,
}: InputProps) {
  return (
    <div className={wrapperClassName}>
      <img src={startIcon} alt="Иконка поиска" />
      <input
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={inputClassName}
        placeholder={placeholder}
        type={inputType}
      />
    </div>
  );
}
