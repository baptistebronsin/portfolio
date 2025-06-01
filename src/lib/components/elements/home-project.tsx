import type { CollectionEntry } from 'astro:content'
import { Button } from '../ui/button'
import { Rocket } from 'lucide-react'
import ProjectCard from './project-card'

type Props = {
  projects: CollectionEntry<"project">[]
}

export function HomeProject(props: Props) {
  return (
    <div className="bg-background py-18 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 dark:text-accent-foreground sm:text-5xl">
          See my latest projects
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {props.projects.slice(0, 2).map((project) => <ProjectCard key={project.data.permalink} project={project} />)}
        </div>
        {
          props.projects.length > 2 && (
            <div className='mt-8 text-center '>
              <div className="inline-block">
                <Button asLink className="flex items-center gap-2 cursor-pointer" href='/projects'>
                  <Rocket className="w-5 h-5" />
                  See all projects
                </Button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}