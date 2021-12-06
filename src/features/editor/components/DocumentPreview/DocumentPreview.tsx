import { Pane } from "evergreen-ui";
import { useCallback, useEffect, useRef } from "react";
import { CVDocument } from "../../editorSlice";
import previewTitles from "../../../../assets/previewTitles.json";

import ContactCard from "./cards/ContactCard";
import EducationCard from "./cards/EducationCard";
import ExperienceCard from "./cards/ExperienceCard";
import InterestsCard from "./cards/InterestsCard";
import LanguagesCard from "./cards/LanguagesCard";
import PersonalCard from "./cards/PersonalCard";
import ProjectsCard from "./cards/ProjectsCard";
import SkillsCard from "./cards/SkillsCard";
import SummaryCard from "./cards/SummaryCard";

interface DocumentPreviewProps {
  document: CVDocument;
}

const DocumentPreview = ({ document }: DocumentPreviewProps) => {
  const pageRef = useRef<HTMLDivElement>(null);

  const onWindowResized = useCallback(() => {
    if (pageRef.current === undefined || pageRef.current === null) return;
    const parentElement: HTMLElement | null = pageRef.current.parentElement;

    if (parentElement === null) return;
    const { height: parentHeight }: DOMRect =
      parentElement.getBoundingClientRect();
    const pageHeight = 1133;
    const pageWidth = 793;
    const padding = Number(
      window.getComputedStyle(parentElement).paddingTop.replace("px", "")
    );
    const scale = (parentHeight - padding * 2) / pageHeight;
    pageRef.current.style.width = pageWidth + "px";
    pageRef.current.style.height = pageHeight + "px";

    parentElement.style.width = `${scale * pageWidth + padding * 2}px`;
    pageRef.current.style.transform = `scale(${scale})`;
  }, [pageRef]);

  useEffect(() => {
    onWindowResized();
    window.addEventListener("resize", onWindowResized);
    return () => window.removeEventListener("resize", onWindowResized);
  }, [onWindowResized]);

  const language = document.meta.language;

  return (
    <Pane
      background="white"
      transformOrigin="top left"
      width="21cm"
      height="30cm"
      ref={pageRef}
      borderRadius={4}
      padding={32}
      paddingBottom={0}
      display="grid"
      gap={8}
      gridTemplateRows="auto 1fr"
    >
      <Pane display="grid" gridTemplateColumns="4fr 2fr" paddingBottom={8}>
        <PersonalCard personal={document.personal} />
        <ContactCard contact={document.contact} />
      </Pane>

      <Pane
        display="flex"
        flexDirection="column"
        gap={16}
        whiteSpace="break-spaces"
      >
        <SummaryCard
          summary={document.summary}
          title={previewTitles[language].summary}
        />

        <ExperienceCard
          experience={document.experience}
          title={previewTitles[language].experience}
        />
        <Pane display="grid" gridTemplateColumns="2fr 1fr" gap={32}>
          <EducationCard
            education={document.education}
            title={previewTitles[language].education}
          />
          <LanguagesCard
            languages={document.languages}
            title={previewTitles[language].languages}
          />
        </Pane>

        <ProjectsCard
          projects={document.projects}
          title={previewTitles[language].projects}
        />

        <Pane display="grid" gridTemplateColumns="2fr 1fr" gap={32}>
          <SkillsCard
            skills={document.skills}
            title={previewTitles[language].skills}
          />
          <InterestsCard
            interests={document.interests}
            title={previewTitles[language].interests}
          />
        </Pane>
      </Pane>
    </Pane>
  );
};

export default DocumentPreview;
