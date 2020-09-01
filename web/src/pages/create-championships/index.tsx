import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";

import {
  Card,
  TextField,
  Button,
  ThemeProvider,
  CardHeader,
} from "@material-ui/core";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers/";

import { CREATE_CHAMPIONSHIP } from "../../graphql/mutation/championship.mutation";
import { CHAMPIONSHIPS } from "../../routes";

import {
  existsAuthCookie,
  getTokenAuthCookie,
} from "../../utils/cookiesHandler";
import { TeamsQuantity, Awards } from "../../data/data";
import GameContext from "../../context/game.context";

import theme2 from "../../assets/theme/themeconfig";

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
  const [createChampionship] = useMutation(CREATE_CHAMPIONSHIP);
  // const [state, setState] = useState<{ [key: string]: any }>({});
  const { state, dispatch } = useContext(GameContext);
  const [data, setData] = useState<{
    user_id: string;
    start_date: string;
    end_date: string;
    title: string;
    teams_quantity: string;
    award: string;
  }>({
    user_id: user_id,
    start_date: today,
    end_date: today,
    title: "",
    teams_quantity: "",
    award: "",
  });

  const history = useHistory();

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
    const {
      user_id,
      start_date,
      end_date,
      title,
      teams_quantity,
      award,
    } = data;

    console.log("data: ", data);

    if (
      user_id === "" ||
      start_date === "" ||
      end_date === "" ||
      title === "" ||
      award === "" ||
      teams_quantity === ""
    ) {
      alert(`Es necesario que llenes todos los campos`);
    } else {
      try {
        const {
          data: { championship: championshipCreated },
        } = await createChampionship({
          variables: {
            championship: {
              user_id,
              start_date,
              end_date,
              title,
              teams_quantity,
              award,
            },
          },
        });

        console.log("championshipCreated: ", championshipCreated);

        if (championshipCreated) {
          alert(`Campeonato creado correctamente`);
          history.push(CHAMPIONSHIPS);
        }
      } catch (error) {
        console.error({ error });
        let message = error.message.replace("GraphQL error:", "");
        alert(message);
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
                value={data.teams_quantity}
                onChange={handleDataChange("teams_quantity")}
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
                  value={data.start_date}
                  onChange={handleDateChange("start_date")}
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
                  value={data.end_date}
                  onChange={handleDateChange("end_date")}
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
      {options.map((o: any) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </TextField>
  );
};
