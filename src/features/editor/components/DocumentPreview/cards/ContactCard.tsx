import { Contact } from "../../../editorSlice";
import { Pane, PhoneIcon, EnvelopeIcon, MapMarkerIcon } from "evergreen-ui";

import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";

interface ContactProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactProps) => (
  <Pane display="grid" gap={6}>
    <Pane
      display="grid"
      gap={12}
      alignItems="center"
      gridTemplateColumns="auto 1fr"
    >
      <PhoneIcon size={12} />
      <PreviewPlaceholder
        size={400}
        value={contact.phone}
        placeholder="+12 345 567 789"
      />
    </Pane>
    <Pane
      display="grid"
      gap={12}
      alignItems="center"
      gridTemplateColumns="auto 1fr"
    >
      <EnvelopeIcon size={12} />
      <PreviewPlaceholder
        size={400}
        value={contact.email}
        placeholder="your.email@here.com"
      />
    </Pane>
    <Pane
      display="grid"
      gap={12}
      alignItems="center"
      gridTemplateColumns="auto 1fr"
    >
      <MapMarkerIcon size={12} />
      <PreviewPlaceholder
        size={400}
        value={contact.address}
        placeholder="Kentacky Road, US"
      />
    </Pane>
  </Pane>
);

export default ContactCard;
