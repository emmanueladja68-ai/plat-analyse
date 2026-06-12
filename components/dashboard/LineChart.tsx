'use client'

import { Download, Filter } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const DEFAULT_DATA = [
  { month: 'JAN', value: 82000 },
  { month: 'FÉV', value: 78000 },
  { month: 'MAR', value: 85000 },
  { month: 'AVR', value: 91000 },
  { month: 'MAI', value: 88000 },
  { month: 'JUN', value: 95000 },
  { month: 'JUL', value: 89000 },
  { month: 'AOÛ', value: 102000 },
  { month: 'SEP', value: 96000 },
  { month: 'OCT', value: 108000 },
  { month: 'NOV', value: 112000 },
  { month: 'DÉC', value: 124500 },
]

type ChartPoint = { month: string; value: number }

export default function LineChart({ data = DEFAULT_DATA }: { data?: ChartPoint[] }) {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg mb-lg">
      <div className="flex justify-between items-center mb-xl">
        <div>
          <h4 className="text-headline-sm">Évolution mensuelle</h4>
          <p className="text-body-sm text-secondary">Comparatif des dépenses totales par mois</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-secondary">
            <Download size={16} strokeWidth={1.5} />
          </button>
          <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-secondary">
            <Filter size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#004ac6" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#004ac6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#505f76', fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid #c3c6d7',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'Inter',
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any) =>
                new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(v))
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#004ac6"
              strokeWidth={2.5}
              fill="url(#chartGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#004ac6', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
