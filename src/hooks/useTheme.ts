/// <reference types="view-transitions-api-types" />
import { useState, useEffect, type MouseEventHandler } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("theme") as Theme;
			return saved || "dark";
		}
		return "dark";
	});

	useEffect(() => {
		const root = document.documentElement;

		if (theme === "dark") {
			root.classList.add("dark");
			root.classList.remove("light");
		} else {
			root.classList.add("light");
			root.classList.remove("dark");
		}

		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme: MouseEventHandler<HTMLButtonElement> = async (event) => {
		const soundFile =
			theme === "dark"
				? "/portfolio/sounds/switch-on.mp3"
				: "/portfolio/sounds/switch-off.mp3";

		const audio = new Audio(soundFile);
		audio.play().catch((e) => console.error("Audio play failed", e));

		if (!document.startViewTransition) {
			setTheme((prev) => (prev === "dark" ? "light" : "dark"));
			return;
		}

		const transition = document.startViewTransition(async () => {
			setTheme((prev) => (prev === "dark" ? "light" : "dark"));
			await Promise.resolve();
		});

		await transition.ready;

		const x = event.clientX;
		const y = event.clientY;
		const radius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y)
		);

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${radius}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: 500,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			}
		);
	};

	return { theme, toggleTheme };
};
