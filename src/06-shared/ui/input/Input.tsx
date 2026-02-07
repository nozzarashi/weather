import { type ChangeEvent } from 'react';
import styles from './input.module.css';

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

export function Input({ placeholder, inputType = 'text', onChange, onFocus, startIcon, value }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <img src={startIcon} alt="Иконка поиска" />
      <input
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={styles.input}
        placeholder={placeholder}
        type={inputType}
      />
    </div>
  );
}
