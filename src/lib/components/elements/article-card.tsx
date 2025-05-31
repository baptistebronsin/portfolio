import type { CollectionEntry } from 'astro:content';
import config from '../../../../portfolio.config';
import { Badge } from '../ui/badge';

type Props = {
  article: CollectionEntry<"article">
}

export default function ArticleCard(props: Props) {
  return (
    <a
      href={`/articles/${props.article.data.permalink}`}
      className="relative flex flex-col gap-2 border border-border hover:border-primary/75 bg-primary/5 transition-colors duration-200 rounded-lg p-4"
    >
      {import.meta.env.DEV && !props.article.data.publishedAt && (
        <div className="absolute z-50 top-1 right-2">
          <Badge variant="default">
            Invisible in production mode
          </Badge>
        </div>
      )}
      <div className="rounded-lg">
        <img
          src={props.article.data?.thumbnail}
          alt={props.article.data.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 pt-2">
          <h3 className="text-lg font-semibold">{props.article.data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {props.article.data.description}
          </p>
        </div>

        <div className="pt-2">
          {props.article.data.authors && props.article.data.authors.length > 3 && (
            <div className="flex -space-x-1 overflow-hidden">
              {
                props.article.data.authors?.slice(0, 10).map((author) => {
                  const authorData = config.authors[author];
                  return (
                    <img
                      alt={authorData.name}
                      src={authorData.avatar}
                      width="32"
                      height="32"
                      className="inline-block rounded-full"
                      key={author}
                    />
                  );
                }
              )}
              {props.article.data.authors?.length > 10 && (
                <div
                  className="w-[32px] h-[32px] rounded-full bg-gray-200 relative flex items-center justify-center"
                >
                  <span className="text-gray-600 text-sm">{`+${Math.min(props.article.data.authors?.length - 10, 99)}`}</span>
                </div>
              )}
            </div>
          )}

          {props.article.data.authors && props.article.data.authors.length <= 3 && (
            <div className='flex flex-wrap gap-3'>
              {props.article.data.authors?.map((author) => (
                  <div
                    data-orientation="horizontal"
                    className="relative flex items-center gap-2"
                  >
                    <span className="inline-flex items-center justify-center select-none overflow-hidden rounded-full align-middle size-8 text-base shrink-0 transform transition-transform duration-200">
                      <img
                        width="32"
                        height="32"
                        alt={author}
                        className="h-full w-full rounded-[inherit] object-cover"
                        src={config.authors[author].avatar}
                      />
                    </span>
                    <div>
                      <p className="font-medium text-sm">
                        {config.authors[author].name}
                      </p>
                      <p className="text-muted-foreground transition-colors text-xs">
                        @{author}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}
