import React, { useState, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import transitions from '@material-ui/core/styles/transitions';
import clsx from 'clsx';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import SettingsIcon from '@material-ui/icons/Settings';
import { MediaContext } from '../../context/MediaContext';

export const styles = (theme) => ({
    root: {
        width: '100%',
        height: '25px',
        background: theme.palette.background.default,
        zIndex: 500,
        display: 'flex',
        flexDirection: 'row',
    },
    hidden: {
        height: 0
    },
    button: {
        height: '25px',
        width: '50px',
        borderRadius: '2px',
        padding: '4px',
        fontSize: '16px'
    },
    buttonEnd:{
        marginLeft: 'auto'
    }
});

const Sidebar = (props) => {
    const { classes } = props;

    const [show, setShow] = useState(true)
    const {state, dispatch} = useContext(MediaContext);
    const {fullscreen} = state
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

    if(fullscreen){
        return null
    }

    return (
        <div className={clsx(classes.root, !show && classes.hidden)}>
            <Tooltip title="Open file" placement="bottom">
            <IconButton aria-label="Open file" onClick={handleOpenFile} className={classes.button}>
                <PermMediaIcon fontSize='inherit'/>
            </IconButton>
            </Tooltip>
            <Tooltip title="Load Dummy file" placement="bottom">
            <IconButton aria-label="Open file" onClick={()=>dispatch({
                type: 'SET_SRC',
                src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            })} className={clsx(classes.button)}>
                D
            </IconButton>
            </Tooltip>
            <Tooltip title="Settings" placement="bottom">
            <IconButton aria-label="Settings" onClick={()=>dispatch({
                type: 'SET_SRC',
                src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            })} className={clsx(classes.button, classes.buttonEnd)}>
                <SettingsIcon fontSize='inherit'/>
            </IconButton>
            </Tooltip>
        </div>
    );
}

export default withStyles(styles, { name: 'PLSidebar' })(Sidebar);