import { useState, useEffect } from "react";
import type { ResumeData } from "@/types/resume";

// Get resume URL from environment variable or use default
const RESUME_PUBLIC_URL =
	import.meta.env.VITE_RESUME_URL ||
	"https://rxresu.me/jfredyrom/senior-front-end-engineer-cv";
// Extract API endpoint from public URL
const getApiUrl = (publicUrl: string): string => {
	// Transform: https://rxresu.me/username/slug -> https://rxresu.me/api/resume/public/username/slug
	const match = publicUrl.match(/rxresu\.me\/([^\/]+)\/([^\/]+)/);
	if (match) {
		const [, username, slug] = match;
		return `https://rxresu.me/api/resume/public/${username}/${slug}`;
	}
	return publicUrl;
};

export const useResumeData = () => {
	const [data, setData] = useState<ResumeData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = getApiUrl(RESUME_PUBLIC_URL);
				const response = await fetch(apiUrl);
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
