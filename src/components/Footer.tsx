interface FooterProps {
	name: string;
	email: string;
	customFields: Array<{
		id: string;
		icon: string;
		text: string;
	}>;
}

const Footer = ({ name, email, customFields }: FooterProps) => {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	const getIconName = (icon: string) => {
		if (icon.includes("linkedin")) return "LinkedIn";
		if (icon.includes("whatsapp")) return "WhatsApp";
		if (icon.includes("github")) return "GitHub";
		return icon;
	};

	return (
		<footer
			id="contact"
			className="py-8 md:py-12 px-8 md:px-16 bg-background border-t border-border"
		>
			<div className="animate-fade-in-up">
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
								href={field.text}
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
