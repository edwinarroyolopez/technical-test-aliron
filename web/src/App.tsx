import React, { useState, useEffect, useContext } from "react";
import { Modal, ThemeProvider } from "@material-ui/core";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import theme2 from "./assets/theme/themeconfig";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Activate from "./pages/activate";

import CreateChampionships from "./pages/create-championships";
import Championships from "./pages/championships";
import SettingPassword from "./pages/setting-password";
import Products from "./pages/products";
//import Pending from "./pages/group-members";

import Menu from "./components/menu";

/* components */
import {
  existsAuthCookie,
  getTokenAuthCookie,
  deleteAuthCookie,
} from "./utils/cookiesHandler";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//#region apollo
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import {  ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

import {
  HOME,
  LOGIN,
  SIGNUP,
  ACTIVATE,
  SETTING_PASSWORD,
  CHAMPIONSHIPS,
} from "./routes";


import GameContext from "./context/game.context";
import GameState from "./context/game.provider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      boxShadow: theme.shadows[5],
      minWidth: "450px",
      border: "2px solid #000",
      height: "90vh",
      width: "80vw",
      margin: "auto",
      position: "absolute",
      backgroundColor: "#fff",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
    },
  })
);

let API_GRAPHQL = "http://localhost:7000/api";
let env = process.env.REACT_APP_ENV;

switch (env) {
  case "prod":
    API_GRAPHQL = "http://localhost:7000/api"; /* gcp test */
    break;
  case "test":
    API_GRAPHQL = "http://localhost:7000/api"; /* hostinger */
    break;
  default:
    break;
}

const httpLink = createUploadLink({ uri: API_GRAPHQL });
const authLink = setContext((_, { headers = {} }) => {
  const { tokenUser } = getTokenAuthCookie();
  return {
    headers: {
      ...headers,
      authorization: tokenUser ? `Bearer ${tokenUser}` : "",
    },
  };
});

const logoutLink = onError(({ networkError }: any) => {
  if (networkError && networkError.statusCode === 403) {
    deleteAuthCookie();
    window.location.href = "/";
  }
});

const allHttpLinks = ApolloLink.from([authLink, logoutLink.concat(httpLink)]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: allHttpLinks,
});

const { user_id, role } = getTokenAuthCookie();

const App = (props: any) => {
  const context = useContext(GameContext); /* trying context */

  useEffect(() => {
    console.log("context: ", context);
  }, []);

  const [logged, setLogged] = useState(existsAuthCookie());
  const classes = useStyles();

  let gp = localStorage.getItem("gp");
  let modalInit = true;
  gp && gp === "1" ? (modalInit = false) : (modalInit = true);
  const [open, setOpen] = React.useState(modalInit);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    localStorage.setItem("gp", "1");
    setOpen(false);
  };

  useEffect(() => {
    if (logged) {
      console.log("User logged");
    }
  }, [window.location.pathname]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme2}>
        <GameState>
          <BrowserRouter>
            <div id="main-container">
              {logged ? (
                <LayoutApp handleOpen={handleOpen} setOpen={setOpen} />
              ) : (
                <Switch>
                  <Route
                    exact
                    path={LOGIN}
                    render={(props) => (
                      <Login onLoggedChange={setLogged} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path={SIGNUP}
                    render={(props) => (
                      <Signup onLoggedChange={setLogged} {...props} />
                    )}
                  />
                  <Route
                    exact
                    path={ACTIVATE}
                    render={(props) => (
                      <Activate onLoggedChange={setLogged} {...props} />
                    )}
                  />
                  <Route render={() => <Redirect to={LOGIN} />} />
                </Switch>
              )}

              {logged && (
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={{}} className={classes.paper}>
                    <CreateChampionships></CreateChampionships>
                  </div>
                </Modal>
              )}
            </div>
          </BrowserRouter>
        </GameState>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const LayoutApp = ({ handleOpen, setOpen }: any) => {
  return (
    <>
      <Menu handleOpen={handleOpen} setOpenModal={setOpen} />
      <>
        <Switch>
          <Route exact path={HOME} component={CreateChampionships} />
          {/* <Route exact path={CHAMPIONSHIPS} component={Championships} /> */}
          <Route exact path={CHAMPIONSHIPS} component={Championships} />

          <Route
            exact
            path={SETTING_PASSWORD}
            render={(props) => <SettingPassword {...props} />}
          />

          {user_id && role == "1" ? <></> : null}
        </Switch>
      </>
    </>
  );
};
export default App;
