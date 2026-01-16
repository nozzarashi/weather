import './button.css';

interface ButtonProps {
  text: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  onclick?: () => void;
}

export function Button({ className, text, type = 'submit', beforeIcon, afterIcon, onclick }: ButtonProps) {
  return (
    <button type={type} onClick={onclick} className={`button ${className}`}>
      {beforeIcon}
      <span>{text}</span>
      {afterIcon}
    </button>
  );
}
