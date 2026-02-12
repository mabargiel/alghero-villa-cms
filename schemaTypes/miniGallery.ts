import {defineArrayMember, defineField, defineType} from 'sanity'

export const miniGallery = defineType({
  name: 'miniGallery',
  title: 'Mini galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      initialValue: 'Mini galeria',
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          title: 'Zdjęcie',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      validation: (rule) => rule.min(5).max(5),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Mini galeria'}
    },
  },
})
