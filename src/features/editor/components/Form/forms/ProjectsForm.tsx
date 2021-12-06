import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  IconButton,
  Pane,
  PlusIcon,
  RemoveIcon,
} from "evergreen-ui";
import FormCard from "./FormCard";
import { CVDocument, Project } from "../../../editorSlice";
import lng from "../../../../../assets/languages.en.json";
import Input from "../../../../../ui/Input";
import { ChangeEvent, MouseEvent, useCallback } from "react";
import DangerousButton from "../../../../../ui/DangerousButton";
import produce from "immer";
import { useMediaQuery } from "react-responsive";

interface ProjectsFormProps {
  projects: Project[];
  setActiveDocument: Function;
}

const ProjectsForm = ({ projects, setActiveDocument }: ProjectsFormProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const onNewProjectClicked = useCallback(
    (e: MouseEvent<HTMLButtonElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.projects.push({
            name: "",
            details: "",
            link: "",
          });
        })
      ),
    [setActiveDocument]
  );

  const onRemoveClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.projects = draft.projects.filter((_, i) => i !== index);
          if (draft.projects.length === 0) {
            draft.projects.push({
              link: "",
              name: "",
              details: "",
            });
          }
        })
      ),
    [setActiveDocument]
  );

  const onMoveUpClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftProject = draft.projects[index];
          draft.projects[index] = draft.projects[index - 1];
          draft.projects[index - 1] = draftProject;
        })
      ),
    [setActiveDocument]
  );

  const onMoveDownClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftProject = draft.projects[index];
          draft.projects[index] = draft.projects[index + 1];
          draft.projects[index + 1] = draftProject;
        })
      ),
    [setActiveDocument]
  );

  const onNameChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.projects[index].name = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onDetailsChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.projects[index].details = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onLinkChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.projects[index].link = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard
      title={lng.projects}
      headerButtons={[
        <Button
          appearance="minimal"
          iconBefore={PlusIcon}
          onClick={onNewProjectClicked}
        >
          New Project
        </Button>,
      ]}
    >
      <Pane display="grid" gap={16}>
        {projects.map((proj, i) => (
          <FormCard
            title={`Project ${i + 1}`}
            level={1}
            headerButtons={[
              <IconButton
                appearance="minimal"
                icon={ChevronUpIcon}
                disabled={i === 0}
                intent={i === 0 ? "danger" : "default"}
                onClick={() => onMoveUpClicked(i)}
              />,
              <IconButton
                appearance="minimal"
                icon={ChevronDownIcon}
                disabled={i === projects.length - 1}
                intent={i === projects.length - 1 ? "danger" : "default"}
                onClick={() => onMoveDownClicked(i)}
              />,
              <DangerousButton
                appearance="minimal"
                icon={RemoveIcon}
                type="justIcon"
                disabled={
                  projects.length === 1 &&
                  projects[0].link === "" &&
                  projects[0].name === "" &&
                  projects[0].details === ""
                }
                onClick={() => onRemoveClicked(i)}
              />,
            ]}
          >
            <Pane
              display="grid"
              gap={8}
              paddingBottom={16}
              gridTemplateColumns={isDesktopOrLaptop ? "1fr 1fr" : "1fr"}
            >
              <Input
                label="Name"
                placeholder="Super Project"
                value={proj.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onNameChanged(e, i)
                }
              />

              <Input
                label="Link"
                placeholder="mysuperproject.com"
                value={proj.link}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onLinkChanged(e, i)
                }
              />
            </Pane>
            <Input
              label="Description"
              placeholder="My totally super project"
              value={proj.details}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onDetailsChanged(e, i)
              }
            />
          </FormCard>
        ))}
      </Pane>
    </FormCard>
  );
};

export default ProjectsForm;
