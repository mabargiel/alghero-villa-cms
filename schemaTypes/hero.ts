import {defineArrayMember, defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      initialValue: 'Hero',
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia hero (rotacja)',
      type: 'array',
      of: [defineArrayMember({type: 'mediaImage'})],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Zdjęcie mobilne / poster',
      type: 'mediaImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Wideo (desktop)',
      type: 'url',
      description: 'Opcjonalne. Gdy ustawione, zastępuje rotację zdjęć na desktopie.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Hero'}
    },
  },
})
