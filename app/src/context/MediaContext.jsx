import React, { useReducer, createContext, useEffect } from 'react';

// reducer
const mediaReducer = (state, action) => {
  switch (action.type) {
    case 'INC_SPEED':
      // Notify
      return {
        ...state,
        speed: state.speed + 0.25,
      };
    case 'SET_TIME':
      return {
        ...state,
        time: action.time,
      };
    case 'OVERRIDE_TIME':
      return {
        ...state,
        timeOverride: action.time,
      };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        mute: !state.mute,

      };
    case 'SET_MEDIA_INFO':
      return {
        ...state,
        media: {
          ...state.media,
          duration: action.duration,
        },
      };
    case 'TOGGLE_FULLSCREEN':
      window.winAction.setFullscreen(!state.fullscreen);
      return {
        ...state,
        fullscreen: !state.fullscreen,
      };
    case 'SET_VOLUME':
      return {
        ...state,
        mute: false,
        volume: action.volume,
      };
    case 'TOGGLE_PLAYBACK':
      return {
        ...state,
        play: !state.play,
      };
    case 'SET_SRC':
      const name = action.src.split(/[\\/]/).pop();
      return {
        ...state,
        src: action.src,
        play: true,
        disabled: false,
        title: name,
        timeOverride: 0,
        media: {
          ...state.media,
          src: action.src,
          title: name,
        },
      };
    case 'FREEZE':
      return { ...state, forcePause: true };
    case 'UNFREEZE':
      return { ...state, forcePause: false };
    case 'CLEAR_MEDIA':
      return {
        ...state,
        time: 0,
        play: false,
        disabled: true,
        media: {
          src: '',
          title: '',
          duration: 1,
        },
      };
    case 'RESET_OVERRIDE':
      return { ...state, timeOverride: null };
    default:
      return state;
  }
};

const initialState = {
  media: {
    src: '',
    title: '',
    duration: 0,
  },
  time: 0,
  timeOverride: null,
  forcePause: false,
  play: false,
  volume: 1,
  speed: 1,
  mute: false,
  tracks: '',
  fullscreen: false,
  disabled: true,
};

// create context
const MediaContext = createContext();

const MediaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState);

  // useEffect(() => {
  //     window.loader.getFile().then((res) => {
  //         console.log(res);
  //         if (false) {
  //             dispatch({
  //                 type: 'SET_SRC',
  //                 src: ''
  //             })
  //         }

  //     }).catch((err) => {
  //         console.log(err);
  //     });
  // }, [])

  // Electron main process key press handlers
  useEffect(() => {
    window.winAction.on('Keypress', (key) => {
      switch (key) {
        case 'g':
          dispatch({
            type: 'TOGGLE_FULLSCREEN',
          });
          break;
        case 'space':

          break;
        default:
          break;
      }
    });
  }, []);

  const value = { state, dispatch };
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

// export
export { MediaContext, MediaProvider };
