import { BriefcaseBusiness, Calendar, ExternalLink, MapPin } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export type Job = {
    company: string,
    link: string,
    logo: string,
    title: string,
	type: string,
    description: string,
    date: string,
    location: string,
    tags: string[]
}

type Props = {
    jobs: Job[]
}

export function HomeCareer(props: Props) {
    return (
        <>
			<div className="flex flex-row items-center gap-4">
				<div className="p-3 bg-primary/10 rounded-md">
					<BriefcaseBusiness className="inline w-8 h-8 text-primary" />
				</div>
				<div className="flex flex-col justify-between">
					<h2 className="text-2xl font-bold">My career</h2>
					<h3>My academic background</h3>
				</div>
			</div>
			
			<div className="flex flex-col gap-4">
				{
					props.jobs.map((job) => (
						<Card className="flex flex-row justify-between items-center gap-4 py-2 sm:py-4 px-4 sm:px-6 border-l-3 border-l-primary/70" key={job.title}>
							{/* <div class="flex flex-col gap-2 w-full"> */}
							<div className="flex flex-col gap-4 w-full">
								<CardHeader className="p-0">
									<div className="flex flex-col gap-2">
										<CardTitle className="text-xl">{job.title}</CardTitle>
										<CardDescription>
											<a className="flex flex-row gap-2 items-center text-primary text-lg font-semibold" href={job.link} target="_blank">
												{job.company}
												<ExternalLink className="h-4 w-4 text-foreground" />
											</a>
										</CardDescription>
										<div className="flex flex-col gap-1">
											<CardDescription className="flex flex-row gap-2 items-center">
												<div className="flex flex-row items-center gap-1">
													<Calendar className="inline w-4 h-4" />
													{job.date}
												</div>
												<div className="flex flex-row items-center gap-1">
													<MapPin className="inline w-4 h-4" />
													{job.location}
												</div>
											</CardDescription>
											<div className="flex flex-row items-center gap-2">
												<BriefcaseBusiness className="inline w-4 h-4 text-primary" />
												<Badge variant="outline" className="text-xs text-primary border-primary/40">
													{job.type}
												</Badge>
											</div>
										</div>
									</div>
								</CardHeader>

								<CardContent className="flex flex-col gap-2 p-0">
									<p>{job.description}</p>
									<div>
										{
											job.tags.map((tag) => (
												<span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs mr-2 mb-2" key={tag}>{tag}</span>
											))
										}
									</div>
								</CardContent>
							</div>
							<img src={job.logo} alt={job.company} className="hidden sm:block w-16 rounded-md" />
						</Card>
					))
				}
			</div>
        </>
    )
}