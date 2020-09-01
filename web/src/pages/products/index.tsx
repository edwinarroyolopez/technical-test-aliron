import React, { useState, useEffect } from "react";

import {
  Card,
  TextField,
  Button,
  ThemeProvider,
  Avatar,
  IconButton,
} from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";
import ClearIcon from "@material-ui/icons/Clear";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import theme2 from "../../assets/theme/themeconfig";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import "../../assets/sass/products.sass";
//import "../../assets/sass/statitics.sass";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "20em",
    },
    small: {
      background: "#2e3638",
      fontSize: theme.spacing(1.5),
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
      textAlign: "center",
      justifyContent: "center",
    },
    input: {
      background: "rgba(255,255,255,0.5)",
      "&::placeholder": {
        fontStyle: "italic",
      },
    },
    label: {
      "&::placeholder": {
        fontStyle: "italic",
      },
    },
  })
);

const CreateRoom = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme2}>
      <Card>
        <div id="container_wish_list">
          <div className="container-products">
            <br/>
            <div className="products">
              <div className="item">
                <div className="item-image">{/* <b> header </b> */}</div>
                <div className="item-detail">
                  <b>Kit 1</b>
                  <br />
                  Producto 1
                  <br />
                  Producto 2
                  <br />
                  Producto 3
                  <br />
                  <br />
                  Añadir a lista
                  <br />
                  Ver detalles
                </div>
              </div>
              <div className="item">
                <div className="item-image"></div>
                <div className="item-detail">
                  Kit 1
                  <br />
                  Kit 1
                </div>
              </div>
              <div className="item">
                <div className="item-image"></div>
                <div className="item-detail">
                  Kit 1
                  <br />
                  Kit 1
                </div>
              </div>
              <div className="item">
                <div className="item-image"></div>
                <div className="item-detail">
                  Kit 1
                  <br />
                  Kit 1
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="container_primary_form">
          <br />
          <label htmlFor="">
            <b>¿Quieres otro regalo?</b>
            <br /> <br />
            <p>
              Ingresa a{" "}
              <a href="https://www.oboticario.co">www.oboticario.co</a> y copia
              aquí la url de los productos que quieres guardar en la lista de
              tus regalos favoritos
            </p>
          </label>
          <div className="field">
            <Field
              type="input"
              label="Opción 1"
              value={""}
              onChange={() => {}}
            />
          </div>
          <br />
          <div className="field">
            <Field
              type="input"
              label="Opción 1"
              value={""}
              onChange={() => {}}
            />
          </div>
          <br />

          <Button
            color="primary"
            component="span"
            startIcon={<PersonAddIcon />}
          >
            Agregar opción
          </Button>
          <br />
          <Button color="primary" variant="contained">
            GUARDAR LISTA
          </Button>
        </div>
        <br />
      </Card>
    </ThemeProvider>
  );
};

export default CreateRoom;

const Field = ({ children, type, label, value, options, onChange }: any) => {
  const classes = useStyles();

  if (type === "input") {
    return (
      <TextField
        label={label}
        variant="outlined"
        size="small"
        value={value ? value : ""}
        fullWidth
        margin="none"
        InputLabelProps={{
          className: classes.input,
        }}
        InputProps={{
          classes: { input: classes.input },
        }}
        onFocus={() => {}}
        onBlur={() => {}}
        onChange={onChange}
      />
    );
  }
  return (
    <TextField
      select
      variant="outlined"
      label={label}
      size="small"
      margin="none"
      value={value ? value : ""}
      onChange={onChange}
      fullWidth
      SelectProps={{
        native: true,
        className: classes.input,
      }}
      InputLabelProps={{
        className: classes.input,
      }}
      InputProps={{
        classes: { input: classes.input },
      }}
    >
      {options.map((o: any, index: any) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </TextField>
  );
};

const Item = ({ children, title, description }: any) => (
  <div className="item-detail">
    <div className="item-icon">{children}</div>
    <div>
      <div className="item-title">{title}</div>
      <div className="item-description">{description}</div>
    </div>
  </div>
);
