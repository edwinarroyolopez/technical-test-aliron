import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  existsAuthCookie,
  getTokenAuthCookie,
} from "../../utils/cookiesHandler";
import GameContext from "../../context/game.context";

import { PASSWORD_UPDATE } from "../../graphql/mutation/user.mutation";

import { HOME } from "../../routes";

import {
  Button,
  ThemeProvider,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import theme2 from "../../assets/theme/themeconfig";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import "../../assets/sass/properties.sass";
//import "../../assets/sass/statitics.sass";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "25em",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SettingPassword = ({ history }: any) => {
  const classes = useStyles();

  let user_id = "";
  let dataAuth: any = {};

  if (existsAuthCookie()) {
    /* get user id */
    dataAuth = getTokenAuthCookie();
    user_id = dataAuth.user_id || "";
  }

  const { state, dispatch } = useContext(GameContext);
  const [passwordUpdate] = useMutation(PASSWORD_UPDATE);

  const [credentials, setCredentials] = useState<{
    user_id?: string;
    password?: string;
  }>({ user_id: user_id, password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (key: string) => ({ target: { value } }: any) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleSubmit = async () => {
    const { user_id, password } = credentials;

    console.log("credentials: ", credentials);
    if (password === "") {
      alert(`Es necesario que coloques la contraseña`);
    } else {
      try {
        const {
          data: { user: passwordUpdated },
        } = await passwordUpdate({
          variables: {
            variables: { user_id, password },
          },
        });

        console.log("passwordUpdated: ", passwordUpdated);
        if (passwordUpdated) {
          alert(`La contraseña se ha configurado con éxito`);
          setTimeout(() => {
            history.push(HOME);
          }, 400);
        }

        //  dispatch({ type: "LOGIN", user });
      } catch (error) {
        console.error({ error });
        alert(error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={theme2}>
      <div id="container_data_complete">
        <div id="container_form">
          <br />
          <div className="container-copy">
            <h5>
              <b>Hola, {dataAuth.name ? dataAuth.name : null}</b>
            </h5>
            <p>Configura una contraseña para los inicios de sesión.</p>
            <br />
          </div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel
              htmlFor="outlined-adornment-password"
              shrink
              style={{ background: "white", padding: "0 .25rem" }}
            >
              Contraseña
            </InputLabel>
            <OutlinedInput
              name="password"
              id="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              value={credentials.password}
              onChange={handleInputChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            // onClick={context.createGame}
          >
            ESTABLECER CONTRASEÑA
          </Button>
          <br />
        </div>
      </div>

      <br />
    </ThemeProvider>
  );
};

export default SettingPassword;
