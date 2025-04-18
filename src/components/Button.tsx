interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
  }
  
  export default function Button({
    label,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = '',
  }: ButtonProps) {
    const baseStyle =
      'px-3 py-1 text-sm rounded font-medium transition-colors duration-200';
    const variants: Record<string, string> = {
      primary: 'bg-emerald-800 text-white hover:bg-emerald-900',
      secondary: 'bg-blue-600 text-white hover:bg-blue-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyle} ${variants[variant]} ${className} cursor-pointer`}
      >
        {label}
      </button>
    );
  }
  