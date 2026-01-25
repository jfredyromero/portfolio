import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, User } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ReferenceItem {
	id: string;
	hidden: boolean;
	name: string;
	position: string;
	phone: string;
	website: { url: string; label: string };
	description: string;
}

interface ReferencesProps {
	items: ReferenceItem[];
}

const References = ({ items }: ReferencesProps) => {
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

			const refItems = sectionRef.current?.querySelectorAll(
				".ref-item"
			) as gsap.TweenTarget;
			gsap.fromTo(
				refItems,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					stagger: 0.12,
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

	const visibleItems = items.filter((item) => !item.hidden);

	return (
		<section
			id="references"
			ref={sectionRef}
			className="py-20 md:py-32 px-8 md:px-16 bg-secondary/20"
		>
			<h2
				ref={titleRef}
				className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-16"
			>
				Professional <span className="text-outline">References</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{visibleItems.map((ref) => (
					<div
						key={ref.id}
						className="ref-item group relative bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-300"
					>
						<User className="w-8 h-8 text-accent/30 absolute top-4 right-4 group-hover:text-accent/50 transition-colors duration-300" />

						<h3 className="text-xl font-display-bold text-foreground group-hover:gradient-text transition-all duration-300">
							{ref.name}
						</h3>

						{ref.position && (
							<p className="text-muted-foreground mt-2 text-sm font-medium">
								{ref.position}
							</p>
						)}

						{ref.phone && (
							<a
								href={`tel:${ref.phone}`}
								className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mt-3 text-sm transition-colors duration-200"
							>
								<Phone className="w-4 h-4" />
								{ref.phone}
							</a>
						)}

						{ref.description && (
							<p
								className="text-muted-foreground mt-4 text-sm"
								dangerouslySetInnerHTML={{
									__html: ref.description,
								}}
							/>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default References;
