import classes from './Form.module.css';
import { useEffect } from 'react';
import { AddIcon, Button, CaretDownIcon, CaretUpIcon, ChevronDownIcon, ChevronUpIcon, Heading, IconButton, Label, MinusIcon, Pane, PlusIcon, Position, RemoveIcon, Text, Textarea, TextInput, TextInputField, Tooltip } from 'evergreen-ui';
import lng from '../../languages/languages.en.json';
import data from '../../languages/data.en.json';
import { useState } from 'react';
import { position } from 'ui-box';
import Card from '../ui/Card';

const Form = () => {
    const [userData, setUserData] = useState(data);

    useEffect(() => {
        console.log(data);
        console.log(userData);
    }, [userData]);

    return (
        <Pane display='grid' gap={16} padding={16}>
            <Card title={lng.personalData}>
                <Pane display='grid' alignItems='center' gap={16} gridTemplateColumns='auto 1fr'>
                    <Pane display='grid' placeContent='center' border background='white' borderRadius={4} height={100} width={100}>
                        <Button iconBefore={PlusIcon} appearance='minimal' >Photo</Button>
                    </Pane>
                    <Pane display='grid' gap={8}>
                        <Pane display='grid' gap={8} gridTemplateColumns='1fr 1fr'>
                            <Pane display='grid'>
                                <Label size={300}>{lng.name}</Label>
                                <TextInput width='auto' value={userData.basicData?.name} />
                            </Pane>
                            <Pane display='grid'>
                                <Label size={300}>{lng.surname}</Label>
                                <TextInput width='auto' value={userData.basicData?.surname} />
                            </Pane>
                        </Pane>
                        <Pane display='grid' paddingBottom={8}>
                            <Label size={300}>{lng.position}</Label>
                            <TextInput width='auto' value={userData.basicData?.position} />
                        </Pane>
                    </Pane>
                </Pane >
            </Card>

            <Card title={lng.contactData}>
                <Pane display='grid' gap={16}>
                    <Pane display='grid' gridTemplateColumns='1fr 1fr' gap={16}>
                        <Pane display='grid' paddingBottom={8}>
                            <Label size={300}>{lng.telephone}</Label>
                            <TextInput width='auto' value={userData.contact?.telephone} />
                        </Pane>
                        <Pane display='grid' paddingBottom={8}>
                            <Label size={300}>{lng.email}</Label>
                            <TextInput width='auto' value={userData.contact?.email} />
                        </Pane>
                    </Pane>
                    <Pane display='grid' paddingBottom={8}>
                        <Label size={300}>{lng.location}</Label>
                        <TextInput width='auto' value={userData.contact?.location} />
                    </Pane>
                </Pane>
            </Card>


            <Card title={lng.summary}>
                <Pane display='grid'>
                    <Textarea width='auto' resize='none' placeholder="" value={userData.summary} />
                </Pane>
            </Card>

            <Card title={lng.skills}
                headerButtons={[<Button iconBefore={AddIcon}>New Skill</Button>]}
            >
                <Pane display='grid' gap={16}>
                    {
                        userData.skills.map(skill => (
                            <Pane display='grid' gap={8} gridTemplateColumns='1fr 2fr auto auto auto'>

                                <TextInput width='auto' value={skill.name} />
                                <TextInput width='auto' value={skill.details} />
                                <IconButton icon={ChevronUpIcon} />
                                <IconButton icon={ChevronDownIcon} />
                                <Button intent='danger' iconBefore={RemoveIcon} >Remove Skill</Button>

                            </Pane>
                        ))
                    }
                </Pane>
            </Card>

            <Card title={lng.languages} headerButtons={[<Button iconBefore={AddIcon} >New Language</Button>]}>
                <Pane display='grid' gap={16}>
                    {
                        userData.languages.map(language => (
                            <Pane display='grid' gap={8} gridTemplateColumns='1fr 2fr auto auto auto'>
                                <TextInput width='auto' value={language.name} />
                                <TextInput width='auto' value={language.level} />
                                <IconButton icon={ChevronUpIcon} />
                                <IconButton icon={ChevronDownIcon} />
                                <Button intent='danger' iconBefore={RemoveIcon} >Remove Language</Button>

                            </Pane>
                        ))
                    }
                </Pane>
            </Card>

            <Card title={lng.experience} headerButtons={[<Button iconBefore={AddIcon} >New Experience</Button>]}>
                <Pane display='grid' gap={16}>
                    {
                        userData.experience.map((exp, i) => (
                            <Card
                                title={(exp.from || exp.to || exp.company) ? `${exp.from} - ${exp.to} (${exp.company})` : 'Experience ' + (i + 1)}
                                level={1}
                                headerButtons={[<Button iconBefore={AddIcon} >New Duty</Button>, <Button iconBefore={RemoveIcon} intent='danger'>Remove Experience</Button>]}
                                footerButtons={[<Button iconBefore={AddIcon} >New Duty</Button>]}>
                                <Pane display='grid' gap={8} paddingBottom={16} gridTemplateColumns='1fr 2fr'>
                                    <Pane display='grid' gap={8}>
                                        <Pane display='grid'>
                                            <Label size={300}>From</Label>
                                            <TextInput width='auto' value={exp.from} />
                                        </Pane>
                                        <Pane display='grid'>
                                            <Label size={300}>To</Label>
                                            <TextInput width='auto' value={exp.to} />
                                        </Pane>
                                    </Pane>
                                    <Pane display='grid' gap={8}>
                                        <Pane display='grid'>
                                            <Label size={300}>Position</Label>
                                            <TextInput width='auto' value={exp.position} />
                                        </Pane>
                                        <Pane display='grid'>
                                            <Label size={300}>Company</Label>
                                            <TextInput width='auto' value={exp.company} />
                                        </Pane>
                                    </Pane>
                                </Pane>
                                <Pane display='grid' gap={16}>
                                    {
                                        exp.duties.map((duty, j) => (
                                            <Card
                                                title={`Duty ${j + 1} (${(exp.company) ? exp.company : `Experience ${i + 1}`})`} level={2}
                                                headerButtons={[
                                                    <IconButton icon={ChevronUpIcon} />,
                                                    <IconButton icon={ChevronDownIcon} />,
                                                    <Button intent='danger' iconBefore={RemoveIcon} >Remove Duty</Button>
                                                ]}
                                            >
                                                <Pane display='grid' gap={16}>
                                                    <Pane display='grid'>
                                                        <Label size={300}>Description</Label>
                                                        <Textarea rows={3} width='auto' resize='none' placeholder="" value={duty.name} />
                                                    </Pane>
                                                    <Pane display='grid'>
                                                        <Label size={300}>Technologies</Label>
                                                        <TextInput width='auto' value={duty.technologies} />
                                                    </Pane>

                                                </Pane>
                                            </Card>
                                        ))
                                    }
                                </Pane>
                            </Card>
                        ))
                    }
                </Pane >
            </Card >

            <Card title={lng.education} headerButtons={[<Button iconBefore={AddIcon} >New Education</Button>]}>
                <Pane display='grid' gap={16}>
                    {
                        userData.education.map((edu, i) => (
                            <Card
                                title={(edu.from || edu.to || edu.school) ? `${edu.from} - ${edu.to} (${edu.school})` : 'Education ' + (i + 1)}
                                level={1}
                                headerButtons={[<Button iconBefore={RemoveIcon} intent='danger'>Remove Education</Button>]}>
                                <Pane display='grid' gap={8} paddingBottom={16} gridTemplateColumns='1fr 2fr'>
                                    <Pane display='grid' gap={8}>
                                        <Pane display='grid'>
                                            <Label size={300}>From</Label>
                                            <TextInput width='auto' value={edu.from} />
                                        </Pane>
                                        <Pane display='grid'>
                                            <Label size={300}>To</Label>
                                            <TextInput width='auto' value={edu.to} />
                                        </Pane>
                                    </Pane>
                                    <Pane display='grid' gap={8}>
                                        <Pane display='grid'>
                                            <Label size={300}>Field</Label>
                                            <TextInput width='auto' value={edu.field} />
                                        </Pane>
                                        <Pane display='grid'>
                                            <Label size={300}>School</Label>
                                            <TextInput width='auto' value={edu.school} />
                                        </Pane>
                                    </Pane>
                                </Pane>
                            </Card>
                        ))
                    }
                </Pane >
            </Card >

            <Card title={lng.interests}>
                <Pane display='grid'>
                    <Textarea width='auto' resize='none' placeholder="" value={userData.hobbys} />
                </Pane>
            </Card>

            <Button onClick={() => window.print()} appearance='primary'>
                Print
            </Button>
        </Pane >
    )
}

export default Form;