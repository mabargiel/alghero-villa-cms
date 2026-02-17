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
      name: 'video',
      title: 'Wideo (desktop)',
      type: 'file',
      description: 'Opcjonalne. Gdy ustawione, zastępuje rotację zdjęć na desktopie. Akceptuje MP4.',
      options: {
        accept: 'video/mp4',
      },
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Hero'}
    },
  },
})
