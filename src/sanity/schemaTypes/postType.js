import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'courierId',
      title: 'Courier',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'TCS', value: 'tcs' },
          { title: 'Leopards Courier', value: 'leopards' },
          { title: 'BlueEx', value: 'blueex' },
          { title: 'M&P Courier', value: 'mp' },
          { title: 'Pakistan Post', value: 'pakistan-post' },
          { title: 'Trax', value: 'trax' },
          { title: 'USPS', value: 'usps' },
          { title: 'FedEx', value: 'fedex' },
          { title: 'UPS', value: 'ups' },
          { title: 'DHL', value: 'dhl' },
          { title: 'Aramex', value: 'aramex' },
          { title: 'SF Express', value: 'sf-express' },
          { title: 'Royal Mail', value: 'royal-mail' },
          { title: 'Evri', value: 'evri' },
          { title: 'Canada Post', value: 'canada-post' },
          { title: 'Australia Post', value: 'australia-post' },
          { title: 'Japan Post', value: 'japan-post' },
          { title: 'India Post', value: 'india-post' },
          { title: 'Poste Italiane', value: 'poste-italiane' },
          { title: 'Correos', value: 'correos' },
          { title: 'GLS', value: 'gls' },
          { title: 'DPD Europe & UK', value: 'dpd' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Article Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(250),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),

    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'category' }],
        }),
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],

  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      courierId: 'courierId',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare({ title, courierId, publishedAt, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : 'Date not set'

      return {
        title,
        subtitle: `${courierId || 'No courier selected'} • ${date}`,
        media,
      }
    },
  },
})