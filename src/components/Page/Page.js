import { useEffect, useRef } from 'react';
import Bar from '../Bar/Bar';
import Experience from '../Experience/Experience';
import classes from './Page.module.css';

const Page = () => {
    const pageRef = useRef();

    useEffect(() => {
        if (!pageRef.current) return;

        let timeout;

        const onWindowResize = () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                const { height: parentHeight, width: parentWidth } = pageRef.current.parentElement.getBoundingClientRect();
                // const { height: pageHeight, width: pageWidth } = pageRef.current.getBoundingClientRect();
                const pageHeight = 1133;
                const padding = Number(window.getComputedStyle(pageRef.current.parentElement).paddingTop.replace('px', ''));
                const scale = (parentHeight - (padding * 2)) / pageHeight;
                pageRef.current.style.transform = `scale(${scale})`;
                pageRef.current.parentElement.style.width = `${scale * 793}px`
                console.log(parentHeight, pageHeight)
            }, 100);
        }

        onWindowResize();


        window.addEventListener('resize', onWindowResize);

        return () => window.removeEventListener('resize', onWindowResize);
    }, [pageRef]);

    return (
        <div className={classes.Page} ref={pageRef}>
            <Bar />
            <Experience />
        </div >
    )
}

export default Page;