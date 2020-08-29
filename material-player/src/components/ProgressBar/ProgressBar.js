import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Slider, Tooltip } from '@material-ui/core';

export const styles = (theme) => ({
    root: {
        width: '100%',
    },
    progBar: {
        zIndex: '200',
        transition: 'height .1s',
        padding: 0,
        postion: 'relative',
        bottom: '-5px',
        background: theme.palette.background.default,
        '& > .MuiSlider-rail': {
            transition: 'height .1s',
            background: 'black',
        },
        '& > .MuiSlider-track': {
            transition: 'height .1s',
        },
        '& > .MuiSlider-thumb': {
            transition: 'height .1s',
        }
    },
    progBarMin: {
        height: '4px',
        '& > .MuiSlider-rail': {
            height: '4px',
        },
        '& > .MuiSlider-track': {
            height: '4px',
        },
        '& > .MuiSlider-thumb': {
            height: '8px',
            width: '8px',
            marginTop: '-2px',
        }


    },
    progBarMax: {
        height: '12px',
        '& > .MuiSlider-rail': {
            height: '8px',
        },
        '& > .MuiSlider-track': {
            height: '8px',
        },
        '& > .MuiSlider-thumb': {
            height: '14px',
            width: '14px',
            marginTop: '-3px',
        }
    },
})

const getTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
}

function ValueLabelComponent(props) {
    const { children, open, value } = props;
    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={getTime(value)}>
            {children}
        </Tooltip>
    );
}

const ProgressBar = (props) => {
    const [focus, setFocus] = useState()
    const [hover, setHover] = useState()
    const [active, setActive] = useState()

    const slider = useRef(null);

    const { classes, progress, setProgress, setTime, play, setPlay, duration, disabled } = props

    useEffect(() => {
        if (!disabled) {

            if (active || hover) {
                setFocus(true)
            } else {
                setFocus(false)
            }
        }
    }, [active, disabled, hover])

    return (
        <div className={classes.root} onMouseOver={() => { setHover(true) }} onMouseOut={() => { setHover(false) }}>
            {/* <Slider className={clsx(classes.progBar, focus? classes.progBarMax : classes.progBarMin)}/> */}
            <Slider
            disabled={disabled}
                ref={slider}
                step={1}
                min={0}
                max={duration}
                value={progress}
                onChange={(e, v) => { setTime(v); setActive(true); setProgress(v); setPlay(false) }}
                onChangeCommitted={() => { setActive(false); setPlay(true) }}
                className={clsx(classes.progBar, focus ? classes.progBarMax : classes.progBarMin)}
                ValueLabelComponent={ValueLabelComponent}
            />
        </div>
    )
}

export default withStyles(styles, { name: 'PLProgressBar' })(ProgressBar);

