import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { Grow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Titlebar from '../components/Titlebar/Titlebar';
import VideoPlayer from '../views/VideoPlayer';
import Menubar from '../components/Menubar/Menubar';
import { MediaProvider } from '../context/MediaContext';

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
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

const App = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <MediaProvider>
        <Titlebar />
        <div className={classes.contentContainer}>
          <Menubar />
          <VideoPlayer />
        </div>
      </MediaProvider>
    </div>
  );
};

export default withStyles(styles, { name: 'PLApp' })(App);
