import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
	name: string;
	email: string;
	customFields: Array<{
		id: string;
		icon: string;
		name: string;
		value: string;
	}>;
}

const Footer = ({ name, email, customFields }: FooterProps) => {
	const footerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				contentRef.current,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: footerRef.current,
						start: "top 80%",
					},
				}
			);
		}, footerRef);

		return () => ctx.revert();
	}, []);

	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	const getIconName = (icon: string) => {
		if (icon.includes("linkedin")) return "LinkedIn";
		if (icon.includes("whatsapp")) return "WhatsApp";
		if (icon.includes("github")) return "GitHub";
		if (icon.includes("twitter")) return "Twitter";
		return icon;
	};

	return (
		<footer
			id="contact"
			ref={footerRef}
			className="py-8 md:py-12 px-8 md:px-16 bg-background border-t border-border"
		>
			<div ref={contentRef}>
				<h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-8">
					Let's work <span className="text-outline">together</span>
				</h2>

				<div className="flex flex-col md:flex-row justify-between gap-12 mt-16">
					<div>
						<p className="text-muted-foreground mb-4">
							Get in touch
						</p>
						<a
							href={`mailto:${email}`}
							className="text-foreground text-xl md:text-2xl hover:text-outline transition-all duration-300"
						>
							{email}
						</a>
					</div>

					<div className="flex gap-8">
						{customFields.map((field) => (
							<a
								key={field.id}
								href={field.value}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-foreground transition-colors duration-300"
							>
								{getIconName(field.icon)}
							</a>
						))}
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-20 pt-8 border-t border-border">
					<span className="text-muted-foreground text-sm">
						© {new Date().getFullYear()} All rights reserved
					</span>
					<span className="gradient-text text-sm font-display-bold tracking-widest">
						{initials}
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
