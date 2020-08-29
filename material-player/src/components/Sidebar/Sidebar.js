import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Slide } from '@material-ui/core';

export const styles = (theme) => ({
    root: {
        height: '100%',
    },
    expanded: {
        width: '40px'
    },
    hidden: {
        width: 0
    }
});

const Sidebar = (props) => {
    const { classes } = props;

    const [show, setShow] = useState(true)

    return (
            <div onClick={()=>setShow(!show)} className={classes.root}>
                <div className={show? classes.expanded: classes.hidden}></div>
            </div>  
    );
}

export default withStyles(styles, { name: 'PLSidebar' })(Sidebar);