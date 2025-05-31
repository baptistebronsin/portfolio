import type { CollectionEntry } from 'astro:content'
import ArticleCard from './article-card'

type Props = {
  articles: CollectionEntry<"article">[]
}

export function HomeArticle(props: Props) {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 dark:text-accent-foreground sm:text-5xl">
          See my latest articles
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {props.articles.slice(0, 3).map((article) => <ArticleCard key={article.data.permalink} article={article} />)}
        </div>
        {
          props.articles.length > 3 && (
            <div className="mt-8 text-center">
              <a
                href="/articles"
                className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                See all articles
              </a>
            </div>
          )
        }
      </div>
    </div>
  )
}