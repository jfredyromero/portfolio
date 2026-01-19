import { useResumeData } from "@/hooks/useResumeData";
import { useTheme } from "@/hooks/useTheme";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ScrollingText from "@/components/ScrollingText";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import Languages from "@/components/Languages";
import References from "@/components/References";
import Footer from "@/components/Footer";

const App = () => {
	const { data, loading, error } = useResumeData();
	const { theme, toggleTheme } = useTheme();

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	if (error || !data) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<p className="text-destructive text-xl">
						Failed to load data
					</p>
					<p className="text-muted-foreground mt-2">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<main className="bg-background">
			<Navigation
				name={data.data.basics.name}
				theme={theme}
				toggleTheme={toggleTheme}
			/>
			<Hero
				name={data.data.basics.name}
				headline={data.data.basics.headline}
				email={data.data.basics.email}
				location={data.data.basics.location}
				pictureUrl={data.data.basics.picture.url}
			/>
			{data.data.sections.summary.visible && (
				<ScrollingText text={data.data.sections.summary.content} />
			)}
			{data.data.sections.experience.visible &&
				data.data.sections.experience.items.length > 0 && (
					<Experience items={data.data.sections.experience.items} />
				)}
			{data.data.sections.projects.visible &&
				data.data.sections.projects.items.length > 0 && (
					<Projects items={data.data.sections.projects.items} />
				)}
			{data.data.sections.skills.visible &&
				data.data.sections.skills.items.length > 0 && (
					<Skills items={data.data.sections.skills.items} />
				)}
			{data.data.sections.education.visible &&
				data.data.sections.education.items.length > 0 && (
					<Education items={data.data.sections.education.items} />
				)}
			{data.data.sections.awards.visible &&
				data.data.sections.awards.items.length > 0 && (
					<Awards items={data.data.sections.awards.items} />
				)}
			{data.data.sections.languages.visible &&
				data.data.sections.languages.items.length > 0 && (
					<Languages items={data.data.sections.languages.items} />
				)}
			{data.data.sections.references.visible &&
				data.data.sections.references.items.length > 0 && (
					<References items={data.data.sections.references.items} />
				)}
			<Footer
				name={data.data.basics.name}
				email={data.data.basics.email}
				customFields={data.data.basics.customFields}
			/>
		</main>
	);
};

export default App;
