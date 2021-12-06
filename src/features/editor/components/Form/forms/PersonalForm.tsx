import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Pane } from "evergreen-ui";
import FormCard from "./FormCard";
import lng from "../../../../../assets/languages.en.json";
import { CVDocument, Personal } from "../../../editorSlice";
import firebase from "firebase";
import { storage } from "../../../../..";
import FilePicker from "../../../../../ui/FilePicker";
import Input from "../../../../../ui/Input";
import produce from "immer";
import { useMediaQuery } from "react-responsive";

interface PersonalFormProps {
  personal: Personal;
  setActiveDocument: Function;
}

const PersonalForm = ({ personal, setActiveDocument }: PersonalFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const onFirstNameChanged = useCallback(
    (e) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.personal.firstName = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onLastNameChanged = useCallback(
    (e) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.personal.lastName = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onPositionChanged = useCallback(
    (e) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.personal.position = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onPhotoChanged = useCallback(
    (photoUrl) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.personal.photo = photoUrl;
        })
      ),
    [setActiveDocument]
  );

  const onFilesChanged = (files: FileList) => {
    setIsUploading(true);
    const image = files[0];
    if (!image) return;
    const currentUser: any = firebase.auth().currentUser;
    const fileName = uuidv4() + "." + image.name.split(".").pop();

    const storageRef = storage.ref(`${currentUser.uid}/${fileName}`);
    const uploadTask = storageRef.put(image);

    uploadTask.on("state_changed", null, null, () => {
      storage
        .ref(`${currentUser.uid}`)
        .child(fileName)
        .getDownloadURL()
        .then(
          (url) => {
            onPhotoChanged(url);
            setIsUploading(false);
          },
          (error) => {
            console.log(error);
            setIsUploading(false);
          }
        );
    });
  };

  return (
    <FormCard title={lng.personalData}>
      <Pane
        display="grid"
        alignItems="center"
        gap={8}
        gridTemplateColumns={isDesktopOrLaptop ? "auto 1fr" : "1fr"}
      >
        <Pane
          display="grid"
          placeContent="center"
          border
          borderRadius={8}
          height={100}
          width={100}
          background="gray100"
          backgroundImage={`url(${personal.photo})`}
          backgroundSize="contain"
          marginX="auto"
        />
        <Pane display="grid" gap={8}>
          <Pane
            display="grid"
            gap={8}
            gridTemplateColumns={isDesktopOrLaptop ? "1fr 1fr" : "1fr"}
          >
            <Input
              label={lng.name}
              value={personal.firstName}
              onChange={onFirstNameChanged}
              placeholder="John"
            />
            <Input
              label={lng.surname}
              value={personal.lastName}
              onChange={onLastNameChanged}
              placeholder="Smith"
            />
          </Pane>
          <Pane
            display="grid"
            paddingBottom={8}
            gridTemplateColumns={isDesktopOrLaptop ? "1fr 1fr" : "1fr"}
            gap={8}
          >
            <FilePicker
              label="Photo"
              isLoading={isUploading}
              placeholder="photo.jpg"
              value={personal.photo}
              onChange={onFilesChanged}
            />

            <Input
              label={lng.position}
              value={personal.position}
              placeholder="React/Redux/Solidity Developer"
              onChange={onPositionChanged}
            />
          </Pane>
        </Pane>
      </Pane>
    </FormCard>
  );
};

export default PersonalForm;
