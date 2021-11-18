import { Button, Pane } from 'evergreen-ui';

import PersonalData from './components/PersonalData';
import ContractData from './components/ContactData';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Languages from './components/Languages';
import Experience from './components/Experience';
import Education from './components/Education';
import Interests from './components/Interests';

const Form = () => {
    return (
        <Pane display='grid' gap={32} padding={16}>
            <PersonalData />
            <ContractData />
            <Summary />
            <Skills />
            <Languages />
            <Experience />
            <Education />
            <Interests />

            <Button onClick={() => window.print()} appearance='primary' isLoading>
                Print
            </Button>
        </Pane >
    )
}

export default Form;