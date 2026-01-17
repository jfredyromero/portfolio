import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsItem {
	id: string;
	visible: boolean;
	name: string;
	description: string;
	summary: string;
	url: { label: string; href: string };
}

interface ProjectsProps {
	items: ProjectsItem[];
}

const Projects = ({ items }: ProjectsProps) => {
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

			const projectItems =
				sectionRef.current?.querySelectorAll(".project-item");

			if (projectItems) {
				gsap.fromTo(
					projectItems,
					{ opacity: 0, y: 40 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						stagger: 0.2, // Esto hace que aparezcan uno tras otro
						ease: "power2.out",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 70%",
						},
					}
				);
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="py-24 px-6 md:px-12 bg-background text-foreground"
		>
			<div className="max-w-6xl mx-auto">
				<h2
					ref={titleRef}
					className="text-4xl md:text-6xl font-display-bold mb-16 tracking-tighter"
				>
					Projects
				</h2>

				<div className="grid grid-cols-1">
					{items.map((item) => (
						<a
							key={item.id}
							href={item.url.href}
							target="_blank"
							className="project-item group relative border-t border-zinc-800 py-10 px-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-zinc-900/50 transition-all duration-500 cursor-pointer"
						>
							<div className="flex flex-col z-10">
								<span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-medium">
									{item.description}
								</span>
								<h3 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-200 group-hover:translate-x-3 transition-transform duration-500 ease-out">
									{item.name}
								</h3>
							</div>

							<div className="flex items-center justify-between md:justify-end mt-6 md:mt-0 gap-8">
								<div className="max-w-md text-center md:text-right">
									<p
										className="font-mono text-xs md:text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors duration-500"
										dangerouslySetInnerHTML={{
											__html: item.summary,
										}}
									/>
								</div>

								<div className="text-zinc-400 md:group-hover:text-white md:group-hover:rotate-45 transition-all duration-500 ease-in-out md:opacity-0 md:group-hover:opacity-100">
									<svg
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M7 7h10v10" />
										<path d="M7 17L17 7" />
									</svg>
								</div>
							</div>

							<div className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-700 group-hover:w-full" />
						</a>
					))}
					<div className="border-t border-border"></div>
				</div>
			</div>
		</section>
	);
};

export default Projects;
