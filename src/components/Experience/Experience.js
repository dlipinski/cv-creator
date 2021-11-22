import classes from './Experience.module.css';
import data from '../../languages/data.en.json';
import lng from '../../languages/languages.en.json';
import { Heading, Link, Pane, Text } from 'evergreen-ui';

const Experience = () => (
    <div className={classes.Experience}>

        <Pane borderBottom marginBottom={8} paddingBottom={8}>
            <Heading size={500}>{lng.summary}</Heading>
        </Pane>
        <Heading size={400} >
            {data.summary}
        </Heading>



        <Pane borderBottom marginBottom={8} paddingBottom={8} marginTop={16}>
            <Heading size={500}>{lng.skills}</Heading>
        </Pane>
        <Pane display='grid' gridTemplateColumns='1fr 1fr 1fr' gap={8}>
            {
                data.skills.map(skill => (
                    <Pane display='grid'>
                        <Heading size={400}>{skill.name}</Heading>
                        <Heading size={200} >{skill.details}</Heading>
                    </Pane>
                ))
            }
        </Pane>

        <Pane borderBottom marginBottom={8} paddingBottom={8} marginTop={16}>
            <Heading size={500}>{lng.experience}</Heading>
        </Pane>

        <Pane display='grid'>
            {
                data.experience.map(exp => (
                    <Pane display='grid' gridTemplateColumns='80px 1fr'>
                        <Heading size={400}>{exp.from} - {exp.to}</Heading>
                        <Pane paddingLeft={8} marginLeft={8}>
                            <Heading size={400}>{exp.position}</Heading>
                            <Heading size={200}>{exp.company}</Heading>
                            <Pane display='grid' marginTop={8} marginBottom={8} gap={8}>
                                {
                                    exp.duties.map(duty => (
                                        <Pane display='grid' borderLeft paddingLeft={16} >
                                            <Heading size={400}>{duty.name}</Heading>
                                            <Heading size={200}>{duty.technologies}</Heading>
                                        </Pane>
                                    ))
                                }
                            </Pane>
                        </Pane>
                    </Pane>
                ))
            }
        </Pane>

        <Pane borderBottom marginBottom={8} paddingBottom={8} marginTop={16}>
            <Heading size={500}>{lng.education}</Heading>
        </Pane>

        <Pane display='grid'>
            {
                data.education.map(exp => (
                    <Pane display='grid' gridTemplateColumns='80px 1fr'>
                        <Heading size={400}>{exp.from} - {exp.to}</Heading>
                        <Pane paddingLeft={8} marginLeft={8}>
                            <Heading size={400}>{exp.field}</Heading>
                            <Heading size={200}>{exp.school}</Heading>
                        </Pane>
                    </Pane>
                ))
            }
        </Pane>

        <Pane display='grid' gridTemplateColumns='3fr 1fr' gap={16} marginTop={16}>
            <Pane>
                <Pane borderBottom marginBottom={8} paddingBottom={8}>
                    <Heading size={500}>Projects</Heading>
                </Pane>
                <Pane display='grid' gridTemplateColumns='1fr 1fr' gap={16}>
                    <Pane display='grid'>
                        <Heading size={400}>Toqen</Heading>
                        <Heading size={200}>React/Web3</Heading>
                        <Heading size={300}>Multi-tool designed for ethereum blockchain.</Heading>
                        <Heading size={200}>tools.toqen.app</Heading>
                    </Pane>
                    <Pane display='grid'>
                        <Heading size={400}>CV-Generator</Heading>
                        <Heading size={200}>React/Redux-Toolkit/Firebase</Heading>
                        <Heading size={300}>Clean code and this cv whas created in this.</Heading>
                        <Heading size={200}>tools.toqen.app</Heading>

                    </Pane>
                </Pane>

            </Pane>
            <Pane>
                <Pane borderBottom marginBottom={8} paddingBottom={8}>
                    <Heading size={500}>{lng.languages}</Heading>
                </Pane>
                <Pane display='grid' gridTemplateColumns='1fr 1fr' gap={8}>
                    {
                        data.languages.map(language => (
                            <Pane display='grid'>
                                <Heading size={400}>{language.name}</Heading>
                                <Heading size={200} >{language.level}</Heading>
                            </Pane>
                        ))
                    }
                </Pane>

            </Pane>
        </Pane>



    </div >
)

export default Experience;