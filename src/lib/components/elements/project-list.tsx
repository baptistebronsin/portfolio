import type { CollectionEntry } from "astro:content";
import ProjectCard from "./project-card";
import ProjectFilter from "./project-filter";
import { useEffect, useState } from "react";

type Props = {
    projectsCollection: CollectionEntry<"project">[];
}

export default function ProjectList({ projectsCollection }: Props) {
    const [projects, setProjects] = useState(projectsCollection);

    useEffect(() => {
        console.log("Projects updated:", projects);
    }, [projects])

    return (
        <div className="text-lg sm:text-xl/8 text-(--ui-text-muted) text-pretty mt-0 sm:mt-6">
            {projectsCollection.length > 1 && <ProjectFilter projects={projectsCollection} setProjects={setProjects} />}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projects.map((project) => <ProjectCard project={project} />)}
            </div>
            {
                projects.length === 0 && (
                    <p className="text-center text-muted-foreground mt-4">
                        No projects found.
                    </p>
                )
            }
        </div>
    )
} 