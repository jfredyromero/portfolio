import { AbstractShapes } from "./AbstractShapes";

interface HeroProps {
	name: string;
	headline: string;
	email: string;
	location: string;
	pictureUrl: string;
	pictureHidden?: boolean;
}

const Hero = ({
	name,
	headline,
	email,
	location,
	pictureUrl,
	pictureHidden,
}: HeroProps) => {
	// Split headline into lines for animation
	const headlineParts = headline.split(" | ");

	return (
		<section
			id="hero"
			className="relative min-h-screen bg-background overflow-hidden flex flex-col pt-20"
		>
			{/* Hero Content */}
			<div className="flex-1 flex items-center px-8 md:px-16 pb-20">
				<div className="relative z-10 max-w-5xl w-full">
					<div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
						{/* Profile Image */}
						{!pictureHidden && pictureUrl && (
							<img
								src={pictureUrl}
								alt={name}
								className="w-32 md:w-40 rounded-2xl object-cover animate-scale-in"
							/>
						)}

						<div>
							{/* Name with gradient */}
							<h1 className="text-foreground font-display-bold text-2xl md:text-4xl tracking-[0.3em] uppercase mb-2 animate-fade-in-up animation-delay-100">
								{name}
							</h1>

							{/* Location */}
							<p className="text-muted-foreground text-sm tracking-wider animate-fade-in-up animation-delay-200">
								📍 {location}
							</p>
						</div>
					</div>

					{/* Title */}
					<div className="space-y-0">
						{headlineParts.map((part, index) => (
							<div
								key={index}
								className="animate-fade-in-up"
								style={{
									animationDelay: `${300 + index * 100}ms`,
									animationFillMode: "both",
								}}
							>
								<span
									className={`block font-display text-4xl md:text-6xl lg:text-7xl ${
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
						href={`mailto:${email}`}
						className="gradient-border inline-block mt-12 px-8 py-3 rounded-full text-foreground text-sm tracking-wider uppercase hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-600"
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
