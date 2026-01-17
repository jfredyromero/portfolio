export interface ResumeData {
	basics: {
		name: string;
		headline: string;
		email: string;
		phone: string;
		location: string;
		url: { label: string; href: string };
		customFields: Array<{
			id: string;
			icon: string;
			name: string;
			value: string;
		}>;
		picture: {
			url: string;
			size: number;
			aspectRatio: number;
			borderRadius: number;
			effects: {
				hidden: boolean;
				border: boolean;
				grayscale: boolean;
			};
		};
	};
	sections: {
		summary: {
			name: string;
			visible: boolean;
			content: string;
		};
		awards: {
			name: string;
			visible: boolean;
			items: Array<{
				id: string;
				visible: boolean;
				title: string;
				awarder: string;
				date: string;
				summary: string;
				url: { label: string; href: string };
			}>;
		};
		education: {
			name: string;
			visible: boolean;
			items: Array<{
				id: string;
				visible: boolean;
				institution: string;
				studyType: string;
				area: string;
				score: string;
				date: string;
				summary: string;
				url: { label: string; href: string };
			}>;
		};
		experience: {
			name: string;
			visible: boolean;
			items: Array<{
				id: string;
				visible: boolean;
				company: string;
				position: string;
				location: string;
				date: string;
				summary: string;
				url: { label: string; href: string };
			}>;
		};
		languages: {
			name: string;
			visible: boolean;
			items: Array<{
				id: string;
				visible: boolean;
				name: string;
				description: string;
				level: number;
			}>;
		};
		projects: {
			name: string;
			visible: true;
			items: Array<{
				id: string;
				visible: boolean;
				name: string;
				description: string;
				summary: string;
				url: { label: string; href: string };
			}>;
		};
		references: {
			name: string;
			visible: boolean;
			items: Array<{
				id: string;
				visible: boolean;
				name: string;
				description: string;
				summary: string;
				url: { label: string; href: string };
			}>;
		};
		skills: {
			name: string;
			visible: boolean;
			items: Array<{
				id: string;
				visible: boolean;
				name: string;
				description: string;
				level: number;
				keywords: string[];
			}>;
		};
	};
}
