import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  Avatar,
  Box,
  Grid,
  CssBaseline,
  FormControlLabel,
  Button,
  TextField,
  Paper,
  Radio,
  Typography,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import { SINUP_USER } from "../../graphql/mutation/user.mutation";

import { ACTIVATE } from "../../routes";
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

const Signup = ({ history }: any) => {
  const classes = useStyles();

  const { state, dispatch } = useContext(GameContext);

  const [data, setData] = useState<{
    role?: string;
    name?: string;
    email?: string;
    phone?: string;
  }>({ role: "0", name: "", email: "", phone: "" });

  const [signupUser] = useMutation(SINUP_USER);

  useEffect(() => {
    console.log("state: ", state);
    console.log("dispatch: ", dispatch);
  }, []);

  const handleInputChange = (key: string) => ({ target: { value } }: any) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = async () => {
    const { role, name, email, phone } = data;

    console.log("data: ", data);

    //return false;

    if (role === "" || name === "" || email === "" || phone === "") {
      alert(`Es necesario que llenes todos los campos`);
    } else {
      try {
        const {
          data: { user: userCreated },
        } = await signupUser({
          variables: {
            user: { role, name, email, phone },
          },
        });

        console.log("userCreated: ", userCreated);
        if (userCreated) {
          // redirect to page where finish signup with code
          dispatch({ type: "SIGNUP", user: userCreated });
          setTimeout(() => {
            history.push(ACTIVATE);
          }, 400);

          alert(`Usuario creado correctamente`);
        }
      } catch (error) {
        console.error({ error });
        let message = error.message.replace("GraphQL error:", "");
        alert(message);
      }
    }
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item sm={4} md={7} className={classes.image}>
          <Typography component="h1" variant="h5">
            MI COPY => SIGNUP
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registrarse
            </Typography>
            <form className={classes.form} noValidate>
              <Grid className="wrap-input2 validate-input">
                <FormControlLabel
                  value="0"
                  control={
                    <Radio
                      checked={data.role === "0"}
                      onChange={handleInputChange("role")}
                      style={{ color: "primary" }}
                    />
                  }
                  label="Player"
                />
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      checked={data.role === "1"}
                      onChange={handleInputChange("role")}
                      style={{ color: "primary" }}
                    />
                  }
                  label="Admin"
                />
              </Grid>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nombre"
                name="name"
                autoComplete="name"
                autoFocus
                value={data.name}
                onChange={handleInputChange("name")}
              />
              <br />
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
                value={data.email}
                onChange={handleInputChange("email")}
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Teléfono"
                name="phone"
                autoComplete="phone"
                autoFocus
                value={data.phone}
                onChange={handleInputChange("phone")}
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
                REGISTRARME
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

export default Signup;

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
