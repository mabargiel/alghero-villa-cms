import {defineArrayMember, defineField, defineType} from 'sanity'

const roomOptions = [
  {title: 'Sypialnia 1', value: 'bedroom-1'},
  {title: 'Sypialnia 2', value: 'bedroom-2'},
  {title: 'Sypialnia 3', value: 'bedroom-3'},
  {title: 'Sypialnia 4', value: 'bedroom-4'},
  {title: 'Sypialnia 5', value: 'bedroom-5'},
  {title: 'Sypialnia 6', value: 'bedroom-6'},
  {title: 'Salon i Kuchnia', value: 'salon'},
]

const exteriorOptions = [
  {title: 'Ogród', value: 'garden'},
  {title: 'Strefa wypoczynkowa', value: 'relaxation-zone'},
  {title: 'Weranda i taras', value: 'veranda'},
  {title: 'Boisko sportowe', value: 'sports-court'},
  {title: 'Kuchnia letnia', value: 'summer-kitchen'},
  {title: 'Parking', value: 'parking'},
  {title: 'Widoki / Otoczenie', value: 'views'},
]

const villaRoomImages = defineType({
  name: 'villaRoomImages',
  title: 'Zdjęcia pokoju',
  type: 'object',
  fields: [
    defineField({
      name: 'roomKey',
      title: 'Pokój',
      type: 'string',
      options: {list: roomOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Zdjęcie okładkowe',
      type: 'mediaImage',
      description: 'Główne zdjęcie wyświetlane na kafelku',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galeria zdjęć',
      type: 'array',
      of: [defineArrayMember({type: 'mediaImage'})],
      description: 'Zdjęcia pokoju i łazienki — wyświetlane w karuzeli po rozwinięciu',
    }),
  ],
  preview: {
    select: {roomKey: 'roomKey', media: 'coverImage.image'},
    prepare({roomKey, media}) {
      const title = roomOptions.find((o) => o.value === roomKey)?.title || 'Pokój'
      return {title, media}
    },
  },
})

const villaExteriorImage = defineType({
  name: 'villaExteriorImage',
  title: 'Zdjęcie sekcji zewnętrznej',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionKey',
      title: 'Sekcja',
      type: 'string',
      options: {list: exteriorOptions, layout: 'radio'},
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
      const title = exteriorOptions.find((o) => o.value === sectionKey)?.title || 'Sekcja'
      return {title, media}
    },
  },
})

export const villaPage = defineType({
  name: 'villaPage',
  title: 'Obiekt — Villa',
  type: 'document',
  fields: [
    defineField({
      name: 'heroNavInteriorsImage',
      title: 'Nawigacja — zdjęcie „Wnętrza"',
      type: 'mediaImage',
      description: 'Zdjęcie wyświetlane na kafelku nawigacyjnym „Wnętrza" na stronie villa',
    }),
    defineField({
      name: 'heroNavOutdoorsImage',
      title: 'Nawigacja — zdjęcie „Na zewnątrz"',
      type: 'mediaImage',
      description: 'Zdjęcie wyświetlane na kafelku nawigacyjnym „Na zewnątrz" na stronie villa',
    }),
    defineField({
      name: 'roomImages',
      title: 'Zdjęcia pokoi (Wnętrza)',
      type: 'array',
      of: [defineArrayMember({type: 'villaRoomImages'})],
      description: 'Dodaj zdjęcia okładkowe i galerię dla każdego pokoju',
    }),
    defineField({
      name: 'exteriorImages',
      title: 'Zdjęcia sekcji zewnętrznych (Na zewnątrz)',
      type: 'array',
      of: [defineArrayMember({type: 'villaExteriorImage'})],
      description: 'Dodaj zdjęcie dla każdej sekcji zewnętrznej',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Obiekt — Villa Monte Calvia'}
    },
  },
})

export {villaRoomImages, villaExteriorImage}
