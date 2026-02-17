import {defineArrayMember, defineField, defineType} from 'sanity'

export const pricingConfig = defineType({
  name: 'pricingConfig',
  title: 'Cennik',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      initialValue: 'Cennik',
    }),
    defineField({
      name: 'baseRanges',
      title: 'Zakresy cenowe',
      type: 'array',
      of: [defineArrayMember({type: 'pricingRange'})],
      validation: (rule) => rule.min(1),
    }),
defineField({
      name: 'perks',
      title: 'Udogodnienia',
      description: 'Informacje o korzyściach (np. "Samochód do dyspozycji gości — Gratis!").',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Cennik'}
    },
  },
})
