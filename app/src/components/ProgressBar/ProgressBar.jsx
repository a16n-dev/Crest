import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Slider, Tooltip } from '@material-ui/core';
import { MediaContext } from '../../context/MediaContext';
import { getTime } from '../../helper/formatter';

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
      background: 'rgba(0,0,0,0.54)',
    },
    '& > .MuiSlider-track': {
      transition: 'height .1s',
    },
    '& > .MuiSlider-thumb': {
      transition: 'height .1s',
    },
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
    },

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
    },
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={getTime(value)}>
      {children}
    </Tooltip>
  );
}

const ProgressBar = (props) => {
  const { state, dispatch } = useContext(MediaContext);
  const { media, disabled } = state;

  const [focus, setFocus] = useState();
  const [hover, setHover] = useState();
  const [active, setActive] = useState();

  const slider = useRef(null);

  const { classes, progress, setProgress } = props;

  useEffect(() => {
    if (!disabled) {
      if (active || hover) {
        setFocus(true);
      } else {
        setFocus(false);
      }
    }
  }, [active, disabled, hover]);

  const handleScrub = (e, v) => {
    setActive(true);
    setProgress(v);
    dispatch({
      type: 'OVERRIDE_TIME',
      time: v,
    });
    dispatch({
      type: 'FREEZE',
    });
  };

  const handleScrubEnd = () => {
    setActive(false);
    dispatch({
      type: 'UNFREEZE',
    });
  };

  return (
    <div
      className={classes.root}
      onMouseOver={() => { setHover(true); }}
      onMouseOut={() => { setHover(false); }}
    >
      <Slider
        disabled={disabled}
        ref={slider}
        step={1}
        min={0}
        max={media.duration}
        value={progress}
        onChange={handleScrub}
        onChangeCommitted={handleScrubEnd}
        className={clsx(classes.progBar, focus ? classes.progBarMax : classes.progBarMin)}
        ValueLabelComponent={ValueLabelComponent}
      />
    </div>
  );
};

export default withStyles(styles, { name: 'PLProgressBar' })(ProgressBar);
