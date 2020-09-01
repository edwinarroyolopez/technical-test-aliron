import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import {
  Card,
  TextField,
  Button,
  ThemeProvider,
  IconButton,
  CardHeader,
} from "@material-ui/core";

import CancelIcon from "@material-ui/icons/Cancel";
import ClearIcon from "@material-ui/icons/Clear";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers/";

import {
  existsAuthCookie,
  getTokenAuthCookie,
} from "../../utils/cookiesHandler";
import { TeamsQuantity, Awards } from "../../data/data";
import GameContext from "../../context/game.context";

import theme2 from "../../assets/theme/themeconfig";

//import "../../assets/sass/properties.sass";

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

const today = moment().format("L");

let user_id = "";
let dataAuth: any = {};

if (existsAuthCookie()) {
  /* get user id */
  dataAuth = getTokenAuthCookie();
  user_id = dataAuth.user_id || "";
}

const CreateChampionship = () => {
  // const [state, setState] = useState<{ [key: string]: any }>({});
  const { state, dispatch } = useContext(GameContext);
  const [data, setData] = useState<{
    user_id: string;
    startDate: string;
    endDate: string;
    title: string;
    teamsQuantity: string;
    award: string;
  }>({
    user_id: user_id,
    startDate: today,
    endDate: today,
    title: "",
    teamsQuantity: "",
    award: ""
  });

  useEffect(() => {
    console.log("context - state: ", state);
  }, []);

  const handleDateChange = (key: string) => (value: any) => {
    value = moment(value).format("L");
    setData({ ...data, [key]: value });
  };

  const handleDataChange = (key: string) => ({ target: { value } }: any) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = async () => {
    const { user_id, startDate, endDate, title, teamsQuantity, award } = data;

    console.log("data: ", data);

    if (user_id === "" || teamsQuantity === "") {
      alert(`Es necesario que llenes todos los campos`);
    } else {
      try {
        // const {
        //   data: { user },
        // } = await Login({
        //   variables: { email, phone, password, code },
        // });
        // console.log("user: ", user);
        //        dispatch({ type: "LOGIN", user });
      } catch (error) {
        console.error({ error });
        alert(error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={theme2}>
      <Card>
        <div id="container_primary_form">
          <br />
          <CardHeader
            style={{ background: "#2e363847" }}
            title="Creando un nuevo campeonato"
            subheader="Es importante que coloques correctamente todos los campos para gestionar correctamente el campeonato"
          />
          <br />
          <div className="content-fields">
            <div className="field">
              <Field
                type="input"
                label="Nombre del campeonato"
                value={data.title}
                onChange={handleDataChange("title")}
              />
            </div>
            <div className="field">
              <Field
                label="Cantidad de equipos"
                options={TeamsQuantity}
                value={data.teamsQuantity}
                onChange={handleDataChange("teamsQuantity")}
              />
            </div>
          </div>
          <br />
          <div className="content-fields">
            <div className="field">
              <Field
                label="Premio $"
                options={Awards}
                value={data.award}
                onChange={handleDataChange("award")}
              />
            </div>
          </div>
          <div className="content-fields">
            <div className="field">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ width: "100%" }}
                  margin="normal"
                  format="dd/MM/yyyy"
                  label="Fecha de inicio"
                  value={data.startDate}
                  onChange={handleDateChange("startDate")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="field">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ width: "100%" }}
                  margin="normal"
                  format="dd/MM/yyyy"
                  label="Fecha de finalización"
                  value={data.endDate}
                  onChange={handleDateChange("endDate")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <br />
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            CREAR CAMPEONATO
          </Button>
        </div>
        <br />
        <br />
      </Card>
    </ThemeProvider>
  );
};

export default CreateChampionship;

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
        onFocus={() => { }}
        onBlur={() => { }}
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
      {options.map((o: any) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </TextField>
  );
};
