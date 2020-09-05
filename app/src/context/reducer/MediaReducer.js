export const SET_TIME = (state, action) => ({
  ...state,
  time: action.time,
});

export const OVERRIDE_TIME = (state, action) => ({
  ...state,
  timeOverride: action.time,
});
