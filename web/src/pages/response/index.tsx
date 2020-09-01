import React, { useState, useEffect } from 'react';
import '../../assets/sass/form.sass';
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    ADD_RESPONSE
} from './GQL';

import {
    Button,
    TextField,
    TextareaAutosize,
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';

import { yellow } from '@material-ui/core/colors';

interface DataModel {
    numero_contrato?: string,
    name?: string,
    email?: string,
    phone?: string,
    role?: string,
    response?: string,
    response_to_send?: string
}

const CHECK_TOKEN_EMAIL = gql`
  query($token: String!) {
    checked: checkTokenEmailResponse(token: $token)
  }
`;

// Style Components
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
        '&:hover': {
            backgroundColor: yellow[700],
        },
    },
}))(Button);

const defaultData = {
    numero_contrato: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    response: '',
    response_to_send: '',
}

const Response = ({ match, location, history }: any) => {

    const [data, setData] = useState({ defaultData } as DataModel)

    const [error, setError] = useState('')
    const [check, setCheck] = useState(false)
    const { refetch: checkTokenEmailResponse } = useQuery(CHECK_TOKEN_EMAIL, { skip: true });
    const [addResponseToUser] = useMutation(ADD_RESPONSE);

    useEffect(() => {

        try {
            const search = new URLSearchParams(location.search);
            const { header, payload, sign } = {
                header: search.get("header"),
                payload: search.get("payload"),
                sign: search.get("sign"),
            }

            if (header && payload && sign && !check) {

                (async function checkToken() {
                    try {
                        const token = `${header}.${payload}.${sign}`;
                        const { data: { checked } } = await checkTokenEmailResponse({ token });
                        console.log('checked', checked)

                        setData({
                            numero_contrato: checked.numero_contrato,
                            name: checked.name,
                            email: checked.email,
                            phone: checked.phone,
                            role: checked.role,
                            response: checked.response
                        })
                        setCheck(true)
                    } catch (error) {
                        if (
                            Array.isArray(error.graphQLErrors) &&
                            error.graphQLErrors.length
                        ) {
                            const [{ message }] = error.graphQLErrors;
                            setError(message);
                        }
                        console.log({ error });
                    }
                })();

            }

        } catch (error) {
            setError(error.message);
        }
    })

    const classes = useStyles();


    const onConfirm = async (e: any) => {

        console.log('sending... ')
        console.log('data', data)

        /*
       setData(defaultData)
       setContratsNumber([{
           value: '',
           label: '',
       }])

       return false
       */

        try {
            const { data: { user: responseAdded } } = await addResponseToUser({ variables: { user: { ...data } } })
            if (!!responseAdded) {
                console.log('responseAdded', responseAdded)
            }
            alert('Finalizado exitosamente')
            setData(defaultData)

        } catch (error) {
            alert(error)
        }
    }


    const handleData = (key: string) => (value: any) => {
        setData({ ...data, [key]: value })
    }

    return (
        <div className="bg-contact2" style={{ backgroundImage: `url('../../assets/images/bg-01.jpg')` }}>
            <div className="container-contact2">
                <div className="wrap-contact2">
                    <span className="contact2-form-title">
                        <img 
                        src="https://www.coninsa.co/sites/all/themes/bootstrap/assets/images/logo-coninsa.svg" 
                        alt="Inicio"
                        style={{width: "60%", margin: "auto"}}
                        ></img>
                        Gracias por respondernos, todos unidos somos más
					</span>
                    <br />

                    {(data?.response)
                        ?
                        <div>
                            {(data?.response === 'yes') ?
                                <div>
                                    <br />
                                    <div>HAS ACEPTADO, ESTAREMOS EN CONTACTO CONTIGO!!</div>
                                    <br /><br />
                                    <span><b>Nombre: </b> {data.name} </span> <br />
                                    <span><b>Correo: </b> {data.email} </span> <br />
                                    <span><b>Teléfono: </b> {data.phone} </span> <br />
                                    <span><b>Rol: </b> {data.role} </span> <br />
                                </div>
                                :
                                <div className="body-form">
                                    <div>Hola <b>{data.name}</b>, escríbenos tu contrapropuesta, la analizaremos y te contactaremos lo antes posible.</div>
                                    <br />
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        rowsMin={3}
                                        onBlur={({ target: { value } }: any) => {
                                            console.log(' value: ', value)
                                            handleData('response_to_send')(value)
                                        }}
                                        placeholder="Escribe aquí tu mensaje..."
                                    />
                                    <Button
                                        variant="contained"
                                        id="sendEmail"
                                        color="primary"
                                        onClick={onConfirm}
                                        endIcon={<SendIcon />}
                                    >
                                        ENVIAR RESPUESTA
                                    </Button>
                                </div>


                            }
                        </div>
                        :
                        <div>
                            {(check) ?
                                <div>
                                    <span>Hemos enviado tu respuesta, estaremos en contacto contigo!</span> <br /><br />
                                </div>
                                : ''
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default Response;
