import {
  getProperties,
  getDataPropertiesFromFincaRaiz,
  updateStatusProperty,
  completeProperty,
  registerSmsIteration,
  registerWhatsappIteration,
  verifyIfTouchedRowByDifferentUserModel,
} from "../../models/propertyModel";

/* to sms */
import axios from "axios"; // permitir enviar "datos" vía post => conectarnos con hablame
import qs from "querystring"; // transformar los parámetros a una cadena

// credenciales para usar háblame
const HABLAME_URI = "https://api.hablame.co/sms/envio/"; // url que me permite consumir el api
const HABLAME_KEY = "YSwBELayUv1HLbIrCrXXf7Tmij71Sn"; // api key de hablame, para crear "sesión" y usar el api

/* @Querys */
export const Query = {
  getPropertiesFromFincaRaiz: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any[] | undefined> => {
    return await getProperties(args);
  },

  getDataPropertiesFromFincaRaiz: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any[] | undefined> => {
    return await getDataPropertiesFromFincaRaiz();
  },

  verifyIfTouchedRowByDifferentUser: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<Boolean | undefined> => {
    let {
      variables: { id, user_idIn },
    } = args;
    return await verifyIfTouchedRowByDifferentUserModel({ id, user_idIn });
  },
};

/* @Mutations */
export const Mutation = {
  updateStatusPropertyFincaRaiz: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<Boolean | undefined> => {
    console.log("args: ", args);
    //return await []
    return await updateStatusProperty(args);
  },

  completePropertyFincaRaiz: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<Boolean | undefined> => {
    console.log("args: ", args);
    //return await []
    return await completeProperty(args);
  },

  sendSmsIteration: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<Boolean | undefined> => {
    console.log("args:", args);

    const {
      input: { message, phone, user_id, id },
    } = args;

    let result = await verifyIfTouchedRowByDifferentUserModel({
      id,
      user_idIn: user_id,
    });
    if (!result) {
      if (phone) {
        //return await [];
        const { data } = await axios.post(
          HABLAME_URI,
          qs.stringify({
            cliente: 10014879, //Numero de cliente
            api: HABLAME_KEY, //Clave API suministrada
            numero: `57${phone}`, //numero o numeros telefonicos a enviar el SMS (separados por una coma ,)
            sms: `${message}`, //Mensaje de texto a enviar
            fecha: "", //(campo opcional) Fecha de envio, si se envia vacio se envia inmediatamente (Ejemplo: 2017-12-31 23:59:59)
            referencia: "Scraping notificación", //(campo opcional) Numero de referencio ó nombre de campaña
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const dataIteration = {
          message,
          user_id,
          phone,
          id,
          status: "Enviado",
        };
        console.log(dataIteration);
        console.log("Háblame result: ", data);
        return await registerSmsIteration(dataIteration);
      } else {
        console.log("No hay telefono");
      }
    }

    return false;
  },
  sendWhatsappIteration: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<Boolean | undefined> => {
    console.log("args: ", args);
    //return await []
    return await registerWhatsappIteration(args);
  },
};
