import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
	id: string;
	visible: boolean;
	company: string;
	position: string;
	location: string;
	date: string;
	summary: string;
}

interface ExperienceProps {
	items: ExperienceItem[];
}

const Experience = ({ items }: ExperienceProps) => {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: titleRef.current,
						start: "top 80%",
					},
				}
			);

			const experienceItems =
				sectionRef.current?.querySelectorAll(".experience-item");
			experienceItems?.forEach((item, index) => {
				gsap.fromTo(
					item,
					{ opacity: 0, x: index % 2 === 0 ? -50 : 50 },
					{
						opacity: 1,
						x: 0,
						duration: 0.8,
						ease: "power3.out",
						scrollTrigger: {
							trigger: item,
							start: "top 85%",
						},
					}
				);
			});
		}, sectionRef);

		return () => ctx.revert();
	}, [items]);

	const visibleItems = items.filter((item) => item.visible);

	return (
		<section
			id="experience"
			ref={sectionRef}
			className="py-20 md:py-32 px-8 md:px-16 bg-background overflow-hidden"
		>
			<h2
				ref={titleRef}
				className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-16"
			>
				Work <span className="text-outline">Experience</span>
			</h2>

			<div className="relative">
				{/* Timeline line */}
				<div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

				<div className="space-y-12">
					{visibleItems.map((item, index) => (
						<div
							key={item.id}
							className={`experience-item relative pl-8 md:pl-0 ${
								index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
							}`}
						>
							{/* Timeline dot */}
							<div className="absolute left-0 md:left-1/2 top-2 w-3 h-3 rounded-full bg-accent md:-translate-x-1/2" />

							<div className="bg-card/50 p-6 rounded-lg border border-border hover:border-accent/50 transition-colors duration-300">
								<span className="text-accent text-sm font-mono">
									{item.date}
								</span>
								<h3 className="text-xl md:text-2xl font-display-bold text-foreground mt-2">
									{item.position}
								</h3>
								<p className="text-muted-foreground mt-1">
									{item.company}
								</p>
								<p className="text-muted-foreground text-sm">
									{item.location}
								</p>
								<div
									className="text-muted-foreground text-sm mt-4 prose prose-invert prose-sm max-w-none"
									dangerouslySetInnerHTML={{
										__html: item.summary,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;
