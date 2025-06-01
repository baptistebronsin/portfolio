import type { CollectionEntry } from 'astro:content';
import config from '../../../../portfolio.config';
import { Badge } from '../ui/badge';
import { Archive, ExternalLink, Github, Gitlab, RadioTower, Telescope, University, Unplug } from 'lucide-react';

type Props = {
  project: CollectionEntry<"project">
}

export default function ProjectCard(props: Props) {
  return (
    <a
      href={`/projects/${props.project.data.permalink}`}
      className="relative flex flex-col gap-2 border border-border hover:border-primary/75 bg-primary/5 transition-colors duration-200 rounded-lg p-3"
    >
      {import.meta.env.DEV && !props.project.data.publishedAt && (
        <div className="absolute z-50 top-1 right-2">
          <Badge variant="default">
            Invisible in production mode
          </Badge>
        </div>
      )}

      <div className="flex flex-col gap-3 justify-between h-full">
        <div className='flex flex-col gap-3'>
          <div className='flex flex-row justify-between'>
              <div  className='flex flex-row justify-between gap-2'>
                  <div className="rounded-lg w-12 h-12">
                      <img
                          src={props.project.data.logo}
                          alt={props.project.data.title}
                          className="w-12 h-12 object-cover rounded-lg"
                      />
                  </div>
                  <div className="flex flex-col gap-2">
                      <h3 className="flex flex-row gap-2 items-center text-lg font-semibold leading-none">
                          {props.project.data.title}
                          {props.project.data.links?.website && <a href={props.project.data.links?.website} target='_blank'><ExternalLink className="h-4 w-4 text-foreground" /></a>}
                      </h3>
                      <div>
                          {props.project.data.type && 
                              props.project.data.type === 'personnal' ? (
                                  <Badge variant="outline" className="text-xs text-primary border-primary/40">
                                      <Telescope className="inline w-4 h-4 mr-1" />
                                      personnal
                                  </Badge>
                              ) : (
                                  <Badge variant="outline" className="text-xs text-primary border-primary/40">
                                      <University className="inline w-4 h-4 mr-1" />
                                      university
                                  </Badge>
                              )
                              
                          }
                          {props.project.data.status && 
                              props.project.data.status === 'archived' ? (
                                  <Badge variant="outline" className="text-xs text-orange-400 border-orange-400/40 ml-2">
                                      <Archive className="inline w-4 h-4 mr-1" />
                                      archived
                                  </Badge>
                              ) : props.project.data.status === 'active' ? (
                                  <Badge variant="outline" className="text-xs text-green-600 border-green-600/40 ml-2">
                                      <RadioTower className="inline w-4 h-4 mr-1" />
                                      active
                                  </Badge>
                              ) : (
                                  <Badge variant="outline" className="text-xs text-red-600 border-red-600/40 ml-2">
                                      <Unplug className="inline w-4 h-4 mr-1" />
                                      inactive
                                  </Badge>
                              )
                          }
                      </div>
                  </div>
              </div>
              <div className='flex flex-col justify-between'>
                  {props.project.data.links?.github && <a href={props.project.data.links.github} target='_blank'><Github className="inline w-6 h-6 text-foreground" /></a>}
                  {props.project.data.links?.gitlab && <a href={props.project.data.links.gitlab} target='_blank'><Gitlab className="inline w-6 h-6 text-foreground" /></a>}
              </div>
          </div>

          <div className='flex flex-col gap-2'>
              <p className="text-sm text-muted-foreground">
                  {props.project.data.description}
              </p>
              {props.project.data.tags && props.project.data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                      {props.project.data.tags.map((tag) => (
                          <Badge variant="outline" className="text-xs" key={tag}>
                              {tag}
                          </Badge>
                      ))}
                  </div>
              )}
          </div>
        </div>

        <div>
          {props.project.data.contributors && props.project.data.contributors.length > 3 && (
            <div className="flex -space-x-1 overflow-hidden">
              {
                props.project.data.contributors?.slice(0, 10).map((contributor) => {
                  const contributorData = config.authors[contributor];
                  return (
                    <img
                      alt={contributorData.name}
                      src={contributorData.avatar}
                      width="32"
                      height="32"
                      className="inline-block rounded-full"
                      key={contributor}
                    />
                  );
                }
              )}
              {props.project.data.contributors?.length > 10 && (
                <div
                  className="w-[32px] h-[32px] rounded-full bg-gray-200 relative flex items-center justify-center"
                >
                  <span className="text-gray-600 text-sm">{`+${Math.min(props.project.data.contributors?.length - 10, 99)}`}</span>
                </div>
              )}
            </div>
          )}

          {props.project.data.contributors && props.project.data.contributors.length <= 3 && (
            <div className='flex flex-wrap gap-3'>
              {props.project.data.contributors?.map((contributor) => (
                  <div
                    data-orientation="horizontal"
                    className="relative flex items-center gap-2"
                    key={contributor}
                  >
                    <span className="inline-flex items-center justify-center select-none overflow-hidden rounded-full align-middle size-8 text-base shrink-0 transform transition-transform duration-200">
                      <img
                        width="32"
                        height="32"
                        alt={contributor}
                        className="h-full w-full rounded-[inherit] object-cover"
                        src={config.authors[contributor].avatar}
                      />
                    </span>
                    <div>
                      <p className="font-medium text-sm">
                        {config.authors[contributor].name}
                      </p>
                      <p className="text-muted-foreground transition-colors text-xs">
                        @{contributor}
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
