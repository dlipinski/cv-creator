import { ChangeEvent, useCallback } from "react";
import { Pane } from "evergreen-ui";
import lng from "../../../../../assets/languages.en.json";
import FormCard from "./FormCard";
import { Contact, CVDocument } from "../../../editorSlice";
import Input from "../../../../../ui/Input";
import produce from "immer";
import useMediaQuery from "react-responsive";

interface ContactFormProps {
  contact: Contact;
  setActiveDocument: Function;
}

const ContactForm = ({ contact, setActiveDocument }: ContactFormProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const onPhoneChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.contact.phone = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onEmailChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.contact.email = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onAddressChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.contact.address = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard title={lng.contactData}>
      <Pane display="grid" gap={8}>
        <Pane
          display="grid"
          gridTemplateColumns={isDesktopOrLaptop ? "1fr 1fr" : "1fr"}
          gap={8}
        >
          <Input
            label={lng.telephone}
            value={contact.phone}
            onChange={onPhoneChanged}
            placeholder="+12 345 567 789"
          />
          <Input
            label={lng.email}
            value={contact.email}
            onChange={onEmailChanged}
            placeholder="your.email@here.com"
          />
        </Pane>
        <Pane display="grid">
          <Input
            label={lng.location}
            value={contact.address}
            onChange={onAddressChanged}
            placeholder="Kentacky Road, US"
          />
        </Pane>
      </Pane>
    </FormCard>
  );
};

export default ContactForm;
