export const AbstractShapes = () => {
	return (
		<div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-full pointer-events-none animate-circle-float">
			{/* 1. Orange/Peach  */}
			<div
				className="absolute top-[10%] right-[20%] w-36 h-44 md:w-52 md:h-60 animate-float-rotate-1 opacity-70 blur-2xl"
				style={{
					background:
						"linear-gradient(145deg, var(--color-shape-orange) 0%, #f97316 100%)",
					borderRadius: "45% 55% 60% 40% / 45% 50% 55% 50%",
				}}
			/>

			{/* 2. Purple/Magenta */}
			<div
				className="absolute top-[30%] right-[45%] w-44 h-52 md:w-64 md:h-72 animate-float-rotate-2 opacity-60 blur-[45px]"
				style={{
					background:
						"linear-gradient(135deg, var(--color-shape-purple) 0%, #a855f7 100%)",
					borderRadius: "55% 45% 35% 65% / 55% 35% 65% 45%",
				}}
			/>

			{/* 3. Cyan/Blue  */}
			<div
				className="absolute top-[50%] right-[10%] w-40 h-40 md:w-56 md:h-56 animate-float-rotate-4 opacity-50 blur-[55px]"
				style={{
					background:
						"linear-gradient(120deg, #06b6d4 0%, #3b82f6 100%)",
					borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
				}}
			/>

			{/* 4. Red/Pink  */}
			<div
				className="absolute bottom-[15%] right-[30%] w-48 h-44 md:w-72 md:h-64 animate-float-rotate-3 opacity-60 blur-[50px]"
				style={{
					background:
						"linear-gradient(160deg, var(--color-shape-red) 0%, var(--color-shape-pink) 100%)",
					borderRadius: "35% 65% 60% 40% / 35% 40% 60% 65%",
				}}
			/>

			{/* 5. Lime/Green */}
			<div
				className="absolute bottom-[5%] right-[55%] w-32 h-32 md:w-48 md:h-48 animate-float-rotate-5 opacity-40 blur-[60px]"
				style={{
					background:
						"linear-gradient(135deg, #84cc16 0%, #22c55e 100%)",
					borderRadius: "50% 50% 30% 70% / 60% 40% 60% 40%",
				}}
			/>
		</div>
	);
};
