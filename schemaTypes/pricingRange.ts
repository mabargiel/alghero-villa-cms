import {defineArrayMember, defineField, defineType} from 'sanity'

type PromotionItem = {
  _key?: string
  label?: string
  startDate?: string
  endDate?: string
  type?: string
  value?: number
}

export const pricingRange = defineType({
  name: 'pricingRange',
  title: 'Zakres cenowy',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Nazwa',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Data od',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Data do',
      type: 'date',
      validation: (rule) =>
        rule.required().custom((endDate, context) => {
          const parent = context.parent as {startDate?: string} | undefined
          if (!parent?.startDate || !endDate) return true
          return endDate > parent.startDate ? true : 'Data końcowa musi być późniejsza niż data początkowa'
        }),
    }),
    defineField({
      name: 'pricePerDay',
      title: 'Cena za dzień (€)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'promotions',
      title: 'Promocje',
      type: 'array',
      of: [defineArrayMember({type: 'pricingPromotion'})],
      validation: (rule) =>
        rule.custom((promotions, context) => {
          const items = promotions as PromotionItem[] | undefined
          if (!items || items.length === 0) return true
          const parent = context.parent as {startDate?: string; endDate?: string} | undefined
          if (!parent?.startDate || !parent?.endDate) return true

          const rangeStart = parent.startDate
          const rangeEnd = parent.endDate

          for (const promo of items) {
            if (!promo.startDate || !promo.endDate) continue

            if (promo.startDate < rangeStart || promo.endDate > rangeEnd) {
              return `Promocja "${promo.label || '?'}" wykracza poza zakres dat (${rangeStart} – ${rangeEnd})`
            }

            if (promo.startDate >= promo.endDate) {
              return `Promocja "${promo.label || '?'}": data końcowa musi być późniejsza niż początkowa`
            }
          }

          // Check for overlapping promotions
          const sorted = [...items]
            .filter((p): p is PromotionItem & {startDate: string; endDate: string} =>
              Boolean(p.startDate && p.endDate),
            )
            .sort((a, b) => a.startDate.localeCompare(b.startDate))

          for (let i = 0; i < sorted.length - 1; i++) {
            if (sorted[i].endDate > sorted[i + 1].startDate) {
              return `Promocje "${sorted[i].label || '?'}" i "${sorted[i + 1].label || '?'}" nakładają się na siebie`
            }
          }

          return true
        }),
    }),
  ],
  preview: {
    select: {label: 'label', pricePerDay: 'pricePerDay', startDate: 'startDate', endDate: 'endDate'},
    prepare({label, pricePerDay, startDate, endDate}) {
      const dates = startDate && endDate ? `${startDate} → ${endDate}` : ''
      const price = pricePerDay ? `€${pricePerDay}/dzień` : ''
      return {
        title: label || 'Zakres cenowy',
        subtitle: [price, dates].filter(Boolean).join(' | '),
      }
    },
  },
})
