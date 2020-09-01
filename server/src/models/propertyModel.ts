import { queryHandler } from "../data/db";
import { errorHandler } from "./errorHandler";

export const getProperties = async (args?: any): Promise<any[] | undefined> => {
  const pathFunction = "productModel.js getProduct";

  const {
    variables: { user_id },
  } = args;

  console.log("args: ", args);
  let properties = [];
  try {
    let QUERY_GET_PROPERTIES = `
    SELECT 
      p.*, 
      trim(replace(replace(lower(p.phone),'celular:',''),'teléfono:','')) as phone 
    FROM  fincaraiz.property p ORDER BY p.updated_at DESC, p.status DESC, p.source ASC`;

    if (user_id) {
      QUERY_GET_PROPERTIES = `
      SELECT 
        p.*, 
        trim(replace(replace(lower(p.phone),'celular:',''),'teléfono:','')) as phone 
      FROM  fincaraiz.property p 
      WHERE p.user_id='${user_id}' OR p.status is null
      ORDER BY p.updated_at DESC, p.status DESC, p.source ASC`;
    }

    const { rows } = await queryHandler(QUERY_GET_PROPERTIES);
    properties = rows;
  } catch (error) {
    errorHandler({ error, pathFunction });
  }
  return properties;
};

export const getDataPropertiesFromFincaRaiz = async (
  args?: any
): Promise<any[] | undefined> => {
  const pathFunction = " getDataPropertiesFromFincaRaiz ";
  let dataProperties = [];
  try {
    const QUERY_GET_DATA_PROPERTIES = `
      SELECT
        count(*) as registros,
        SUM(CASE WHEN status='0' OR status is null THEN 1 ELSE 0 END) AS sin_gestionar,
        SUM(CASE WHEN status='1' THEN 1 ELSE 0 END) AS en_gestion,
        SUM(CASE WHEN status='2' THEN 1 ELSE 0 END) AS util,
        SUM(CASE WHEN status='3' THEN 1 ELSE 0 END) AS no_util,
        SUM(CASE WHEN city='bogota' THEN 1 ELSE 0 END) AS bogota,
        SUM(CASE WHEN city='medellin' THEN 1 ELSE 0 END) AS medellin,
        SUM(CASE WHEN city='cartagena' THEN 1 ELSE 0 END) AS cartagena,
        SUM(CASE WHEN city='barranquilla' THEN 1 ELSE 0 END) AS barranquilla
      FROM fincaraiz.property 
      WHERE  coninsa=1 and phone is not null
    `;

    const { rows } = await queryHandler(QUERY_GET_DATA_PROPERTIES);
    dataProperties = rows;
  } catch (error) {
    errorHandler({ error, pathFunction });
  }
  return dataProperties;
};

export const updateStatusProperty = async (
  args?: any
): Promise<Boolean | undefined> => {
  const pathFunction = " updateStatusProperty ";
  let property = [];
  let {
    variables: { status, observations, id, user_id },
  } = args;

  let dataCaptured: any = { status, observations, id, user_id };

  let isTouchedRowByOtherUser = await verifyIfTouchedRowByDifferentUserModel({
    id,
    user_idIn: user_id,
  });

  if (!isTouchedRowByOtherUser) {
    try {
      let { history_management } = await getHistoryManagement({ id });

      if (history_management) {
        /* if exist wsp messages or {} default */

        if (Object.keys(history_management).length > 0) {
          let { data } = history_management;
          dataCaptured.management_id = Object.keys(data).length;
          history_management.data.unshift(dataCaptured);
        } else {
          dataCaptured.management_id = Object.keys(history_management).length;
          history_management = { data: [dataCaptured] };
        }

        const UPDATE_STATUS_PROPERTY = `
      UPDATE fincaraiz.property
      SET status = '${status}',
      user_id = '${user_id}',
      history_management = $1,
      updated_at = current_timestamp
      WHERE id=${id}  returning *
    `;

        const { rows } = await queryHandler(UPDATE_STATUS_PROPERTY, [
          history_management,
        ]);
        property = rows[0];
        return true;
      }
    } catch (error) {
      errorHandler({ error, pathFunction });
    }
    return false; //error
  } else {
    /* touched by other user */
    return false;
  }
};

export const completeProperty = async (
  args?: any
): Promise<Boolean | undefined> => {
  const pathFunction = " updateStatusProperty ";
  let property = [];

  console.log("args; ", args);

  let {
    variables: {
      property_id,
      fullname,
      phone,
      email,
      neighborhood,
      price,
      property_type,
      city,
      observations,
      user_id,
    },
  } = args;

  let owner_data = {
    owner_data: {
      property_id,
      fullname,
      phone,
      email,
      neighborhood,
      price,
      property_type,
      city,
      observations,
      user_id,
    },
  };

  let isTouchedRowByOtherUser = await verifyIfTouchedRowByDifferentUserModel({
    id: property_id,
    user_idIn: user_id,
  });

  if (!isTouchedRowByOtherUser) {
    try {
      const UPDATE_STATUS_PROPERTY = `
      UPDATE fincaraiz.property
      SET owner_data = $1,
      user_id = $2,
      status = '1',
      updated_at = current_timestamp
      WHERE id=${property_id}  returning *
    `;

      const { rows } = await queryHandler(UPDATE_STATUS_PROPERTY, [
        owner_data,
        user_id,
      ]);
      property = rows[0];
      return true;
    } catch (error) {
      errorHandler({ error, pathFunction });
    }
    return false;
  } else {
    /* touched by other user */
    return false;
  }
};

