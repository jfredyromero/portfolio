import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
	id: string;
	visible: boolean;
	name: string;
	description: string;
	level: number;
	keywords: string[];
}

interface SkillsProps {
	items: SkillItem[];
}

const Skills = ({ items }: SkillsProps) => {
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

			const skillCards = sectionRef.current?.querySelectorAll(
				".skill-card"
			) as gsap.TweenTarget;
			gsap.fromTo(
				skillCards,
				{ opacity: 0, y: 40, scale: 0.9 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.6,
					stagger: 0.1,
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
			id="skills"
			ref={sectionRef}
			className="py-20 md:py-32 px-8 md:px-16 bg-secondary/20"
		>
			<h2
				ref={titleRef}
				className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-16"
			>
				Technical <span className="text-outline">Skills</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{visibleItems.map((skill) => (
					<div
						key={skill.id}
						className="skill-card group bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:scale-[1.02]"
					>
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-xl font-display-bold text-foreground group-hover:gradient-text transition-all duration-300">
								{skill.name}
							</h3>
							<div className="flex gap-1">
								{[1, 2, 3, 4, 5].map((level) => (
									<div
										key={level}
										className={`w-2 h-2 rounded-full ${
											level <= skill.level
												? "bg-accent"
												: "bg-border"
										}`}
									/>
								))}
							</div>
						</div>
						<div className="flex flex-wrap gap-2">
							{skill.keywords.map((keyword, index) => (
								<span
									key={index}
									className="px-3 py-1 text-xs bg-background rounded-full text-muted-foreground border border-border"
								>
									{keyword}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Skills;
