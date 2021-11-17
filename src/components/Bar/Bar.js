import classes from './Bar.module.css';
import { BsFillTelephoneFill, BsTelephone } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { AiOutlineMail } from 'react-icons/ai';

const Bar = () => (
    <div className={classes.Bar}>
        <div className={classes.Top}>
            <img src='https://thispersondoesnotexist.com/image' className={classes.Image} alt='Person' />

            <div className={classes.Person}>
                <div className={classes.NameSurname}>Dawid Lipiński</div>
                <div className={classes.Position}>React/Solidity/Dapp Developer</div>
            </div>

        </div>


        <div className={classes.ContactWrapper}>
            <div className={classes.ContactData}>

                <BsTelephone />
                <div className={classes.DataValue}>+48 795 072 165</div>

                <AiOutlineMail />
                <div className={classes.DataValue}>dawid.lipinski3@gmail.com</div>
                <GoLocation />
                <div className={classes.DataValue}>Al. Grunwaldzka 609A/23, 80-337 Gdańsk, Polska</div>
            </div>

        </div>

    </div>
)

export default Bar;