import type { CollectionEntry } from 'astro:content'
import ArticleCard from './article-card'
import { Button } from '../ui/button'
import { NewspaperIcon } from 'lucide-react'

type Props = {
  articles: CollectionEntry<"article">[]
}

export function HomeArticle(props: Props) {
  return (
    <div className="bg-background py-18 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 dark:text-accent-foreground sm:text-5xl">
          See my latest articles
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {props.articles.slice(0, 3).map((article) => <ArticleCard key={article.data.permalink} article={article} />)}
        </div>
        {
          props.articles.length > 3 && (
            <div className='mt-8 text-center '>
              <div className="inline-block">
                <Button asLink className="flex items-center gap-2 cursor-pointer" href='/articles'>
                  <NewspaperIcon className="w-5 h-5" />
                  See all articles
                </Button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}