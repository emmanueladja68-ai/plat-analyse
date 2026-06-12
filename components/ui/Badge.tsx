type BadgeVariant = 'blue' | 'green' | 'orange' | 'gray' | 'purple' | 'red'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  blue: 'bg-secondary-container text-on-secondary-container',
  green: 'bg-[#dcfce7] text-[#166534]',
  orange: 'bg-[#fef3c7] text-[#92400e]',
  gray: 'bg-surface-container text-secondary',
  purple: 'bg-[#ede9fe] text-[#5b21b6]',
  red: 'bg-error-container text-error',
}

export default function Badge({
  children,
  variant = 'gray',
}: {
  children: React.ReactNode
  variant?: BadgeVariant
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-medium ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  )
}
