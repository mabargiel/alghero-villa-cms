import {defineField, defineType} from 'sanity'

export const pricingPromotion = defineType({
  name: 'pricingPromotion',
  title: 'Promocja',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Typ',
      type: 'string',
      options: {
        list: [
          {title: 'Procent (%)', value: 'percentage'},
          {title: 'Stała cena (€/dzień)', value: 'fixed'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Wartość',
      type: 'number',
      description: 'Dla procentu: wartość zniżki (np. 15 = -15%). Dla stałej ceny: cena za dzień w €.',
      validation: (rule) => rule.required().positive(),
    }),
  ],
  preview: {
    select: {label: 'label', type: 'type', value: 'value', startDate: 'startDate', endDate: 'endDate'},
    prepare({label, type, value, startDate, endDate}) {
      const suffix = type === 'percentage' ? `−${value}%` : `€${value}/dzień`
      const dates = startDate && endDate ? `${startDate} → ${endDate}` : ''
      return {
        title: label || 'Promocja',
        subtitle: [suffix, dates].filter(Boolean).join(' | '),
      }
    },
  },
})
