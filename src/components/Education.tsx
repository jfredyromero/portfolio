import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
	id: string;
	visible: boolean;
	institution: string;
	studyType: string;
	area: string;
	score: string;
	date: string;
	summary: string;
	url: { label: string; href: string };
}

interface EducationProps {
	items: EducationItem[];
}

const Education = ({ items }: EducationProps) => {
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

			const eduItems = sectionRef.current?.querySelectorAll(
				".edu-item"
			) as gsap.TweenTarget;
			gsap.fromTo(
				eduItems,
				{ opacity: 0, x: -30 },
				{
					opacity: 1,
					x: 0,
					duration: 0.7,
					stagger: 0.15,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
					},
				}
			);
		}, sectionRef);

		return () => ctx.revert();
	}, [items]);

	const visibleItems = items.filter((item) => item.visible);

	return (
		<section
			id="education"
			ref={sectionRef}
			className="py-20 md:py-32 px-8 md:px-16 bg-background"
		>
			<h2
				ref={titleRef}
				className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-16"
			>
				<span className="text-outline">Education</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{visibleItems.map((edu) => (
					<div
						key={edu.id}
						className="edu-item group bg-card/50 p-6 rounded-lg border border-border hover:border-accent/50 transition-all duration-300"
					>
						<span className="text-accent text-sm font-mono">
							{edu.date}
						</span>
						<h3 className="text-xl font-display-bold text-foreground mt-2 group-hover:gradient-text transition-all duration-300">
							{edu.area}
						</h3>
						<p className="text-muted-foreground mt-2">
							{edu.institution}
						</p>
						{edu.url.href && (
							<a
								href={edu.url.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block mt-4 text-sm text-accent hover:underline"
							>
								{edu.url.label || "View Certificate"} →
							</a>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default Education;
