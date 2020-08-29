import React, { useState, useRef, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
    root: {
        position: 'relative',
        flexGrow: 1,
        background: '#000',
        display: 'grid',
        marginBottom: '60px',
    },
    rootFullscreen: {
        flexGrow: 1,
        background: '#000',
        display: 'grid',
    },
    video: {
        width: '100%',
        height: 'calc(100vh - 92px)',
        margin: 0,
        justifySelf: 'center',
        alignSelf: 'center',
        objectFit: 'contain',
    },
    videoFullscreen: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        justifySelf: 'center',
        alignSelf: 'center',
        objectFit: 'contain',
    },
    videoOverlay: {
        width: '100%',
        height: '100%',
        background: 'red'
    }
})

const Video = (props) => {
    const { setTime, setChangeTime, changeTime, play, setDuration, src, fullscreen, speed, volume, mute, player } = props
    const video = useRef(null)

    const handleChange = (e) => {
        setTime(e.target.currentTime)
    }

    useEffect(() => {
        if (changeTime != null) {
            video.current.currentTime = changeTime;
        }
        setChangeTime(null);
    }, [changeTime, setChangeTime])

    useEffect(() => {
        if (play) {
            video.current.play();
        } else {
            video.current.pause();
        }

    }, [play])

    useEffect(() => {
        video.current.playbackRate = speed;
    }, [speed])

    useEffect(() => {
        video.current.volume = mute ? 0 : volume;
    }, [volume, mute])

    const { classes } = props
    return (
        <div className={fullscreen ? classes.rootFullscreen : classes.root} ref={player}>
            <div className={classes.videoOverlay}>

            </div>
            <video
                ref={video}
                className={fullscreen ? classes.videoFullscreen : classes.video}
                src={src}
                onTimeUpdate={(e) => handleChange(e)}
                onDurationChange={(e) => setDuration(e.target.duration)}
            />
        </div>
    )

}

export default withStyles(styles, { name: 'PLVideo' })(Video);

