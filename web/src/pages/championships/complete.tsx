import React, { useEffect, useState, CSSProperties, useCallback } from "react";
// import useDirection from '../../utils/useDirection';

import { useMutation } from "@apollo/react-hooks";

import Paper from "@material-ui/core/Paper";

import { TextareaAutosize, TextField, Button } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import EmailIcon from "@material-ui/icons/Email";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "20em",
      // maxWidth: 345,
    },
    media: {
      height: 140,
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

const Complete: React.SFC<{
  detail?: [{ [key: string]: any }] | any;
  refresh?: boolean;
}> = ({ detail, refresh }) => {
  const classes = useStyles();

  const [teams, setTeams] = useState<{ [key: string]: any }>([]);
  // const [state, setState] = useState<{ [key: string]: any }>(owner_data);

  const handleSendMessage = async () => {};

  const handleInputChange = (key: string) => ({ target: { value } }: any) => {
    setTeams({ ...teams, [key]: value });
  };

  return (
    <>
      <Paper className="form-property-container">
        <div className="container-forms">
          <div id="info-users">
            <div style={{ padding: "10px 0px" }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <b>Campeonato</b>
                </Typography>
                <Typography color="textSecondary">{detail.title}</Typography>
                <div id="container-product" className="">
                  <div className="product-item">
                    <div className="details-product">
                      <Item
                        title="Campeonato"
                        description={detail.title}
                      ></Item>
                      <Item
                        title="Fecha de inicio"
                        description={detail.start_date}
                      ></Item>
                      <Item
                        title="Fecha fin"
                        description={detail.end_date}
                      ></Item>
                      <Item title="Premio" description={detail.award}></Item>
                      <Item
                        title="Equipos"
                        description={detail.teams_quantity}
                      ></Item>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>

            <CardContent>
              <div id="container-property" className="">
                <div className="property-item">
                  <Typography variant="subtitle1" gutterBottom>
                    <b>Equipos</b>
                  </Typography>
                  <Typography color="textSecondary">{detail.title}</Typography>
                  <br />
                </div>

                {/* {detail.teams_quantity} */}
                {detail.teams_quantity ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    {[...Array(parseInt(detail.teams_quantity))].map((e, i) => (
                      <FieldTeam
                        value={teams[`player_${i}`]}
                        onChange={handleInputChange(`player_${i}`)}
                        key={i}
                      >
                        {i}
                      </FieldTeam>
                    ))}
                  </div>
                ) : null}
                <Button
                  onClick={()=> {console.log('teams: ', teams)}}
                  color="primary"
                  startIcon={<PlayCircleFilledWhiteIcon />}
                >
                  INICIAR TORNEO
                </Button>
              </div>
            </CardContent>
            <br />
          </div>
          <br />
        </div>
      </Paper>
    </>
  );
};

export default Complete;

const Item = ({ children, title, description }: any) => (
  <div className="item-detail">
    <div className="item-icon">{children}</div>
    <div>
      <div className="item-title">{title}</div>
      <div className="item-description">{description}</div>
    </div>
  </div>
);

const FieldTeam = ({ children, title, description, value, onChange }: any) => (
  <div className="container_field_team" style={{ maxWidth: "20em" }}>
    Equipo: {children}
    <div
      className="content-fields"
      style={{ minWidth: "20em", display: "flex", flexDirection: "column" }}
    >
      <div className="field" style={{ margin: "0 1em" }}>
        <Field
          type="input"
          label="Jugador"
          value={value ? value : ""}
          onChange={onChange}
        />
      </div>
      <br />
      <div className="field" style={{ margin: "0 1em" }}>
        <Field
          type="input"
          label="Email"
          value={""}
          // onChange={handleDataChange("title")}
        />
      </div>
      <Button
        // onClick={handleOpenComplete}
        color="primary"
        startIcon={<EmailIcon />}
      >
        ENVIAR NOTIFICACION
      </Button>
    </div>
    <br />
  </div>
);

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
