import palette from './palette'
import { ThemeProvider } from '@material-ui/core'

const overrides = {
    MuiIconButton: {
        root: {
            height: '48px',
            color: palette.text.primary,
            '&:hover': {
                color: palette.primary.main,
            }
        }
    },
    MuiCollapse: {
        container: {
            width: '0px',
            transitionProperty: 'width',
            overflow: 'hidden',
        },
        entered: {
            width: '100%'
        },
        hidden: {
            width: '0px'
        }
    },
    MuiListItemIcon: {
        root: {
            minWidth: '32px'
        }
    },
    MuiMenu: {
        paper: {
            background: palette.background.default
        }
    },
    MuiSnackbar: {
        anchorOriginTopRight: {
            top: '50px !important'
        }
    },
    MuiSnackbarContent: {
        root: {
            backgroundColor: palette.background.transparent,
            color: palette.text.primary
        }
    }

    // .MuiCollapse-container {
    //     width: 0px;
    //    transition-property: width;
    //   }

    //   .MuiCollapse-entered {
    //     width: 100%
    //   }

    //   .MuiCollapse-hidden {
    //     width: 0px
    //   }
}

export default overrides