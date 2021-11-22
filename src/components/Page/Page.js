import { Pane } from 'evergreen-ui';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import Bar from '../Bar/Bar';
import Experience from '../Experience/Experience';
import classes from './Page.module.css';

const Page = () => {
    const pageRef = useRef();
    const { active, array } = useAppSelector((state) => state.form);
    const activeDocument = array[active];
    useEffect(() => {
        if (!pageRef.current) return;

        let timeout;

        const onWindowResize = () => {

            const { height: parentHeight, width: parentWidth } = pageRef.current.parentElement.getBoundingClientRect();
            // const { height: pageHeight, width: pageWidth } = pageRef.current.getBoundingClientRect();
            const pageHeight = 1133;
            const padding = Number(window.getComputedStyle(pageRef.current.parentElement).paddingTop.replace('px', ''));
            const scale = (parentHeight - (padding * 2)) / pageHeight;
            pageRef.current.parentElement.style.width = `${scale * 793 + padding * 2}px`
            pageRef.current.style.transform = `scale(${scale})`;
            console.log(parentHeight, pageHeight)

        }

        onWindowResize();


        window.addEventListener('resize', onWindowResize);

        return () => window.removeEventListener('resize', onWindowResize);
    }, [pageRef]);

    return (
        <Pane className={classes.Page} ref={pageRef} elevation={3} borderRadius={4}>
            <Bar activeDocument={activeDocument} />
            <Experience activeDocument={activeDocument} />
        </Pane >
    )
}

export default Page;