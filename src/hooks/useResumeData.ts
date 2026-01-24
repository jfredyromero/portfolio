import { useState, useEffect } from "react";
import type { ResumeData } from "@/types/resume";

const RESUME_URL =
	"https://raw.githubusercontent.com/jfredyromero/cv-metadata/refs/heads/main/cv-metadata.json";

export const useResumeData = () => {
	const [data, setData] = useState<ResumeData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(RESUME_URL);
				if (!response.ok) {
					throw new Error("Failed to fetch resume data");
				}
				const json = await response.json();
				setData(json);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, loading, error };
};
