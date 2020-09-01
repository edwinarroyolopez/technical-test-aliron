import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    top: "10%",
    left:'10%',
    overflow:'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
    
  }
}));

const TransitionsModal: React.FunctionComponent<{
  open: boolean;
  onClose?: Function;
  keepMounted?: boolean;
  disableAutoFocus?: boolean;
}> = ({ children, open, onClose, keepMounted, disableAutoFocus }:any) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose as any}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      disableScrollLock={true}
      keepMounted={keepMounted}
      disableAutoFocus={disableAutoFocus}
    >
      <Fade in={open}>
        { children }
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
