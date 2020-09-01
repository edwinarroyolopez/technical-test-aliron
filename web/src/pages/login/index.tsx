import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  IconButton,
  Button,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Avatar from "@material-ui/core/Avatar";

import CssBaseline from "@material-ui/core/CssBaseline";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { LOGIN_USER } from "../../graphql/query/user.query";

import { HOME } from "../../routes";
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

const Login = ({ history, onLoggedChange }: any) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(GameContext);
  // const history = useHistory();

  const [credentials, setCredentials] = useState<{
    email?: string;
    phone?: string;
    password?: string;
    code?: string;
  }>({ email: "", phone: "", password: "", code: "" });

  const [showPassword, setShowPassword] = useState(false);

  const { refetch: Login, error, loading }: any = useQuery(LOGIN_USER, {
    skip: true,
  });

  useEffect(() => {
    console.log("state: ", state);
    console.log("dispatch: ", dispatch);
  }, []);

  const handleInputChange = (key: string) => ({ target: { value } }: any) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleSubmit = async () => {
    const { email, phone, password, code } = credentials;

    console.log("credentials: ", credentials);
    if (email === "" || password === "") {
      alert(`Es necesario que llenes todos los campos`);
    } else {
      try {
        const {
          data: { user },
        } = await Login({
          variables: { email, phone, password, code },
        });

        console.log("user: ", user);

        dispatch({ type: "LOGIN", user });

        const { token } = user;

        if (token) {
          setTimeout(() => {
            onLoggedChange(true);
            history.push(HOME);
            //window.location.href = "/";
          }, 400);
        }
      } catch (error) {
        console.error({ error });
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item sm={4} md={7} className={classes.image}>
          <Typography component="h1" variant="h5">
            MI COPY - LOGIN
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicio de sesión
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={handleInputChange("email")}
              />
              <br />
              <br />
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

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              // onClick={context.createGame}
              >
                INICIAR SESIÓN
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/">¿Olvidaste la contraseña?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">{"¿No tienes cuenta? Registrate"}</Link>
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

export default Login;

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
