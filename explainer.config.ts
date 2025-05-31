import { defineExplainerConfig } from '@/utils'

export default defineExplainerConfig({
  meta: {
    title: 'Portfolio',
    description: 'Portfolio de Baptiste Bronsin.',
    thumbnail: 'https://placehold.co/1200x630',
  },
  urls: {
    github: 'https://github.com/baptistebronsin',
    getStarted: '/docs/framework/getting-started',
    documentation: '/docs/framework/installation'
  },
  docs: {
    framework: {
      icon: 'lucide:cuboid',
      label: 'Framework',
      href: '/docs/framework/getting-started',
      baseUrl: '/docs/framework',
    },
    syntax: {
      icon: 'lucide:pencil-line',
      label: 'Syntax',
      href: '/docs/syntax/texts',
      baseUrl: '/docs/syntax',
    },
  },
  article: {
    defaults: {
      thumbnail: 'https://placehold.co/1200x630',
    },
    authors: {
      leadcode_dev: {
        name: 'LeadcodeDev',
        avatar: 'https://avatars.githubusercontent.com/u/8946317?v=4',
        href: 'https://github.com/LeadcodeDev',
      },
    }
  },
  navbar: [
    {
      label: 'Docs',
      items: [
        {
          label: 'Framework',
          description: 'Discover Explainer framework guidelines and usages.',
          href: '/docs/framework/getting-started',
        },
        {
          label: 'Syntax',
          description: 'Learn markdown syntax and markdown components.',
          href: '/docs/syntax/texts',
        },
      ],
    },
    {
      label: 'Articles',
      href: '/articles',
    },
  ],
  social: {
    github: {
      href: 'https://github.com/LeadcodeDev/explainer',
      icon: 'mdi:github',
    },
  }
})