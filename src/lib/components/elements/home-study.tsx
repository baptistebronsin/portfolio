import { Calendar, ExternalLink, GraduationCap, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export type Study = {
    title: string;
	field: string;
	school: string;
	link: string;
	date: string;
	location: string;
	description: string;
	tags: string[];
}

type Props = {
    studies: Study[]
}

export function HomeStudy(props: Props) {
    return (
        <>
			<div className="flex flex-row items-center gap-4">
				<div className="p-3 bg-primary/10 rounded-md">
					<GraduationCap className="inline w-8 h-8 text-primary" />
				</div>
				<div className="flex flex-col justify-between">
					<h2 className="text-3xl font-bold">My studies</h2>
					<h3>My academic background</h3>
				</div>
			</div>
			
			<div className="flex flex-col gap-4">
				{
					props.studies.map((study) => (
						<Card className="flex flex-row justify-between items-center gap-4 py-2 sm:py-4 px-4 sm:px-6 border-l-3 border-l-primary/70">
							<div className="flex flex-col gap-4 w-full">
								<CardHeader className="p-0">
									<div className="flex flex-col gap-2">
										<div>
											<CardTitle className="text-xl">{study.title}</CardTitle>
											<CardDescription>
												<p>{study.field}</p>
											</CardDescription>
										</div>
										<a className="flex flex-row gap-2 items-center text-primary text-lg font-semibold" href={study.link} target="_blank">
											{study.school}
											<ExternalLink className="h-4 w-4 text-foreground" />
										</a>
										<CardDescription className="flex flex-row gap-2 items-center">
											<div className="flex flex-row items-center gap">
												<Calendar className="inline w-4 h-4 mr-1" />
												{study.date}
											</div>
											<div className="flex flex-row items-center gap">
												<MapPin className="inline w-4 h-4 mr-1" />
												{study.location}
											</div>
										</CardDescription>
									</div>
								</CardHeader>

								<CardContent className="flex flex-col gap-2 p-0">
									<p>{study.description}</p>
									<div>
										{
											study.tags.map((tag) => (
												<span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs mr-2 mb-2">{tag}</span>
											))
										}
									</div>
								</CardContent>
							</div>
						</Card>
					))
				}
			</div>
        </>
    )
}