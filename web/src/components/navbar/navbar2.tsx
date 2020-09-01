import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../../assets/theme/themeconfig";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    offset: theme.mixins.toolbar,
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
})
);

const Navbar2 = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            
                <AppBar className={classes.appBar} position="static" color="primary">
                    <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
             
        </ThemeProvider>
    );
}

export default Navbar2
