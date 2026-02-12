import {defineArrayMember, defineField, defineType} from 'sanity'

export const galleryImageItem = defineType({
  name: 'galleryImageItem',
  title: 'Zdjęcie w galerii',
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
      media: 'image',
    },
    prepare({media}) {
      return {
        media,
      }
    },
  },
})

export const gallery = defineType({
  name: 'gallery',
  title: 'Galeria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      initialValue: 'Galeria główna',
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Gallery'}
    },
  },
})
