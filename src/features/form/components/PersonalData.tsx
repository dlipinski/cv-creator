import { ChangeEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Pane, Button, Label, TextInput, PlusIcon, Dialog } from "evergreen-ui";
import Card from "../../../components/ui/Card";
import lng from "../../../languages/languages.en.json";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectActiveDocument,
  setFirstName,
  setLastName,
  setPhoto,
  setPosition,
} from "../formSlice";
import firebase from "firebase";
import { storage } from "../../..";
import { isUserAuthenticatedSelector } from "../../auth/authSelectors";
import PhotoDialog from "./PhotoDialog";
import FilePicker from "../../../components/ui/FilePicker";

const PersonalData = () => {
  const {
    personal: { firstName, lastName, position, photo },
  } = useAppSelector(selectActiveDocument);
  const authenticated = useAppSelector(isUserAuthenticatedSelector);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(e.currentTarget.value));
  };

  const onLastName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(e.currentTarget.value));
  };

  const onPosition = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPosition(e.currentTarget.value));
  };

  const onFilesChanged = (files: FileList) => {
    setLoading(true);
    const image = files[0];
    if (!image) return;
    if (authenticated) {
      const currentUser: any = firebase.auth().currentUser;
      console.log(currentUser);
      const fileName = uuidv4() + "." + image.name.split(".").pop();

      const storageRef = storage.ref(`${currentUser.uid}/${fileName}`);
      const uploadTask = storageRef.put(image);

      uploadTask.on("state_changed", null, null, () => {
        setTimeout(() => {
          storage
            .ref(`${currentUser.uid}`)
            .child(fileName)
            .getDownloadURL()
            .then(
              (url) => {
                dispatch(setPhoto(url));
                console.log(url);
                setLoading(false);
              },
              (error) => {
                // failed to get download URL
                console.log(error);
                setLoading(false);
              }
            );
        }, 1000);
      });
    } else {
      const localImageUrl = window.URL.createObjectURL(image);
      dispatch(setPhoto(localImageUrl));
      setLoading(false);
    }
  };

  return (
    <Card title={lng.personalData}>
      <Pane
        display="grid"
        alignItems="center"
        gap={16}
        gridTemplateColumns="auto 1fr"
      >
        <Pane
          display="grid"
          placeContent="center"
          border
          borderRadius={8}
          height={100}
          width={100}
          background="white"
          backgroundImage={`url(${photo})`}
          backgroundSize="cover"
        />
        <Pane display="grid" gap={8}>
          <Pane display="grid" gap={16} gridTemplateColumns="1fr 1fr">
            <Pane display="grid">
              <Label size={300}>{lng.name}</Label>
              <TextInput
                placeholder="John"
                width="auto"
                value={firstName}
                onChange={onFirstName}
              />
            </Pane>
            <Pane display="grid">
              <Label size={300}>{lng.surname}</Label>
              <TextInput
                placeholder="Smith"
                width="auto"
                value={lastName}
                onChange={onLastName}
              />
            </Pane>
          </Pane>
          <Pane
            display="grid"
            paddingBottom={8}
            gridTemplateColumns="1fr 1fr"
            gap={16}
          >
            <Pane display="grid">
              <Label size={300}>Photo</Label>
              {/* <FilePicker
                ref={invisibleFileInput}
                accept="image/*"
                width="auto"
                display="flex"
                className={"file-picker"}
                onChange={onFilesChanged}
                placeholder="Select the file here!"
              /> */}
              <FilePicker
                isLoading={loading}
                value={photo}
                onChange={onFilesChanged}
              />
            </Pane>
            <Pane display="grid">
              <Label size={300}>{lng.position}</Label>
              <TextInput
                width="auto"
                placeholder="React/Vue Developer"
                value={position}
                onChange={onPosition}
              />
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default PersonalData;
