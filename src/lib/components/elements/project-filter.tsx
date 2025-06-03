import type { CollectionEntry } from "astro:content";
import { Input } from "../ui/input";
import config from "../../../../portfolio.config";
import { Info } from "lucide-react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";

type Props = {
    projects: CollectionEntry<"project">[];
    setProjects: (projects: CollectionEntry<"project">[]) => void;
}

export default function ProjectFilter({ projects, setProjects }: Props) {
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();

        if (query === "") {
            setProjects(projects);
            return;
        }

        const filterCriteria = query.split(/\s+/).map(term => term.trim()).filter(term => term.length > 0);

        const filteredProjects = projects.filter(project => {
            const title = project.data.title.toLowerCase();
            const description = project.data.description.toLowerCase();
            const status = project.data.status?.toLowerCase() || "";
            const type = project.data.type?.toLowerCase() || "";
            const permalink = project.data.permalink.toLowerCase();
            const tags = project.data.tags?.map(tag => tag.toLowerCase()) || [];
            const contributors = project.data.contributors?.map(contributor => contributor.toLowerCase()) || [];
            const links = project.data.links || {};

            return filterCriteria.every(term =>
                title.includes(term) ||
                description.includes(term) ||
                status.includes(term) ||
                type.includes(term) ||
                permalink.includes(term) ||
                tags.some(tag => tag.includes(term)) ||
                contributors.some(contributor => contributor.includes(term) || (config.authors[contributor]?.name.toLowerCase().includes(term))) ||
                (links.website?.toLowerCase().includes(term) || links.github?.toLowerCase().includes(term) || links.gitlab?.toLowerCase().includes(term))
            );
        });

        setProjects(filteredProjects.sort((a, b) => {
            const dateA = a.data.publishedAt ? new Date(a.data.publishedAt).getTime() : 0;
            const dateB = b.data.publishedAt ? new Date(b.data.publishedAt).getTime() : 0;
            return dateB - dateA;
        }));
    }


    return (
        <div className="flex justify-end items-center gap-3 mb-4">
            <Popover>
                <PopoverTrigger className="cursor-pointer"><Info className="text-muted-foreground" /></PopoverTrigger>
                <PopoverContent className="text-sm bg-popover-background w-80 px-3 py-2 my-2 mx-4 rounded-sm z-10 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <p className="font-bold mb-2">Research information</p>
                    <p>
                        The filter allows you to search for projects by various criteria such as name, description, type, status, tags, and more. You can enter multiple terms separated by spaces to refine your search.
                    </p>
                </PopoverContent>
            </Popover>
            <Input
                type="text"
                placeholder="Filter by name, description, type, status, tags, etc..."
                className="max-w-100 w-full"
                onChange={handleFilterChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                inputMode="search"
                aria-label="Project filter"
                role="searchbox"
                data-testid="project-filter"
            />
        </div>
    )
}