export const registerSmsIteration = async (
  args?: any
): Promise<Boolean | undefined> => {
  const pathFunction = "registerSmsIteration";
  let iterationInserted: any;
  const { message, phone, id, user_id } = args;

  let dataCaptured: any = {
    message,
    phone,
    id,
    user_id,
  };

  let isTouchedRowByOtherUser = await verifyIfTouchedRowByDifferentUserModel({
    id,
    user_idIn: user_id,
  });

  if (!isTouchedRowByOtherUser) {
    try {
      let { sms_contacted } = await getSmsIterations({ id });

      if (sms_contacted) {
        /* if exist wsp messages or {} default */

        if (Object.keys(sms_contacted).length > 0) {
          let { data } = sms_contacted;
          dataCaptured.message_id = Object.keys(data).length;
          sms_contacted.data.unshift(dataCaptured);
        } else {
          dataCaptured.message_id = Object.keys(sms_contacted).length;
          sms_contacted = { data: [dataCaptured] };
        }

        const UPDATE_STATUS_PROPERTY = `
      UPDATE fincaraiz.property
      SET status = '1',
        sms_contacted =$1,
        user_id = '${user_id}',
        updated_at = current_timestamp
      WHERE id=${id}  returning *
    `;

        const result = await queryHandler(UPDATE_STATUS_PROPERTY, [
          sms_contacted,
        ]);
        return true;
      }
    } catch (error) {
      errorHandler({ error, pathFunction });
    }
  }

  return isTouchedRowByOtherUser; // touched by other user
};

export const registerWhatsappIteration = async (
  args?: any
): Promise<Boolean | undefined> => {
  const pathFunction = " registerWhatsappIteration ";
  let property = [];
  let {
    variables: { message, phone, id, user_id },
  } = args;

  let dataCaptured: any = {
    message,
    phone,
    id,
    user_id,
  };

  let isTouchedRowByOtherUser = await verifyIfTouchedRowByDifferentUserModel({
    id,
    user_idIn: user_id,
  });

  if (!isTouchedRowByOtherUser) {
    try {
      let { wsp_contacted } = await getWhatsappIterations({ id });

      if (wsp_contacted) {
        /* if exist wsp messages or {} default */

        if (Object.keys(wsp_contacted).length > 0) {
          let { data } = wsp_contacted;
          dataCaptured.message_id = Object.keys(data).length;
          wsp_contacted.data.unshift(dataCaptured);
        } else {
          dataCaptured.message_id = Object.keys(wsp_contacted).length;
          wsp_contacted = { data: [dataCaptured] };
        }

        const UPDATE_WSP_CONTACTED_PROPERTY = `
      UPDATE fincaraiz.property
      SET status = '1',
        wsp_contacted = $1,
        user_id = '${user_id}',
        updated_at = current_timestamp
      WHERE id=${id}  returning *
    `;

        const { rows } = await queryHandler(UPDATE_WSP_CONTACTED_PROPERTY, [
          wsp_contacted,
        ]);
        property = rows[0];
        return true;
      }
    } catch (error) {
      errorHandler({ error, pathFunction });
    }
  }
  return false;
};

const getWhatsappIterations = async ({ id }: any) => {
  let wsp_contacted = [];
  try {
    const { rows } = await await queryHandler(
      `
        SELECT 
          wsp_contacted
        FROM fincaraiz.property
        WHERE id=$1 
        `,
      [id]
    );
    wsp_contacted = rows[0];
    console.log("wsp_contacted:", wsp_contacted);
  } catch (error) {
    errorHandler(error);
  }

  return wsp_contacted;
};

const getSmsIterations = async ({ id }: any) => {
  let sms_contacted = [];
  try {
    const { rows } = await await queryHandler(
      `
        SELECT 
          sms_contacted
        FROM fincaraiz.property
        WHERE id=$1 
        `,
      [id]
    );
    sms_contacted = rows[0];
  } catch (error) {
    errorHandler(error);
  }

  return sms_contacted;
};

const getHistoryManagement = async ({ id }: any) => {
  let history_management = [];
  try {
    const { rows } = await await queryHandler(
      `
        SELECT 
          history_management
        FROM fincaraiz.property
        WHERE id=$1 
        `,
      [id]
    );
    history_management = rows[0];
  } catch (error) {
    errorHandler(error);
  }

  return history_management;
};

export const verifyIfTouchedRowByDifferentUserModel = async ({
  id,
  user_idIn,
}: any): Promise<any> => {
  try {
    const { rows } = await await queryHandler(
      `
        SELECT 
          user_id
        FROM fincaraiz.property
        WHERE id=$1 
        `,
      [id]
    );
    console.log("rows[0]: ", rows[0]);
    if (rows) {
      let { user_id } = rows[0];
      if (user_id) {
        if (user_id == user_idIn) {
          return false;
        } else {
          /* touched by other user */
          return true;
        }
      } else {
        /* don't touched */
        return false;
      }
    } else {
      /* don't exist property */
      return false;
    }
  } catch (error) {
    errorHandler(error);
  }

  return false;
};
