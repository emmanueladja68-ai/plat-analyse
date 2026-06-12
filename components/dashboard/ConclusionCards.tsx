import { Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react'
import { Conclusion } from '@/types'

const ICON_MAP = {
  Lightbulb,
  AlertTriangle,
  TrendingUp,
}

const COLOR_CONFIG = {
  blue: {
    iconBg: 'bg-[#eff6ff]',
    iconColor: 'text-primary',
  },
  orange: {
    iconBg: 'bg-[#fff7ed]',
    iconColor: 'text-tertiary',
  },
  gray: {
    iconBg: 'bg-surface-container',
    iconColor: 'text-secondary',
  },
}

export default function ConclusionCards({ conclusions }: { conclusions: Conclusion[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
      {conclusions.map((c, i) => {
        const Icon = ICON_MAP[c.icon as keyof typeof ICON_MAP] || Lightbulb
        const colors = COLOR_CONFIG[c.color]
        return (
          <div
            key={i}
            className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl transition-transform hover:-translate-y-1 duration-200"
          >
            <div
              className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}
            >
              <Icon size={20} strokeWidth={1.5} className={colors.iconColor} />
            </div>
            <h5 className="text-label-sm text-on-surface mb-2 font-bold uppercase tracking-wide">
              {c.title}
            </h5>
            <p className="text-body-sm text-on-surface-variant">{c.text}</p>
          </div>
        )
      })}
    </section>
  )
}
