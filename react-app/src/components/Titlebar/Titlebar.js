import React, { useState,useContext } from 'react'
import { IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { MediaContext } from '../../context/MediaContext';

export const styles = (theme) => ({
    root: {
        '-webkit-app-region': 'drag',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        height: '30px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '12px',
        background: theme.palette.background.dark
    },
    titleBar: {
        justifySelf: 'left',
        display: 'flex',
        alignItems: 'center'
    },
    buttonBar: {
        '-webkit-app-region': 'none',
        justifySelf: 'right',
        display: 'flex'
    },
    button: {
        width: '33px',
        height: '33px'
    },
    titleLogo: {
        height: '22px',
        margin: '4px'
    },
    title: {

    }
})

const Titlebar = (props) => {
    const { classes } = props

    const {state, dispatch} = useContext(MediaContext);
    const {media, fullscreen} = state;
    const [max, setMax] = useState(false)

    if(fullscreen){
        return null
    }

    return (
        <div className={classes.root}>

            <div className={classes.titleBar}>
                <img alt={'logo'} src={'x32.png'} className={classes.titleLogo} />
                <div className={classes.title}>
                    {media.title}
                </div>
            </div>
            <div className={classes.buttonBar}>
                <IconButton className={classes.button} aria-label="Exit" size={'small'} onClick={() => window.winAction.action('minimise')}>
                    <MinimizeIcon fontSize={'inherit'} />
                </IconButton>
                <IconButton className={classes.button} aria-label="Exit" size={'small'} onClick={() => { window.winAction.action('toggleMaximise'); setMax(!max) }}>
                    {max ? <FilterNoneIcon fontSize={'inherit'} /> : <CheckBoxOutlineBlankIcon fontSize={'inherit'} />}
                </IconButton>
                <IconButton className={classes.button} aria-label="Exit" size={'small'} onClick={() => window.winAction.action('close')}>
                    <CloseIcon fontSize={'inherit'} />
                </IconButton>
            </div>
        </div>
    )
}

export default withStyles(styles, { name: 'PLTitlebar' })(Titlebar);