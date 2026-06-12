import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-surface-tint',
  outline: 'border border-outline-variant text-on-surface hover:bg-surface-container',
  ghost: 'text-secondary hover:bg-surface-container',
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-[6px] text-label-sm',
  md: 'px-4 py-2 text-label-md',
  lg: 'px-6 py-3 text-label-md',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export default Button
