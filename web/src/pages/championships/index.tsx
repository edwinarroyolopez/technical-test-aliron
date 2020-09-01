import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import Notifications, { notify } from "react-notify-toast";
import Modal from "../../components/modal";
import Complete from "./complete";

import {
  ThemeProvider,
  Grid,
  Card,
  CardHeader,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import theme2 from "../../assets/theme/themeconfig";

import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { GET_CHAMPIONSHIPS } from "../../graphql/query/championship.query";

//import "../../assets/sass/properties.sass";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);
interface PatchModel {
  ID?: String; //id del parche
  post_title?: String; //nombre del parche
  startDate?: String; //fecha y hora inicial del parche
  guid?: String; //link
}

const Championship = () => {
  const classes = useStyles();

  const [championships, setChampionships] = useState([]);

  const { refetch: getChampionships } = useQuery(GET_CHAMPIONSHIPS, {
    skip: true,
  });

  useEffect(() => {
    try {
      if (championships.length === 0) {
        (async function () {
          try {
            const {
              data: { championships },
            }: any = await getChampionships();

            console.log("championships: ", championships);

            setChampionships(championships);
          } catch (error) {
            if (
              Array.isArray(error.graphQLErrors) &&
              error.graphQLErrors.length
            ) {
              const [{ message }] = error.graphQLErrors;
            }
            console.log({ error });
          }
        })();
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleClick = (row: any) => {
    console.log("row", row);
  };

  return (
    <div className={classes.root} style={{ maxWidth: "80em", margin: "auto" }}>
      <br />
      <ThemeProvider theme={theme2}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid>
                <CardHeader
                  style={{ background: "#2e363847" }}
                  avatar={<SportsEsportsIcon aria-label=""></SportsEsportsIcon>}
                  title="Campeonatos"
                  subheader="Estos son todos los campeonatos que existen dentro de nuestra plataforma"
                />
              </Grid>
            </Card>
            <br />
            <Card elevation={3}>
              <div id="container-patch" className="">
                <TableContainer component={Paper} className="event-list">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Campeonato</TableCell>
                        <TableCell>Datos</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="right">Acción</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {championships && championships.length > 0 ? (
                        championships.map((championship: PatchModel, i) => (
                          <Row
                            key={i}
                            row={championship}
                            handleClick={handleClick}
                          />
                        ))
                      ) : (
                          <div className="no-data">
                            No existen campeonatos creados.
                          </div>
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <br />
              <br />
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

function Row({ row, handleClick }: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          <>
            <a href={`#`} target="_blank">
              <div className="patch-name">{row.title}</div>
            </a>

            <div className="patch-status">
              <div className="item-description">Inicio: {row.start_date}</div>
              <div className="item-description">Fin: {row.end_date}</div>
            </div>
          </>
        </TableCell>
        <TableCell>
          <div className="patch-status">
            <div className="item-description">
              Cantidad: {row.teams_quantity}
            </div>
            <div className="item-description">Premio: {row.award}</div>
          </div>
        </TableCell>
        <TableCell>
          <div className="patch-status">
            <div className="item-description">{row.status}</div>
          </div>
        </TableCell>
        <TableCell align="right">
          <Button
            color="primary"
            onClick={() => {
              setOpen(!open);
              handleClick(row);
            }}
          >
            COMPLETAR
          </Button>
        </TableCell>
      </TableRow>
      <Modal open={open} onClose={() => { }}>
        <Complete detail={row} />
      </Modal>
    </>
  );
}

export default Championship;
