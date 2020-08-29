import React, { useState, useEffect, useRef } from 'react';
import Titlebar from './components/Titlebar/Titlebar';
import VideoPlayer from './views/VideoPlayer';
import { Grow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const styles = (theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: '5px'
  }
})

const App = (props) => {
  const { classes } = props

  const [fullscreen, setFullscreen] = useState(false);
  const [title, setTitle] = useState('')
  const player = useRef(null)

  useEffect(() => {
    window.winAction.setFullscreen(fullscreen)
  }, [fullscreen])

  return (
    <div className={classes.root}>
      {!fullscreen ? <Titlebar title={title} /> : ""}
        <VideoPlayer fullscreen={fullscreen} setFullscreen={setFullscreen} setTitle={setTitle} player={player}/>
    </div>
  );
}

export default withStyles(styles, { name: 'PLApp' })(App);

