import {defineField, defineType} from 'sanity'

export const mediaImage = defineType({
  name: 'mediaImage',
  title: 'Zdjęcie',
  type: 'object',
  fields: [
    defineField({
      name: 'altText',
      title: 'Opis alternatywny (ALT)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'altText',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title,
        media,
      }
    },
  },
})
