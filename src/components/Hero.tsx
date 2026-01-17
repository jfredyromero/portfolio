import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { AbstractShapes } from "./AbstractShapes";

interface HeroProps {
	name: string;
	headline: string;
	email: string;
	location: string;
	pictureUrl: string;
}

const Hero = ({ name, headline, email, location, pictureUrl }: HeroProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const nameRef = useRef<HTMLHeadingElement>(null);
	const line1Ref = useRef<HTMLDivElement>(null);
	const line2Ref = useRef<HTMLDivElement>(null);
	const line3Ref = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLAnchorElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const locationRef = useRef<HTMLParagraphElement>(null);

	// Split headline into lines for animation
	const headlineParts = headline.split(" | ");

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const titleLines = [
				line1Ref.current,
				line2Ref.current,
				line3Ref.current,
			].filter(Boolean);

			// Set initial states
			gsap.set(nameRef.current, { opacity: 0, y: 20 });
			gsap.set(titleLines, { opacity: 0, y: 60 });
			gsap.set(buttonRef.current, { opacity: 0, y: 20 });
			gsap.set(imageRef.current, { opacity: 0, scale: 0.8 });
			gsap.set(locationRef.current, { opacity: 0, y: 10 });

			// Create timeline for entrance animations
			const tl = gsap.timeline({ delay: 0.5 });

			// Animate image
			tl.to(imageRef.current, {
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: "power3.out",
			});

			// Animate name with gradient
			tl.to(
				nameRef.current,
				{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
				"-=0.6"
			);

			// Animate title lines with stagger
			tl.to(
				titleLines,
				{
					opacity: 1,
					y: 0,
					duration: 1,
					stagger: 0.08,
					ease: "power3.out",
				},
				"-=0.4"
			);

			// Animate location
			tl.to(
				locationRef.current,
				{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
				"-=0.4"
			);

			// Animate button
			tl.to(
				buttonRef.current,
				{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
				"-=0.3"
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="hero"
			ref={containerRef}
			className="relative min-h-screen bg-background overflow-hidden flex flex-col pt-20"
		>
			{/* Hero Content */}
			<div className="flex-1 flex items-center px-8 md:px-16 pb-20">
				<div className="relative z-10 max-w-5xl w-full">
					<div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
						{/* Profile Image */}
						<img
							ref={imageRef}
							src={pictureUrl}
							alt={name}
							className="w-32 md:w-40 rounded-2xl object-cover"
						/>

						<div>
							{/* Name with gradient */}
							<h1
								ref={nameRef}
								className="text-foreground font-display-bold text-2xl md:text-4xl tracking-[0.3em] uppercase mb-2"
							>
								{name}
							</h1>

							{/* Location */}
							<p
								ref={locationRef}
								className="text-muted-foreground text-sm tracking-wider"
							>
								📍 {location}
							</p>
						</div>
					</div>

					{/* Title */}
					<div className="space-y-0">
						{headlineParts.map((part, index) => (
							<div
								key={index}
								ref={
									index === 0
										? line1Ref
										: index === 1
										? line2Ref
										: line3Ref
								}
							>
								<span
									className={`block font-display text-4xl md:text-6xl lg:text-7xl  ${
										index === 0
											? "text-foreground"
											: "text-outline"
									}`}
								>
									{part}
								</span>
							</div>
						))}
					</div>

					{/* CTA Button */}
					<a
						ref={buttonRef}
						href={`mailto:${email}`}
						className="gradient-border inline-block mt-12 px-8 py-3 rounded-full text-foreground text-sm tracking-wider uppercase hover:scale-105 transition-transform duration-300"
					>
						Let's Talk
					</a>
				</div>
			</div>

			{/* Abstract Shapes */}
			<AbstractShapes />
		</section>
	);
};

export default Hero;
