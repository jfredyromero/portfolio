import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AwardItem {
	id: string;
	visible: boolean;
	title: string;
	awarder: string;
	date: string;
	summary: string;
	url: { label: string; href: string };
}

interface AwardsProps {
	items: AwardItem[];
}

const Awards = ({ items }: AwardsProps) => {
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

			const awardItems = sectionRef.current?.querySelectorAll(
				".award-item"
			) as gsap.TweenTarget;
			gsap.fromTo(
				awardItems,
				{ opacity: 0, scale: 0.8, rotation: -5 },
				{
					opacity: 1,
					scale: 1,
					rotation: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: "back.out(1.7)",
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
			id="awards"
			ref={sectionRef}
			className="py-20 md:py-32 px-8 md:px-16 bg-secondary/20"
		>
			<h2
				ref={titleRef}
				className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-16"
			>
				Awards & <span className="text-outline">Recognition</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{visibleItems.map((award) => (
					<div
						key={award.id}
						className="award-item group relative bg-card p-8 rounded-lg border border-border hover:border-accent transition-all duration-300 overflow-hidden"
					>
						{/* Background glow effect */}
						<div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

						<div className="relative z-10">
							<div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<Trophy className="w-6 h-6 text-accent" />
							</div>

							<span className="text-muted-foreground text-sm font-mono">
								{award.date}
							</span>
							<h3 className="text-xl font-display-bold text-foreground mt-2 group-hover:gradient-text transition-all duration-300">
								{award.title}
							</h3>
							<p className="text-muted-foreground mt-2">
								{award.awarder}
							</p>

							{award.url.href && (
								<a
									href={award.url.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block mt-4 text-sm text-accent hover:underline"
								>
									{award.url.label || "View Certificate"} →
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Awards;
