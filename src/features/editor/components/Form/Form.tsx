import { Pane } from "evergreen-ui";

import SkillsForm from "./forms/SkillsForm";
import Languages from "./forms/LanguagesForm";
import Interests from "./forms/InterestsForm";
import ContactForm from "./forms/ContactForm";
import PersonalForm from "./forms/PersonalForm";
import DocumentForm from "./forms/DocumentForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import ProjectsForm from "./forms/ProjectsForm";
import { CVDocument } from "../../editorSlice";

interface FormProps {
  setActiveDocument: Function;
  document: CVDocument;
  handlePrint: (() => void) | undefined;
  documentIndex: number;
  setActive: Function;
}

const Form = ({
  document,
  handlePrint,
  setActiveDocument,
  documentIndex,
  setActive,
}: FormProps) => {
  return (
    <Pane display="grid" marginBottom={64}>
      <DocumentForm
        setActive={setActive}
        documentIndex={documentIndex}
        meta={document.meta}
        handlePrint={handlePrint}
        setActiveDocument={setActiveDocument}
      />
      <PersonalForm
        personal={document.personal}
        setActiveDocument={setActiveDocument}
      />
      <ContactForm
        contact={document.contact}
        setActiveDocument={setActiveDocument}
      />
      <SummaryForm
        summary={document.summary}
        setActiveDocument={setActiveDocument}
      />
      <SkillsForm
        skills={document.skills}
        setActiveDocument={setActiveDocument}
      />
      <Languages
        languages={document.languages}
        setActiveDocument={setActiveDocument}
      />
      <ExperienceForm
        experience={document.experience}
        setActiveDocument={setActiveDocument}
      />
      <EducationForm
        education={document.education}
        setActiveDocument={setActiveDocument}
      />
      <ProjectsForm
        projects={document.projects}
        setActiveDocument={setActiveDocument}
      />
      <Interests
        interests={document.interests}
        setActiveDocument={setActiveDocument}
      />
    </Pane>
  );
};

export default Form;
