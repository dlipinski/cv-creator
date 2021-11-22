import { Button, Pane } from "evergreen-ui";

import PersonalData from "./components/PersonalData";
import ContractData from "./components/ContactData";
import Summary from "./components/Summary";
import Skills from "./components/Skills";
import Languages from "./components/Languages";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Interests from "./components/Interests";
import LeftPanel from "./components/LeftPanel";
import MetaData from "./components/MetaData";

const Form = () => {
  return (
    <Pane display="grid" padding={16} gap={16}>
      <MetaData />
      <PersonalData />
      <ContractData />
      <Summary />
      <Skills />
      <Languages />
      <Experience />
      <Education />
      <Interests />
    </Pane>
  );
};

export default Form;
