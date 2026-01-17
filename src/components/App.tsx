import { useResumeData } from "@/hooks/useResumeData";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ScrollingText from "@/components/ScrollingText";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Awards from "@/components/Awards";
import Languages from "@/components/Languages";
import References from "@/components/References";
import Footer from "@/components/Footer";
import Projects from "./Projects";

const Index = () => {
	const { data, loading, error } = useResumeData();

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
			<Navigation name={data.basics.name} />

			<Hero
				name={data.basics.name}
				headline={data.basics.headline}
				email={data.basics.email}
				location={data.basics.location}
				pictureUrl={data.basics.picture.url}
			/>

			{data.sections.summary.visible && (
				<ScrollingText text={data.sections.summary.content} />
			)}

			{data.sections.experience.visible &&
				data.sections.experience.items.length > 0 && (
					<Experience items={data.sections.experience.items} />
				)}

			{data.sections.projects.visible &&
				data.sections.projects.items.length > 0 && (
					<Projects items={data.sections.projects.items} />
				)}

			{data.sections.skills.visible &&
				data.sections.skills.items.length > 0 && (
					<Skills items={data.sections.skills.items} />
				)}

			{data.sections.education.visible &&
				data.sections.education.items.length > 0 && (
					<Education items={data.sections.education.items} />
				)}

			{data.sections.awards.visible &&
				data.sections.awards.items.length > 0 && (
					<Awards items={data.sections.awards.items} />
				)}

			{data.sections.languages.visible &&
				data.sections.languages.items.length > 0 && (
					<Languages items={data.sections.languages.items} />
				)}

			{data.sections.references.visible &&
				data.sections.references.items.length > 0 && (
					<References items={data.sections.references.items} />
				)}

			<Footer
				name={data.basics.name}
				email={data.basics.email}
				customFields={data.basics.customFields}
			/>
		</main>
	);
};

export default Index;
