import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.transparent,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const VideoFallback = (props) => {

    const { classes } = props;

    return (
        <div className={classes.root}>
            <div>
                No file selected <br/> go to file > open to open a video file
            </div>
        </div>
    )
}

export default withStyles(styles, { name: 'PLVideoFallback' })(VideoFallback);
