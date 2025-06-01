import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type HeadingNode = {
  depth: number;
  slug: string;
  text: string;
  children: HeadingNode[];
};

type NavbarCollection = {
  label: string
  items?: NavbarItem[]
  href?: string
}

type NavbarItem = {
  label: string
  description: string
  href: string
}

type PortfolioMeta = {
  title: string
  description: string
  thumbnail: {
    image: string
    alt: string
    width: number
    height: number
  }
}

const SocialLink = {
  github: 'Github',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  twitch: 'Twitch',
} as const

type PortfolioSocial = {
  [key in keyof typeof SocialLink]?: {
    href: string
    icon: string
  }
}

type PortfolioConfig = {
  meta: PortfolioMeta
  urls: {
    github?: string
    getStarted?: string
    documentation?: string
  },
  navbar: NavbarCollection[],
  authors: {
    [key: string]: {
      name: string
      avatar: string
      href: string
    }
  },
  social: PortfolioSocial
}

export function definePortfolioConfig(config: PortfolioConfig) {
  return config
}
