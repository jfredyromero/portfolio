import { useState, useEffect } from "react";
import type { ResumeData } from "@/types/resume";

// Get resume URL from environment variable or use default
const RESUME_PUBLIC_URL =
	import.meta.env.PUBLIC_RESUME_PUBLIC_URL ||
	"https://rxresu.me/jfredyrom/senior-front-end-engineer-cv";

// Get API key from environment variable
const API_KEY = import.meta.env.PUBLIC_RXRESUME_API_KEY || "";

// CORS proxy to bypass browser restrictions (for static hosting like GitHub Pages)
const CORS_PROXY = "https://corsproxy.io/?";

// Extract API endpoint from public URL
const getApiUrl = (publicUrl: string): string => {
	// Transform: https://rxresu.me/username/slug -> https://rxresu.me/api/openapi/resume/username/slug
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
				const proxiedUrl = `${CORS_PROXY}${apiUrl}`;

				const response = await fetch(proxiedUrl, {
					method: "GET",
					headers: {
						"x-api-key": API_KEY,
					},
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch resume data: ${response.status} ${response.statusText}`
					);
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
