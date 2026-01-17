import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollingTextProps {
	text: string;
}

const ScrollingText = ({ text }: ScrollingTextProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Split text into words for better readability
			const words = textRef.current?.querySelectorAll(".word");

			if (words) {
				gsap.fromTo(
					words,
					{
						opacity: 0.15,
					},
					{
						opacity: 1,
						stagger: 0.05,
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 80%",
							end: "bottom 20%",
							scrub: 1,
						},
					}
				);
			}
		}, containerRef);

		return () => ctx.revert();
	}, [text]);

	// Remove HTML tags for display
	const cleanText = text
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	return (
		<section
			ref={containerRef}
			className="py-20 md:py-32 px-8 md:px-16 bg-background"
		>
			<div
				ref={textRef}
				className="text-xl md:text-2xl lg:text-3xl font-display leading-relaxed text-muted-foreground max-w-5xl"
			>
				{cleanText.split(" ").map((word, index) => (
					<span key={index} className="word inline-block mr-2">
						{word}
					</span>
				))}
			</div>
		</section>
	);
};

export default ScrollingText;
