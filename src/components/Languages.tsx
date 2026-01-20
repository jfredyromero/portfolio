import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface LanguageItem {
	id: string;
	hidden: boolean;
	language: string;
	fluency: string;
	level: number;
}

interface LanguagesProps {
	items: LanguageItem[];
}

const Languages = ({ items }: LanguagesProps) => {
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

			const langItems = sectionRef.current?.querySelectorAll(
				".lang-item"
			) as gsap.TweenTarget;
			gsap.fromTo(
				langItems,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
					},
				}
			);

			// Animate progress bars
			const progressBars =
				sectionRef.current?.querySelectorAll(".progress-fill");
			progressBars?.forEach((bar) => {
				gsap.fromTo(
					bar,
					{ scaleX: 0 },
					{
						scaleX: 1,
						duration: 1.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: bar,
							start: "top 85%",
						},
					}
				);
			});
		}, sectionRef);

		return () => ctx.revert();
	}, [items]);

	const visibleItems = items.filter((item) => !item.hidden);

	return (
		<section
			id="languages"
			ref={sectionRef}
			className="py-20 md:py-32 px-8 md:px-16 bg-background"
		>
			<h2
				ref={titleRef}
				className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-16"
			>
				<span className="text-outline">Languages</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
				{visibleItems.map((lang) => (
					<div key={lang.id} className="lang-item group">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
								<Globe className="w-5 h-5 text-accent" />
							</div>
							<div>
								<h3 className="text-lg font-display-bold text-foreground">
									{lang.language}
								</h3>
								<span className="text-sm text-muted-foreground">
									{lang.fluency}
								</span>
							</div>
						</div>

						{/* Progress bar */}
						<div className="h-2 bg-border rounded-full overflow-hidden">
							<div
								className="progress-fill h-full rounded-full origin-left"
								style={{
									width: `${(lang.level / 5) * 100}%`,
									background: "var(--gradient-button)",
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Languages;
