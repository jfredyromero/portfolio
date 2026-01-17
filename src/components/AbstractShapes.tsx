import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const AbstractShapes = () => {
	const shapesRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const shapes = shapesRef.current?.querySelectorAll(
				".shape"
			) as gsap.TweenTarget;

			// Set initial state
			gsap.set(shapes, { opacity: 0, scale: 0.3 });

			// Animate shapes entrance
			gsap.to(shapes, {
				opacity: 1,
				scale: 1,
				duration: 1.2,
				stagger: 0.15,
				ease: "power3.out",
				delay: 0.3,
			});

			// Floating animation for shapes
			(shapes as NodeList).forEach((shape, index) => {
				gsap.to(shape, {
					y: `${(index % 2 === 0 ? -1 : 1) * 25}`,
					x: `${(index % 2 === 0 ? 1 : -1) * 15}`,
					rotation: index % 2 === 0 ? 8 : -8,
					duration: 5 + index * 0.5,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay: 1.5,
				});
			});
		}, shapesRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={shapesRef}
			className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-full pointer-events-none"
		>
			{/* Orange/Peach shape */}
			<div
				className="shape absolute top-[15%] right-[25%] w-36 h-44 md:w-52 md:h-60"
				style={{
					background:
						"linear-gradient(145deg, hsl(30, 100%, 65%) 0%, hsl(15, 95%, 55%) 100%)",
					borderRadius: "45% 55% 60% 40% / 45% 50% 55% 50%",
					filter: "blur(40px)",
				}}
			/>

			{/* Purple/Magenta shape */}
			<div
				className="shape absolute top-[25%] right-[40%] w-44 h-52 md:w-64 md:h-72"
				style={{
					background:
						"linear-gradient(135deg, hsl(280, 85%, 60%) 0%, hsl(300, 75%, 50%) 100%)",
					borderRadius: "55% 45% 35% 65% / 55% 35% 65% 45%",
					filter: "blur(45px)",
				}}
			/>

			{/* Red/Pink shape */}
			<div
				className="shape absolute bottom-[25%] right-[20%] w-48 h-44 md:w-72 md:h-64"
				style={{
					background:
						"linear-gradient(160deg, hsl(355, 90%, 55%) 0%, hsl(340, 85%, 50%) 100%)",
					borderRadius: "35% 65% 60% 40% / 35% 40% 60% 65%",
					filter: "blur(50px)",
				}}
			/>
		</div>
	);
};
