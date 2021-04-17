import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#f5deb3",
    },
    text: {
      light: "#333333",
      primary: "#333333",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
      containedPrimary: {
        backgroundColor: "#333333",
        color: "white",
        padding: "10px 20px",
      },
    },
    MuiTextField: {},
    MuiOutlinedInput: {
      root: {
        background: "#F7F7F7",
        borderRadius:5,

        "& fieldset": {
          borderColor: "#E6E6E6",
        },
      },
    },
    MuiTypography:{
        root:{
            color: "#222",
        }
    }
  },
});

export default theme;
