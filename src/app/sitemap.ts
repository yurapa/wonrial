import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://wonrial.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://wonrial.com/ru',
          uk: 'https://wonrial.com/uk',
        },
      },
    },
    {
      url: 'https://wonrial.com/services',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://wonrial.com/ru/services',
          uk: 'https://wonrial.com/uk/services',
        },
      },
    },
    {
      url: 'https://wonrial.com/ai',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://wonrial.com/ru/ai',
          uk: 'https://wonrial.com/uk/ai',
        },
      },
    },
    {
      url: 'https://wonrial.com/contact',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://wonrial.com/ru/contact',
          uk: 'https://wonrial.com/uk/contact',
        },
      },
    },
  ];
}
