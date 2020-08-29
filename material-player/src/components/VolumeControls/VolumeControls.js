import React, { useState, useEffect } from 'react'
import { IconButton, Slider, Collapse } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';

export const styles = (theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '120px',
    },
    slider: {
        width: '120px',
    },
    shown: {
        transform: 'scalex(1)',
        transition: '.2s transform',
        transformOrigin: '0 0'
    },
    hidden: {
        transform: 'scalex(0)',
        transition: '.2s transform',
        transformOrigin: '0 0'
    }
})

let out;

const VolumeControls = (props) => {
    const { volume, setVolume, classes, mute, setMute, disabled } = props

    const [saveVol, setSaveVol] = useState(0.5)
    const [expand, setExpand] = useState(false)

    useEffect(()=>{
        clearTimeout(out)
        setExpand(true)
        out = setTimeout(()=> setExpand(false),1000)
    },[volume])


    return (
        <div className={classes.root} onMouseEnter={() => setExpand(true)} onMouseLeave={() => setExpand(false)}>
            <IconButton aria-label="Mute" onClick={() => setMute(!mute)} disabled={disabled}>
                {volume === 0 || mute ? <VolumeOffIcon /> : volume < 0.3 ? <VolumeMuteIcon /> : volume < 0.6 ? <VolumeDownIcon /> : <VolumeUpIcon />}
            </IconButton>
            <div className={expand && !disabled? classes.shown : classes.hidden} >
                <Slider value={mute? 0: volume} min={0} max={1} step={0.05} onChange={(e, d) => {setVolume(d); if(mute){setMute(false)}}} className={classes.slider}></Slider>
            </div>
        </div>
    )
}

export default withStyles(styles, { name: 'PLVolumeControls' })(VolumeControls);
