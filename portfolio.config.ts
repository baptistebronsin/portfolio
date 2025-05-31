import { defineExplainerConfig } from '@/utils'

export default defineExplainerConfig({
  meta: {
    title: 'Baptiste Bronsin',
    description: 'Portfolio de Baptiste Bronsin.',
    thumbnail: 'https://placehold.co/1200x630',
  },
  urls: {
    github: 'https://github.com/baptistebronsin'
  },
  authors: {
    leadcode_dev: {
      name: 'LeadcodeDev',
      avatar: 'https://avatars.githubusercontent.com/u/8946317?v=4',
      href: 'https://github.com/LeadcodeDev',
    },
    baptiste_bronsin: {
      name: 'Baptiste Bronsin',
      avatar: 'https://avatars.githubusercontent.com/u/79365734?v=4&size=64',
      href: 'https://github.com/baptistebronsin'
    },
    courtcircuits: {
      name: 'Tristan Radulescu',
      avatar: 'https://avatars.githubusercontent.com/u/90451752?v=4',
      href: 'https://github.com/Courtcircuits'
    },
    stheoulle: {
      name: 'Sarah Theoulle',
      avatar: 'https://avatars.githubusercontent.com/u/106761192?v=4',
      href: 'https://github.com/stheoulle'
    }
  },
  navbar: [
    {
      label: 'Studies',
      href: '/#studies',
    },
    {
      label: 'Career',
      href: '/#career',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    // {
    //   label: 'Docs',
    //   items: [
    //     {
    //       label: 'Framework',
    //       description: 'Discover Explainer framework guidelines and usages.',
    //       href: '/docs/framework/getting-started',
    //     },
    //     {
    //       label: 'Syntax',
    //       description: 'Learn markdown syntax and markdown components.',
    //       href: '/docs/syntax/texts',
    //     },
    //   ],
    // },
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