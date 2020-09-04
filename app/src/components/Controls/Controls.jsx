import React, { useState, useEffect, useContext } from 'react';
import {
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import clsx from 'clsx';
import ProgressBar from '../ProgressBar/ProgressBar';
import VolumeControls from '../VolumeControls/VolumeControls';
import { MediaContext } from '../../context/MediaContext';
import { getTime } from '../../helper/formatter';

export const styles = (theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    gridArea: 'controls',
    display: 'flex',
    flexDirection: 'column',
  },
  rootFullscreen: {
    margin: '0 10%',
    width: '80%',
    position: 'absolute',
    bottom: 0,
    gridArea: 'controls',
    display: 'flex',
    flexDirection: 'column',
    transition: '.2s opacity',
  },
  hidden: {
    opacity: 0,
  },
  controls: {
    height: '60px',
    display: 'grid',
    padding: '6px',
    gridTemplateAreas: '"settings playback fullscreen"',
    gridTemplateColumns: 'repeat(3,1fr)',
    boxSizing: 'border-box',
    justifyItems: 'stretch',
    backgroundColor: theme.palette.background.default,
  },
  controlsFullscreen: {
    height: '60px',
    display: 'grid',
    padding: '6px',
    gridTemplateAreas: '"settings playback fullscreen"',
    gridTemplateColumns: 'repeat(3,1fr)',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
  },
  settingButtons: {
    gridArea: 'settings',
    display: 'flex',
  },
  playbackButtons: {
    gridArea: 'playback',
    justifySelf: 'center',
    display: 'flex',
  },
  fullscreenButtons: {
    gridArea: 'fullscreen',
    justifySelf: 'right',
    display: 'flex',
  },
  timeDisplay: {
    padding: '0 8px',
    minWidth: '80px',
  },
  textDisplay: {
    padding: '0 4px',
  },
  dropdown: {
    height: '48px',
    padding: 0,
  },

});

let timeout;

const Controls = (props) => {
  const {
    classes, setTime, setPlay, duration, volume, setVolume, mute, setMute,
  } = props;

  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const { state, dispatch } = useContext(MediaContext);
  const {
    time, fullscreen, play, disabled, media, speed,
  } = state;

  useEffect(() => {
    setProgress(time);
  }, [time]);

  const handleMouseOver = () => {
    if (fullscreen) {
      clearTimeout(timeout);
      setShow(true);
      timeout = setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (fullscreen) {
      timeout = setTimeout(() => {
        setShow(false);
      }, 2500);
    } else {
      setShow(true);
    }
  }, [fullscreen]);

  return (
    <div
      className={clsx(fullscreen ? classes.rootFullscreen : classes.root, !show && fullscreen && classes.hidden)}
      onMouseMove={handleMouseOver}
      onKeyDown={(e) => (e.keyCode === 32 ? e.stopPropagation() : null)}
    >
      <ProgressBar progress={progress} setProgress={setProgress} />

      <div className={fullscreen ? classes.controlsFullscreen : classes.controls}>
        <div className={classes.settingButtons}>
          <h5 className={classes.timeDisplay}>
            {disabled ? '' : (
              <>
                {getTime(progress)}
                {' '}
                /
                {' '}
                {getTime(media.duration)}
              </>
            )}
          </h5>
          <VolumeControls />
        </div>

        <div className={classes.playbackButtons}>
          <IconButton aria-label="Previous" onClick={() => { setTime(0); }} disabled={disabled}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="Play/Pause" onClick={(e) => { dispatch({ type: 'TOGGLE_PLAYBACK' }); }} disabled={disabled}>
            {play ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton aria-label="Next" disabled={disabled}>
            <SkipNextIcon />
          </IconButton>

        </div>

        <div className={classes.fullscreenButtons}>
          <IconButton aria-label="Toggle Fullscreen" onClick={() => dispatch({ type: 'TOGGLE_FULLSCREEN' })}>
            {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </div>

      </div>
    </div>
  );
};

export default withStyles(styles, { name: 'PLControls' })(Controls);
