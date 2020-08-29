import React, { useState, useEffect } from 'react'
import { Button, IconButton, Paper, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ProgressBar from '../ProgressBar/ProgressBar';
import VolumeControls from '../VolumeControls/VolumeControls';

export const styles = (theme) => ({
    root: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        gridArea: 'controls',
        display: 'flex',
        flexDirection: 'column',
    },
    controls: {
        height: '60px',
        display: 'grid',
        padding: '6px',
        gridTemplateAreas: '"settings playback fullscreen"',
        gridTemplateColumns: 'repeat(3,1fr)',
        boxSizing: 'border-box',
        justifyItems: 'stretch',
    },
    controlsFullscreen: {
        backdropFilter: 'blur(10px) brightness(60%)',
        height: '60px',
        display: 'grid',
        padding: '6px',
        gridTemplateAreas: '"settings playback fullscreen"',
        gridTemplateColumns: 'repeat(3,1fr)',
        boxSizing: 'border-box'
    },
    settingButtons: {
        gridArea: 'settings',
        display: 'flex',
    },
    playbackButtons: {
        gridArea: 'playback',
        justifySelf: 'center',
        display: 'flex'
    },
    fullscreenButtons: {
        gridArea: 'fullscreen',
        justifySelf: 'right',
        display: 'flex'
    },
    volumeContainer: {

    }

})

const Controls = (props) => {
    const { classes, time, setTime, play, setPlay, duration, fullscreen, setFullscreen, volume, setVolume, mute, setMute, disabled } = props

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setProgress(time)
    }, [time])

    const getTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60)
        return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }

    return (
        <div className={classes.root} onKeyDown={(e) => e.keyCode === 32 ? e.stopPropagation() : null}>
            <ProgressBar progress={progress} setProgress={setProgress} setTime={setTime} play={play} setPlay={setPlay} duration={duration} disabled={disabled} />

            <div className={fullscreen ? classes.controlsFullscreen : classes.controls}>
                <div className={classes.settingButtons}>
                    <VolumeControls volume={volume} setVolume={setVolume} mute={mute} setMute={setMute} disabled={disabled} />
                </div>


                <div className={classes.playbackButtons}>
                    <IconButton aria-label="Previous" onClick={() => { setTime(0) }} disabled={disabled}>
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton aria-label="Play/Pause" onClick={(e) => { setPlay(!play) }} disabled={disabled}>
                        {play ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                    <IconButton aria-label="Next" disabled={disabled}>
                        <SkipNextIcon />
                    </IconButton>

                </div>


                <div className={classes.fullscreenButtons}>
                    <h5>{disabled ? '' : <>{getTime(progress)} / {getTime(duration)}</>}</h5>
                    <IconButton aria-label="Toggle Fullscreen" onClick={() => setFullscreen(!fullscreen)}>
                        {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                </div>

            </div>
        </div >
    )
}

export default withStyles(styles, { name: 'PLControls' })(Controls);

