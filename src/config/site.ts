export const siteConfig = {
  name: "typixie",
  url: "https://typixie.vercel.app",
  description: "Practice your typing skills.",

  links: {
    github: "https://github.com/tylergeorges/typixie",
  },
} as const;

export type SiteConfig = typeof siteConfig;
