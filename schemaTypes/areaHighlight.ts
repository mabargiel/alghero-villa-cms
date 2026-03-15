import {defineField, defineType} from 'sanity'

export const areaHighlight = defineType({
  name: 'areaHighlight',
  title: 'Strefy willi — zdjęcia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      initialValue: 'Strefy willi',
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia stref',
      type: 'array',
      description:
        'Kolejność zdjęć musi odpowiadać kolejności stref w kodzie: 1) Wnętrza, 2) Werandy, 3) Ogród, 4) Boisko',
      of: [{type: 'mediaImage'}],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Strefy willi'}
    },
  },
})
