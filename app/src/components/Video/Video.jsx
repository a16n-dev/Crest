import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MediaContext } from '../../context/MediaContext';

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
    height: 'calc(100vh - 117px)',
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
  },
});

const Video = (props) => {
  const video = useRef(null);

  const { state, dispatch } = useContext(MediaContext);
  const {
    fullscreen, speed, play, src, timeOverride, forcePause,
  } = state;

  const handleChange = (e) => {
    dispatch({
      type: 'SET_TIME',
      time: e.target.currentTime,
    });
  };

  const handleMediaInfo = (e) => {
    dispatch({
      type: 'SET_MEDIA_INFO',
      duration: e.target.duration,
      tracks: e.target.audioTracks,
    });
  };

  const handleMediaEnd = (e) => {
    dispatch({
      type: 'CLEAR_MEDIA',
    });
  };

  useEffect(() => {
    if (timeOverride != null) {
      video.current.currentTime = timeOverride;
    }
    dispatch({
      type: 'RESET_OVERRIDE',
    });
  }, [dispatch, timeOverride]);

  useEffect(() => {
    if (forcePause) {
      video.current.pause();
    } else if (play) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }, [play, forcePause]);

  useEffect(() => {
    video.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    video.current.volume = state.mute ? 0 : state.volume;
  }, [state.volume, state.mute]);

  const { classes } = props;
  return (
    <div className={fullscreen ? classes.rootFullscreen : classes.root}>
      <div className={classes.videoOverlay} />
      <video
        ref={video}
        className={fullscreen ? classes.videoFullscreen : classes.video}
        src={src}
        onTimeUpdate={(e) => handleChange(e)}
        onDurationChange={(e) => handleMediaInfo(e)}
        onEnded={handleMediaEnd}
      />
    </div>
  );
};

export default withStyles(styles, { name: 'PLVideo' })(Video);
