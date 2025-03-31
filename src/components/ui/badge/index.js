import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center gap-x-1.5 py-1 px-2 rounded-lg text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border-slate-100 border bg-slate-50/50 text-slate-600',
        success: 'border-teal-100 border bg-teal-50/50 text-teal-600',
        warning: 'border-orange-100 border bg-orange-50/50 text-orange-600',
        destructive: 'border-rose-100 border bg-rose-50/50 text-rose-600',
        info: 'border-blue-100 border bg-blue-50/50 text-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
