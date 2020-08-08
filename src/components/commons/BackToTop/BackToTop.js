import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { useStyles } from './Classes';

export default function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#top');
        if (anchor && props.opType==='1') {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }else if(props.opType==='2'){
            document.location='/';
        }
    };

    return (
        props.opType==='1'?(
            <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" 
            className={props.opType==='1'?classes.rt:classes.retrn}>
                {children}
            </div>
        </Zoom>
        ):(<Zoom in>
            <div onClick={handleClick} role="presentation" 
            className={props.opType==='1'?classes.rt:classes.retrn}>
                {children}
            </div>
        </Zoom>)
    );
}