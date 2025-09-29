import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary-light transition-all',
  secondary:
    'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 hover:opacity-90 transition-all',
  outline:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 transition-all',
  ghost: 'text-slate-600 hover:bg-muted hover:text-foreground transition-all',
  destructive:
    'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30 hover:opacity-90 transition-all',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`rounded-xl font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none ${
          variantStyles[variant]
        } ${sizeStyles[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';