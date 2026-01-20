import { useState, type MouseEventHandler } from "react";
import { Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
	name: string;
	theme: "dark" | "light";
	toggleTheme: MouseEventHandler<HTMLButtonElement>;
}

const navItems = [
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
	{ id: "skills", label: "Skills" },
	{ id: "education", label: "Education" },
	{ id: "awards", label: "Awards" },
	{ id: "languages", label: "Languages" },
	{ id: "references", label: "References" },
	{ id: "contact", label: "Contact" },
];

const Navigation = ({ name, theme, toggleTheme }: NavigationProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
		setIsMenuOpen(false);
	};

	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
			<div className="flex items-center justify-between px-8 md:px-16 py-4">
				{/* Logo */}
				<div className="gradient-text font-display-bold text-xl tracking-widest animate-fade-in">
					{initials}
				</div>

				{/* Desktop/Tablet Navigation */}
				<div className="hidden md:flex items-center gap-8 animate-fade-in">
					{navItems.map((item) => (
						<button
							key={item.id}
							onClick={() => scrollToSection(item.id)}
							className="text-muted-foreground text-sm uppercase tracking-wider hover:text-foreground transition-colors duration-300 cursor-pointer"
						>
							{item.label}
						</button>
					))}
				</div>

				{/* Actions */}
				<div className="hidden md:flex items-center gap-4 animate-fade-in">
					<a
						href="https://github.com/jfredyromero/portfolio"
						target="_blank"
						rel="noopener noreferrer"
						className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-300 group"
						aria-label="View on GitHub"
					>
						<Github className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" />
					</a>
					<ThemeToggle theme={theme} toggleTheme={toggleTheme} />
				</div>

				{/* Mobile Actions */}
				<div className="flex md:hidden items-center gap-3">
					<a
						href="https://github.com/jfredyromero/portfolio"
						target="_blank"
						rel="noopener noreferrer"
						className="p-2 rounded-full bg-secondary/50"
						aria-label="View on GitHub"
					>
						<Github className="w-5 h-5 text-foreground" />
					</a>
					<ThemeToggle theme={theme} toggleTheme={toggleTheme} />

					{/* Mobile Hamburger */}
					<div
						className="flex flex-col gap-1.5 cursor-pointer group"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<span
							className={`w-8 h-0.5 bg-foreground transition-all duration-300 ${
								isMenuOpen
									? "rotate-45 translate-y-2"
									: "group-hover:w-6"
							}`}
						/>
						<span
							className={`w-8 h-0.5 bg-foreground transition-all duration-300 ${
								isMenuOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`w-8 h-0.5 bg-foreground transition-all duration-300 ${
								isMenuOpen
									? "-rotate-45 -translate-y-2"
									: "group-hover:w-6"
							}`}
						/>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden overflow-hidden bg-background/95 backdrop-blur-md transition-all duration-300 ${
					isMenuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="flex flex-col px-8 py-6 gap-4">
					{navItems.map((item) => (
						<button
							key={item.id}
							onClick={() => scrollToSection(item.id)}
							className="text-foreground text-lg uppercase tracking-wider py-2 text-left hover:text-accent transition-colors duration-300 cursor-pointer"
						>
							{item.label}
						</button>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
