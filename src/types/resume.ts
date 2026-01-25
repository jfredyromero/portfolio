// Types based on rxresu.me OpenAPI response structure
export interface ResumeData {
	id: string;
	name: string;
	slug: string;
	tags: string[];
	data: {
		picture: {
			hidden: boolean;
			url: string;
			size: number;
			rotation: number;
			aspectRatio: number;
			borderRadius: number;
			borderColor: string;
			borderWidth: number;
			shadowColor: string;
			shadowWidth: number;
		};
		basics: {
			name: string;
			headline: string;
			email: string;
			phone: string;
			location: string;
			website: { url: string; label: string };
			customFields: Array<{
				id: string;
				icon: string;
				text: string;
			}>;
		};
		summary: {
			title: string;
			columns: number;
			hidden: boolean;
			content: string;
		};
		sections: {
			profiles: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					icon: string;
					network: string;
					username: string;
					website: { url: string; label: string };
				}>;
			};
			experience: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					company: string;
					position: string;
					location: string;
					period: string;
					website: { url: string; label: string };
					description: string;
				}>;
			};
			education: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					school: string;
					degree: string;
					area: string;
					grade: string;
					location: string;
					period: string;
					website: { url: string; label: string };
					description: string;
				}>;
			};
			projects: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					name: string;
					period: string;
					website: { url: string; label: string };
					description: string;
				}>;
			};
			skills: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					icon: string;
					name: string;
					proficiency: string;
					level: number;
					keywords: string[];
				}>;
			};
			languages: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					language: string;
					fluency: string;
					level: number;
				}>;
			};
			awards: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					title: string;
					awarder: string;
					date: string;
					website: { url: string; label: string };
					description: string;
				}>;
			};
			references: {
				title: string;
				columns: number;
				hidden: boolean;
				items: Array<{
					id: string;
					hidden: boolean;
					name: string;
					position: string;
					phone: string;
					website: { url: string; label: string };
					description: string;
				}>;
			};
		};
	};
	visibility: string;
}
