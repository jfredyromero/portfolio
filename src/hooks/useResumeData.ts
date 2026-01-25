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

// Fallback URL for static JSON data
const FALLBACK_URL =
	import.meta.env.PUBLIC_FALLBACK_URL ||
	"https://raw.githubusercontent.com/jfredyromero/cv-metadata/refs/heads/main/cv-metadata.json";

// Extract API endpoint from public URL
const getApiUrl = (publicUrl: string): string => {
	// Transform: https://rxresu.me/username/slug -> https://rxresu.me/api/openapi/resume/username/slug
	const match = publicUrl.match(/rxresu\.me\/([^\/]+)\/([^\/]+)/);
	if (match) {
		const [, username, slug] = match;
		return `https://rxresu.me/api/openapi/resume/${username}/${slug}`;
	}
	return publicUrl;
};

// Fetch from rxresu.me API
const fetchFromApi = async (): Promise<ResumeData> => {
	const apiUrl = getApiUrl(RESUME_PUBLIC_URL);

	// Build URL with API key as query param for CORS proxy
	const urlWithKey = `${apiUrl}?apikey=${encodeURIComponent(API_KEY)}`;
	const proxiedUrl = `${CORS_PROXY}${encodeURIComponent(urlWithKey)}`;

	// Try direct fetch first (works if CORS is enabled or same-origin)
	let response: Response;
	try {
		response = await fetch(apiUrl, {
			method: "GET",
			headers: {
				"x-api-key": API_KEY,
			},
		});
	} catch {
		// If direct fetch fails (CORS), use proxy
		console.log("Direct fetch failed, using CORS proxy...");
		response = await fetch(proxiedUrl);
	}

	if (!response.ok) {
		throw new Error(
			`Failed to fetch resume data: ${response.status} ${response.statusText}`
		);
	}

	return response.json();
};

// Fetch from fallback GitHub URL
const fetchFromFallback = async (): Promise<ResumeData> => {
	console.log("Using fallback URL...");
	const response = await fetch(FALLBACK_URL);

	if (!response.ok) {
		throw new Error(
			`Fallback also failed: ${response.status} ${response.statusText}`
		);
	}

	return response.json();
};

export const useResumeData = () => {
	const [data, setData] = useState<ResumeData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Try API first, fallback to static JSON if it fails
				const json = await fetchFromApi().catch(async (apiError) => {
					console.warn("API fetch failed:", apiError.message);
					return fetchFromFallback();
				});

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
