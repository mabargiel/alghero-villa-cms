import {defineArrayMember, defineField, defineType} from 'sanity'

const locationImageSet = defineType({
  name: 'locationImageSet',
  title: 'Zestaw zdjęć lokalizacji',
  type: 'object',
  fields: [
    defineField({
      name: 'locationKey',
      title: 'Klucz lokalizacji',
      type: 'string',
      description: 'Musi odpowiadać wartości id w pliku location-data.ts (np. "mugoni", "le-bombarde")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia',
      type: 'array',
      of: [defineArrayMember({type: 'mediaImage'})],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'locationKey',
      media: 'images.0.image',
    },
    prepare({title, media}) {
      return {
        title: title ?? '(brak klucza)',
        media,
      }
    },
  },
})

const locationPage = defineType({
  name: 'locationPage',
  title: 'Strona — Okolica',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Zdjęcie hero',
      type: 'mediaImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beaches',
      title: 'Plaże',
      type: 'array',
      of: [defineArrayMember({type: 'locationImageSet'})],
    }),
    defineField({
      name: 'towns',
      title: 'Miasteczka',
      type: 'array',
      of: [defineArrayMember({type: 'locationImageSet'})],
    }),
    defineField({
      name: 'nature',
      title: 'Przyroda',
      type: 'array',
      of: [defineArrayMember({type: 'locationImageSet'})],
    }),
    defineField({
      name: 'archaeology',
      title: 'Zabytki archeologii',
      type: 'array',
      of: [defineArrayMember({type: 'locationImageSet'})],
    }),
    defineField({
      name: 'dayTrips',
      title: 'Wycieczki jednodniowe',
      type: 'array',
      of: [defineArrayMember({type: 'locationImageSet'})],
    }),
    defineField({
      name: 'diving',
      title: 'Nurkowanie i rejsy',
      type: 'array',
      of: [defineArrayMember({type: 'locationImageSet'})],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Strona — Okolica',
      }
    },
  },
})

export {locationImageSet, locationPage}
