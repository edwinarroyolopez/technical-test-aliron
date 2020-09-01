import React, { useState, useEffect, useContext } from "react";
import {
  getUserToActivateCookie,
  existsUserToActivateCookie,
  deleteUserToActivateCookie,
} from "../../utils/cookiesHandler";
import { useMutation } from "@apollo/react-hooks";
import {
  Avatar,
  Box,
  Grid,
  CssBaseline,
  Button,
  TextField,
  Paper,
  Typography,
} from "@material-ui/core";

import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

import { makeStyles } from "@material-ui/core/styles";

import { ACTIVATE_USER } from "../../graphql/mutation/user.mutation";

import { HOME, SETTING_PASSWORD } from "../../routes";
import { Link } from "react-router-dom";

import GameContext from "../../context/game.context";

import "../../assets/sass/login.sass";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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

const Activate = ({ history, onLoggedChange }: any) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(GameContext);

  let defaultData = { user_id: 0, confirmationCode: "", name: "" };
  if (existsUserToActivateCookie()) {
    /* set default state with data generated on signup */
    let userToActivate: any = getUserToActivateCookie();
    defaultData.user_id = userToActivate.user_id;
    defaultData.name = userToActivate.name;
  }

  const [data, setData] = useState<{
    user_id?: number;
    confirmationCode?: string;
    name?: string;
  }>(defaultData);

  const [activateUser] = useMutation(ACTIVATE_USER);

  useEffect(() => {
    console.log("state: ", state);
    console.log("dispatch: ", dispatch);
    console.log("getUserToActivateCookie: ", getUserToActivateCookie());
    console.log("existsUserToActivateCookie: ", existsUserToActivateCookie());
  }, []);

  const handleInputChange = (key: string) => ({ target: { value } }: any) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = async () => {
    const { user_id, confirmationCode }: any = data;

    if (confirmationCode === "") {
      alert(`Es necesario que llenes todos los campos`);
    } else {
      try {
        const {
          data: { user: userActivated },
        } = await activateUser({
          variables: {
            variables: {
              user_id,
              confirmationCode,
            },
          },
        });

        if (userActivated) {
          deleteUserToActivateCookie(); /* clear cookie to used to activate */

          dispatch({ type: "LOGIN", user: userActivated });
          const { token } = userActivated;

          if (token) {
            setTimeout(() => {
              onLoggedChange(true);
              history.push(SETTING_PASSWORD);
            }, 400);
          }
        }
      } catch (error) {
        console.error({ error });
        let message = error.message.replace("GraphQL error:", "");
        alert(message);
      }
    }
  };

  if (!existsUserToActivateCookie()) {
    /* redirect to home */
    history.push(HOME);
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item sm={4} md={7} className={classes.image}>
          <Typography component="h1" variant="h5">
            MI COPY => ACTIVATE
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ConfirmationNumberIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresa el código de confirmación
            </Typography>
            <br />
            <Typography variant="subtitle1" gutterBottom>
              Ya casi terminas, hemos mandado un código de confirmación a tu
              email y a tu teléfono, por favor ingrésalo para finalizar la
              activación de tu cuenta
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="number"
                id="confirmationCode"
                label="Coódigo de confirmación"
                name="confirmationCode"
                autoComplete="confirmationCode"
                autoFocus
                value={data.confirmationCode}
                onChange={handleInputChange("confirmationCode")}
              />
              <br />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                // onClick={context.createGame}
              >
                ACTIVAR CUENTA
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">¿Ya tienes una cuenta? Iniciar sesión</Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Activate;

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        localhost
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
