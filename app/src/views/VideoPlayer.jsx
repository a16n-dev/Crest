import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import {
  Menu, MenuItem, ListItemIcon, Snackbar, Grow,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import Controls from '../components/Controls/Controls';
import Video from '../components/Video/Video';
import VideoFallback from '../components/VideoFallback/VideoFallback';
import { MediaContext } from '../context/MediaContext';

let snackbar;

export const styles = (theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    outline: 'none',
    '&:focus ': {
      outline: 'none',
    },
  },
});

const initialDialogState = {
  mouseX: null,
  mouseY: null,
};

const VideoPlayer = (props) => {
  const {
    classes, fullscreen, setFullscreen, setTitle, player,
  } = props;
  const focus = useRef(null);
  const [dialog, setDialog] = useState(initialDialogState);
  const [notif, setNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState('');

  const { state, dispatch } = useContext(MediaContext);
  const { disabled, play } = state;

  // useEffect(() => {
  //     window.loader.getUserFile().then(({filePaths}) => {
  //         console.log(filePaths);
  //         if (filePaths.length > 0) {
  //             setSrc(filePaths[0])
  //             setPlay(true)
  //         }

  //     }).catch((err) => {
  //         console.log(err);
  //     });
  // }, [])

  const handleDialogClick = (event) => {
    event.preventDefault();
    if (!disabled) {
      setDialog({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
      });
    }
  };

  const handleDialogClose = () => {
    setDialog(initialDialogState);
  };

  const notify = (msg) => {
    setNotifMsg(msg);
    clearTimeout(snackbar);
    setNotif(true);
    snackbar = setTimeout(() => setNotif(false), 1000);
  };

  return (
    <div
      className={classes.root}
      tabIndex={0}
      ref={focus}
      onContextMenu={handleDialogClick}
    >
      {!disabled ? <Video /> : <VideoFallback />}
      <Controls />
      <Menu
        keepMounted
        open={dialog.mouseY !== null}
        onClose={handleDialogClose}
        anchorReference="anchorPosition"
        anchorPosition={
                    dialog.mouseY !== null && dialog.mouseX !== null
                      ? { top: dialog.mouseY, left: dialog.mouseX }
                      : undefined
                }
      >
        <MenuItem onClick={() => { handleDialogClose(); }}>
          <ListItemIcon>
            {play ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
          </ListItemIcon>
          {play ? 'Pause' : 'Play'}
        </MenuItem>
        <MenuItem onClick={() => { handleDialogClose(); }}>
          <ListItemIcon>
            <VolumeUpIcon fontSize="small" />
          </ListItemIcon>
          Volume up
        </MenuItem>
        <MenuItem onClick={() => { handleDialogClose(); }}>
          <ListItemIcon>
            <VolumeDownIcon fontSize="small" />
          </ListItemIcon>
          Volume down
        </MenuItem>
        <MenuItem onClick={() => { handleDialogClose(); }}>
          <ListItemIcon>
            <FastForwardIcon fontSize="small" />
          </ListItemIcon>
          Speed up
        </MenuItem>
        <MenuItem onClick={() => { handleDialogClose(); }}>
          <ListItemIcon>
            <FastRewindIcon fontSize="small" />
          </ListItemIcon>
          Slow down
        </MenuItem>
      </Menu>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        open={notif}
        TransitionComponent={Grow}
        message={notifMsg}
        disableWindowBlurListener
      />
    </div>

  );
};

export default withStyles(styles, { name: 'PLVideoPlayer' })(VideoPlayer);
