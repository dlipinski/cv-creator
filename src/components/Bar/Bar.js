import classes from './Bar.module.css';
import { BsFillTelephoneFill, BsTelephone } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { AiOutlineMail } from 'react-icons/ai';
import { Text, Pane, Heading, PhoneIcon, EnvelopeIcon, MapMarkerIcon } from 'evergreen-ui';

const Bar = ({ activeDocument }) => (
    <div className={classes.Bar}>
        <div className={classes.Top}>
            <Pane
                background="white"
                border
                width={100}
                height={100}
                borderRadius={8}
                backgroundImage={`url(${activeDocument.personal.photo})`}
                backgroundSize="cover" />
            <Pane display='grid' gap={2}>
                <Heading size={800}>
                    {activeDocument.personal.firstName || activeDocument.personal.lastName ? activeDocument.personal.firstName + ' ' + activeDocument.personal.lastName : 'John Smith'}
                </Heading>
                <Heading size={200}>
                    {activeDocument.personal.position || 'React/Redux/Solidity Developer'}
                </Heading>
            </Pane>

        </div>


        <div className={classes.ContactWrapper}>
            <Pane display='grid' gap={12}>
                <Pane display='grid' gap={8} alignItems='center' gridTemplateColumns='auto 1fr'>
                    <PhoneIcon />
                    <Heading size={400}>
                        {activeDocument.contact.phone || '123 456 789'}
                    </Heading>
                </Pane>
                <Pane display='grid' gap={8} alignItems='center' gridTemplateColumns='auto 1fr'>
                    <EnvelopeIcon />
                    <Heading size={400}>
                        {activeDocument.contact.email || 'your.email@gmail.com'}
                    </Heading>
                </Pane>
                <Pane display='grid' gap={8} alignItems='center' gridTemplateColumns='auto 1fr'>
                    <MapMarkerIcon />
                    <Heading size={400}>
                        {activeDocument.contact.address || 'Kentacky Road, US'}
                    </Heading>
                </Pane>
            </Pane>
        </div>

    </div >

)

export default Bar;