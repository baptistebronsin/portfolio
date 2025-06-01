import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export type Job = {
    company: string,
    link: string,
    logo: string,
    title: string,
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
            <h2 className="text-3xl font-bold">My career</h2>
			
			<div className="flex flex-col gap-4">
				{
					props.jobs.map((job) => (
						<Card className="flex flex-row justify-between items-center gap-4 py-2 sm:py-4 px-4 sm:px-6">
							{/* <div class="flex flex-col gap-2 w-full"> */}
							<div className="flex flex-col gap-4 w-full">
								<CardHeader className="p-0">
									<div>
										<CardTitle className="text-xl">{job.title}</CardTitle>
										<CardDescription>
											<a className="text-primary text-lg font-semibold" href={job.link} target="_blank">{job.company}</a>
										</CardDescription>
									</div>
									<CardDescription className="flex flex-row gap-2 items-center">
										<div className="flex flex-row items-center gap">
											<Calendar className="inline w-4 h-4 mr-1" />
											{job.date}
										</div>
										<div className="flex flex-row items-center gap">
											<MapPin className="inline w-4 h-4 mr-1" />
											{job.location}
										</div>
									</CardDescription>
								</CardHeader>

								<CardContent className="flex flex-col gap-2 p-0">
									<p>{job.description}</p>
									<div>
										{
											job.tags.map((tag) => (
												<span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs mr-2 mb-2">{tag}</span>
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