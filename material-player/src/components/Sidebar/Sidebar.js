import React, { useState, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import transitions from '@material-ui/core/styles/transitions';
import clsx from 'clsx';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { MediaContext } from '../../context/MediaContext';

export const styles = (theme) => ({
    root: {
        height: '100%',
        width: '40px',
        background: theme.palette.background.dark,
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 0'
    },
    hidden: {
        width: 0
    },
    button: {
        height: '40px',
        width: '40px',
        borderRadius: 0,
        padding: '4px'
    }
});

const Sidebar = (props) => {
    const { classes } = props;

    const [show, setShow] = useState(true)
    const {state, dispatch} = useContext(MediaContext);

    const handleOpenFile = async () => {
        const res = await window.loader.getUserFile()
        const files = res.filePaths
        if(files.length === 1){
            dispatch({
                type: 'SET_SRC',
                src: res.filePaths[0]
            })
        }
    }

    return (
        <div className={clsx(classes.root, !show && classes.hidden)}>
            <IconButton aria-label="Open file" onClick={handleOpenFile} className={classes.button}>
                <PermMediaIcon />
            </IconButton>
        </div>
    );
}

export default withStyles(styles, { name: 'PLSidebar' })(Sidebar);