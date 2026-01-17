import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface NavigationProps {
	name: string;
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

const Navigation = ({ name }: NavigationProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const logoRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const desktopNavRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.set(
				[logoRef.current, menuRef.current, desktopNavRef.current],
				{ opacity: 0, y: -20 }
			);

			const tl = gsap.timeline({ delay: 0.1 });
			tl.to(logoRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power3.out",
			});
			tl.to(
				[desktopNavRef.current, menuRef.current],
				{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
				"-=0.4"
			);
		});

		return () => ctx.revert();
	}, []);

	useLayoutEffect(() => {
		if (mobileMenuRef.current) {
			if (isMenuOpen) {
				gsap.to(mobileMenuRef.current, {
					height: "auto",
					opacity: 1,
					duration: 0.4,
					ease: "power3.out",
				});
			} else {
				gsap.to(mobileMenuRef.current, {
					height: 0,
					opacity: 0,
					duration: 0.3,
					ease: "power3.in",
				});
			}
		}
	}, [isMenuOpen]);

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
				<div
					ref={logoRef}
					className="gradient-text font-display-bold text-xl tracking-widest"
				>
					{initials}
				</div>

				{/* Desktop/Tablet Navigation */}
				<div
					ref={desktopNavRef}
					className="hidden md:flex items-center gap-8"
				>
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

				{/* Mobile Hamburger */}
				<div
					ref={menuRef}
					className="md:hidden flex flex-col gap-1.5 cursor-pointer group"
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

			{/* Mobile Menu */}
			<div
				ref={mobileMenuRef}
				className="md:hidden overflow-hidden h-0 opacity-0 bg-background/95 backdrop-blur-md"
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
