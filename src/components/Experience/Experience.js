import classes from './Experience.module.css';
import data from '../../languages/data.en.json';
import lng from '../../languages/languages.en.json';

const Experience = () => (
    <div className={classes.Experience}>
        <div className={classes.Title}>{lng.summary}</div>
        <div className={classes.Summary}>
            {data.summary}
        </div>
        <div className={classes.Row}>
            <div>
                <div className={classes.Title}>{lng.skills}</div>
                <div className={classes.Skills}>
                    {
                        data.skills.map(skill => (
                            <div className={classes.Skill}>
                                <div className={classes.SkillName}>{skill.name}</div>
                                <div className={classes.SubSkills}>{skill.details}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <div className={classes.Title}>{lng.languages}</div>
                <div className={classes.Languages}>
                    {
                        data.languages.map(language => (
                            <div className={classes.Language}>
                                <div className={classes.LanguageName}>{language.name}</div>
                                <div className={classes.LanguageStatus}>{language.level}</div>
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
        <div className={classes.Title}>{lng.experience}</div>
        <div className={classes.List}>
            {
                data.experience.map(exp => (
                    <div className={classes.ListItem}>
                        <div className={classes.Time}>{exp.from} - {exp.to}</div>
                        <div className={classes.Right}>
                            <div className={classes.PositionTitle}>{exp.position}</div>
                            <div className={classes.CompanyTitle}>{exp.company}</div>
                            <ul className={classes.Duties}>
                                {
                                    exp.duties.map(duty => (
                                        <li>
                                            {duty.name}
                                            <div className={classes.Techs}>{duty.technologies}</div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className={classes.Title}>{lng.education}</div>
        <div className={classes.List}>
            {
                data.education.map(edu => (
                    <div className={classes.ListItem}>
                        <div className={classes.Time}>{edu.from}-{edu.to}</div>
                        <div className={classes.Right}>
                            <div className={classes.PositionTitle}>{edu.field}</div>
                            <div className={classes.CompanyTitle}>{edu.school}</div>
                        </div>
                    </div>
                ))
            }

        </div>

        <div>
            <div className={classes.Title}>{lng.interests}</div>
            <div className={classes.Hobbys}>
                {data.hobbys}
            </div>
        </div>
    </div >
)

export default Experience;