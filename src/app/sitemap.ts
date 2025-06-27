import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.wonrial.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://www.wonrial.com/ru',
          uk: 'https://www.wonrial.com/uk',
        },
      },
    },
    {
      url: 'https://www.wonrial.com/services',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://www.wonrial.com/ru/services',
          uk: 'https://www.wonrial.com/uk/services',
        },
      },
    },
    {
      url: 'https://www.wonrial.com/ai',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://www.wonrial.com/ru/ai',
          uk: 'https://www.wonrial.com/uk/ai',
        },
      },
    },
    {
      url: 'https://www.wonrial.com/contact',
      lastModified: new Date(),
      alternates: {
        languages: {
          ru: 'https://www.wonrial.com/ru/contact',
          uk: 'https://www.wonrial.com/uk/contact',
        },
      },
    },
  ];
}
