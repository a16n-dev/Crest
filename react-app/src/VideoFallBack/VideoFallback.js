import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.dark,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
       opacity: 0.25
    }
})

const VideoFallback = (props) => {

    const { classes } = props;

    return (
        <div className={classes.root}>
            <img className={classes.shadow} src={'shadow.png'} alt={''}/>
        </div>
    )
}

export default withStyles(styles, { name: 'PLVideoFallback' })(VideoFallback);
