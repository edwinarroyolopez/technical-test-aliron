import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getTokenAuthCookie } from "../../utils/cookiesHandler";
import Notifications, { notify } from "react-notify-toast";


import {
  ThemeProvider,
  Grid,
  Card,
  CardHeader,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  TextareaAutosize,
} from "@material-ui/core";
import theme2 from "../../assets/theme/themeconfig";

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import "../../assets/sass/properties.sass";
import { Link } from "react-router-dom";

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

const PatchDefeault = {
  ID: "", //id del parche
  post_title: "", //nombre del parche
  startDate: "", //fecha y hora inicial del parche
  guid: "", //link
};

const Pending = () => {
  const classes = useStyles();

  const [dataPatch, setDataPatch] = useState([]);
  // const [updateEventStatus] = useMutation(UPDATE_PENDING);
  // //const [eventDetail, setEventDetail] = useState<{ [key: string]: any }>(UserDetailDefault);

  // const { refetch: getpendingPatch } = useQuery(GET_PENDING_PATCHS, {
    // skip: true,
  // });

  //const { name } = getTokenAuthCookie()

  useEffect(() => {
    try {
      if (dataPatch.length === 0) {
        (async function () {
          // try {
          //   const {
          //     data: { dataPatch },
          //   }: any = await getpendingPatch();

          //   console.log("dataPatch: ", dataPatch);

          //   setDataPatch(dataPatch);
          // } catch (error) {
          //   if (
          //     Array.isArray(error.graphQLErrors) &&
          //     error.graphQLErrors.length
          //   ) {
          //     const [{ message }] = error.graphQLErrors;
          //   }
          //   console.log({ error });
          // }
        })();
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleAproClick = (ID: any) => {
    console.log("ID", ID);
    // updateEventStatus({
    //   variables: {
    //     event: {
    //       post_status: "publish",
    //       ID: parseInt(ID),
    //       comment_status: "open",
    //     },
    //   },
    // });

    // console.log("datos enviados: ", updateEventStatus);
    // window.location.href = "/parches-por-aprobar";
    /* let myColor = { background: '#34AA34', text: "#FFFFFF", fontSize: '2rem' };
    notify.show("Se ha aprobado correctamente!",  "custom", 1500, myColor);
    setTimeout(() => {
      window.location.href = "/parches-por-aprobar"
    }, 2000) */
  };

  return (
    <div className={classes.root} style={{maxWidth:"80em", margin:"auto"}}>
      <br/>
      <ThemeProvider theme={theme2}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid>
                <CardHeader
                  style={{ background: "#2e363847" }}
                  avatar={
                    <SportsEsportsIcon aria-label=""></SportsEsportsIcon>
                  }
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
                        <TableCell>Fechas</TableCell>
                        <TableCell>Participantes</TableCell>
                        <TableCell align="right">Estado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataPatch && dataPatch.length > 0 ? (
                        dataPatch.map((pendingPatch: PatchModel, i) => (
                          <Row
                            key={i}
                            row={pendingPatch}
                            handleAproClick={()=>{}}
                            handleClick={() => {}}
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

function Row({ row, handleAproClick, handleClick }: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          <>
            <a href={`${row.guid}`} target="_blank">
              <div className="patch-name">{row.post_title}</div>
            </a>

            <div className="patch-status">
              {/* <div className="item-title">
                                    Fecha y hora incial del parche
                                  </div> */}
              <div className="item-description">
                {row.startDate != ""
                  ? formattingDate(row.startDate) // new Date(Number())
                  : ""}
              </div>
            </div>
          </>
        </TableCell>
        <TableCell>
          <Button
            color="primary"
            onClick={() => {
              handleAproClick(row.ID);
            }}
          >
            APROBAR
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            color="primary"
            onClick={() => {
              setOpen(!open);
            }}
          >
            RECHAZAR
          </Button>
        </TableCell>
      </TableRow>
      <TableRow style={{ background: "whitesmoke" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Rechazar
              </Typography>
              <Grid>
                <TextareaAutosize
                  style={{ width: "100%", padding: "5px 10px" }}
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="motivo de rechazo"
                  value={value}
                  onChange={
                    (e) => { setValue(e.target.value) }
                  }
                />
                <Button
                  color="primary"
                  onClick={() => {
                    // setOpen(!open);
                    handleClick(row.ID, row.post_title, row.post_author, value);
                  }}
                >
                  RECHAZAR
                </Button>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Pending;

const formattingDate = (myDate: any) => {
  const today = new Date(Number(myDate) * 1000).toLocaleString("en-US");

  return `${today}`;
};
