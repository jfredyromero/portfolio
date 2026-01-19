import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
	theme: "dark" | "light";
	toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-300 group"
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			{theme === "dark" ? (
				<Sun className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" />
			) : (
				<Moon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" />
			)}
		</button>
	);
};

export default ThemeToggle;
