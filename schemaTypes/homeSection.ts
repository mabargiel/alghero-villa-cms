import {defineField, defineType} from 'sanity'

const sectionOptions = [
  {title: 'Nieruchomość', value: 'property'},
  {title: 'Wnętrza', value: 'interiors'},
  {title: 'Ogród i tarasy', value: 'garden'},
  {title: 'Lokalizacja', value: 'location'},
]

export const homeSection = defineType({
  name: 'homeSection',
  title: 'Sekcja - Strona główna',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionKey',
      title: 'Sekcja',
      type: 'string',
      options: {
        list: sectionOptions,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'mediaImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {sectionKey: 'sectionKey', media: 'image.image'},
    prepare({sectionKey, media}) {
      const title =
        sectionOptions.find((option) => option.value === sectionKey)?.title || 'Sekcja'
      return {
        title,
        media,
      }
    },
  },
})
