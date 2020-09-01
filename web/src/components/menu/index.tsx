import React, { useCallback, useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";


import {
  Badge,
  Popover,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  Grow,
  MenuItem,
  ThemeProvider,
  Avatar,
  Button,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddCircleIcon from '@material-ui/icons/AddCircle';

import theme2 from "../../assets/theme/themeconfig";

import { HOME, LOGIN, CHAMPIONSHIPS } from "../../routes";

import {
  getTokenAuthCookie,
  existsAuthCookie,
  deleteAuthCookie,
} from "../../utils/cookiesHandler";

const { user_id, role } = getTokenAuthCookie();

let options = [
  {
    text: "Crear campeonato",
    route: { pathname: HOME },
  },
  {
    text: "Campeonatos",
    route: { pathname: CHAMPIONSHIPS },
  },
];

if (role == "1") {
  // options.push({ text: "Parches pendientes", route: { pathname: APPROVED } });
  //  options.push({ text: "Dashboard", route: { pathname: DASHBOARD } });
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      margin: "auto",
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    atutomatic: {
      flexGrow: 1,
    },
  })
);

const Menu = ({ handleOpen, setOpenModal }: any) => {
  let dataAuth: any = {};

  if (existsAuthCookie()) {
    /* get user id */
    dataAuth = getTokenAuthCookie();
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [dataPatch, setDataPatch] = useState([]);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const [openModal, setOpenModal] = useState(false);
  const [opens, setOpens] = useState({} as any);
  const [userName, setUserName] = useState("");
  const [openAvatar, setOpenAvatar] = useState(false);
  const history = useHistory();
  const avatarRef = useRef();

  const handleClick = (route: any, id?: number) => () => {
    !id && history.push(route);
    !!id && setOpens({ ...opens, [id]: !opens[id] });
  };
  const { pathname } = history.location;

  useEffect(() => {
    let newValue = {};
    options.forEach((m, i) => Object.assign(newValue, { [i]: false }));
    setOpens(newValue);
    if (existsAuthCookie()) {
      const { name } = getTokenAuthCookie();
      setUserName(name as string);
    }
  }, []);
  const handleLogout = useCallback(() => {
    deleteAuthCookie();
    window.location.href = LOGIN;
  }, []);

  const handleClickPopover = (event: any) => {
    console.log("handleClickPopover");
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    console.log("handleClosePopover");
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
  return (
    <ThemeProvider theme={theme2}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.atutomatic} variant="subtitle1" noWrap>
              {dataAuth.role === "1" ? "Admin: " : "Player: "} {dataAuth.name}
            </Typography>
            <div style={{ padding: "0px 10px", color: "#b0b3b8" }}>
              <a aria-describedby={id} onClick={handleClickPopover}>
                <Badge
                  color="secondary"
                  badgeContent={dataPatch.length}
                  style={{
                    margin: "0px 10px",
                    cursor: "pointer",
                  }}
                >
                  {/* <NotificationsIcon aria-label=""></NotificationsIcon> */}
                </Badge>
              </a>
              <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {/* <div className="notiPopover"> */}
                <List style={{ height: "400px" }}>
                  {dataPatch.map((m, i) => {
                    const { post_title = "", ID } = m;
                    return (
                      <ListItem
                        button
                        key={`ListItem-${i}`}
                        // selected={isRouteSelected(m.route, pathname)}
                        onClick={() => {}}
                        classes={{
                          selected: "item-route-selected",
                        }}
                      >
                        <Link
                          to={{
                            pathname: "/mis-parches-personas",
                            state: { id_parch: ID },
                          }}
                        >
                          <ListItemText
                            primary={post_title}
                            secondary="Rechazado"
                            className="item-route-text"
                          />
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
                {/* </div> */}
              </Popover>
              <a onClick={setOpenModal} style={{cursor:'pointer'}}>
                <AddCircleIcon
                  style={{
                    margin: "0px 10px",
                    cursor: "pointer",
                  }}
                ></AddCircleIcon> Campeonato
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <div style={{ textAlign: "center" }}>
            <Avatar
              className={classes.large}
              innerRef={avatarRef}
              onClick={() => setOpenAvatar(true)}
            >
              {userName[0]}
            </Avatar>
            <b className="username">
              {JSON.stringify(userName).replace('"', "").replace('"', "")}
            </b>
            <FloatMenu
              anchorRef={avatarRef}
              open={openAvatar}
              onClose={() => setOpenAvatar(false)}
              onLogout={handleLogout}
            />
          </div>
          <Divider />
          <List>
            {options.map((m, i) => (
              <ListItem
                button
                key={`ListItem-${m.route}-${i}`}
                // selected={isRouteSelected(m.route, pathname)}
                onClick={handleClick(m.route, undefined)}
                classes={{
                  selected: "item-route-selected",
                }}
              >
                <ListItemText primary={m.text} className="item-route-text" />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button key={`item-final-salir`} onClick={handleLogout}>
              <ListItemText primary={`Salir`} />
            </ListItem>
          </List>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    </ThemeProvider>
  );
};

const FloatMenu = ({
  anchorRef,
  open,
  onClose,
  onLogout,
}: {
  anchorRef: any;
  open: boolean;
  onClose: (event: React.MouseEvent<Document>) => void;
  onLogout: () => void;
}) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      placement="right"
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow">
                <MenuItem onClick={onLogout}>Salir</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
export default Menu;
