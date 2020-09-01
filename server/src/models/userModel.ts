import bcrypt from "bcrypt";
import { queryHandler } from "../data/db";
import { errorHandler } from "./errorHandler";
import { authUser } from "../util/auth";
import { sendEmail, sendSms } from "../util/sendEmailOrSms";

export const createUserModel = async (args?: any): Promise<any> => {
  let User;

  console.log("args: ", args);
  const {
    input: { email, password, name, phone, description },
  } = args;

  const hash_password = await bcrypt.hash(password, 10);

  try {
    const { rows } = await queryHandler(
      `INSERT INTO game.users (
          role,  
          name,
          email,
          phone,
          created_at,
          updated_at
        ) values ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)  returning *`,
      [email, hash_password, name, phone, description]
    );
    User = rows[0];
    return User;
  } catch (error) {
    errorHandler(error);
  }
};

export const signupUserModel = async (args?: any): Promise<any> => {
  let user;

  console.log("signupUserModel -> args: ", args);
  const {
    input: { role, name, email, phone },
  } = args;

  const exist = await existEmailOrPhone({ email, phone });
  if (!exist) {
    try {
      const { rows } = await queryHandler(
        `INSERT INTO game.users (
            role,
            name,
            email,
            phone,
            status,
            created_at,
            updated_at
          ) values ($1, $2, $3, $4, 0, current_timestamp, current_timestamp)  returning *`,
        [role, name, email, phone]
      );
      user = rows[0];
      /* ramdom 6 digits to activate user */
      let generatedCode = Math.floor(100000 + Math.random() * 900000);

      /* create row into db to  will user active */
      let createdCode = await createActivatationCode({
        user_id: user.user_id,
        generatedCode,
      });
      if (createdCode) {
        await sendMessageToActivateAccount({
          role,
          name,
          email,
          phone,
          generatedCode,
        });
      }

      return user;
    } catch (error) {
      errorHandler(error);
    }
  } else {
    /* User not saved, because already exist */
    throw new Error(`El email o teléfono ya existen para un usuario`);
  }
};

export const activateUserModel = async (args?: any): Promise<any> => {
  let user;
  const {
    variables: { user_id, confirmationCode },
  } = args;
  console.log("activateUserModel -> args: ", args);

  try {
    const { rows } = await queryHandler(
      `SELECT * FROM game.activation_code
       WHERE user_id=${user_id} and  code='${confirmationCode}'
 `
    );
    console.log("nnnnnn");
    if (rows[0]) {
      /* update  */
      const result = await queryHandler(
        `UPDATE game.activation_code
         SET
            status = 1,
            updated_at = current_timestamp
         WHERE user_id=${user_id} and  code='${confirmationCode}'
   `
      );
      console.log("resultado de la actualización: ", result.rows);
      const data = await queryHandler(
        `SELECT * FROM game.users WHERE user_id=${user_id}`
      );
      if (data.rows[0]) {
        user = data.rows[0];
        user.token = authUser(user); /* will generate token */
        return user;
      }
    } else {
      //
      throw new Error(`El código ingresado es incorrecto`);
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const updateUserModel = async (args?: any): Promise<any> => {
  const { input }: any = args;
  let { user_id, role, email, name, phone, description } = input;

  try {
    const { rows } = await queryHandler(
      `UPDATE game.users
       SET
          email = ${email},
          name = ${name},
          phone = ${phone},
          description = ${description}
       WHERE user_id=${user_id}
 `
    );
    return true;
  } catch (error) {
    errorHandler(error);
  }
};

export const updateUserPasswordModel = async (args?: any): Promise<any> => {
  console.log("updateUserPasswordModel -> args: ", args);
  let {
    variables: { user_id, password },
  } = args;

  try {
    const hash_password = await bcrypt.hash(password, 10);
    await queryHandler(
      `
          UPDATE game.users
          SET 
            updated_at = current_timestamp,
            password = $1
          WHERE user_id = $2
          `,
      [hash_password, user_id]
    );
    return true;
  } catch (error) {
    errorHandler(error);
  }
  return false;
};

/* @Query */
export const getUsersModel = async (): Promise<any[] | []> => {
  let users = [];
  try {
    const { rows } = await queryHandler(`SELECT * FROM game.users`, []);
    users = await rows;
  } catch (error) {
    errorHandler(error);
  }
  return await users;
};

/* @Query */
export const LoginUserModel = async (args: any): Promise<any[] | []> => {
  let user = [];

  console.log("LoginUserModel -> args: ", args);
  const {
    variables: { email, password },
  } = args;

  try {
    const {
      rows,
    } = await queryHandler(`SELECT * FROM game.users WHERE email=$1`, [email]);
    if (rows[0]) {
      const hash = rows[0].password;
      const isPass = await bcrypt.compareSync(password, hash);
      if (isPass) {
        user = rows[0];
        user.token = authUser(user);
      } else {
        throw new Error(`Usuario o contraseña incorrectos`);
      }
    } else {
      throw new Error(`Usuario o contraseña incorrectos`);
    }
  } catch (error) {
    errorHandler(error);
  }
  return await user;
};

/* verify email and phone */
const existEmailOrPhone = async (args: any): Promise<Boolean> => {
  console.log(" verify args: ", args);
  const { email, phone } = args;

  //return false;

  try {
    const {
      rows,
    } = await queryHandler(
      `SELECT * FROM game.users WHERE email=$1 OR phone=$2 `,
      [email, phone]
    );

    if (rows[0]) {
      console.log("Usuario encontrado: ", rows[0]);
      return true;
    } else {
      /* user don't exist */
      return false;
    }
  } catch (error) {
    errorHandler(error);
  }
  return await false;
};

/* create code to verify account */
const createActivatationCode = async (args: any): Promise<Boolean> => {
  console.log(" createActivatationCode - args: ", args);
  const { user_id, generatedCode } = args;

  try {
    const { rows } = await queryHandler(
      `INSERT INTO game.activation_code (
        user_id,
        code,
        status,
        expiration_time,
        created_at,
        updated_at
      ) values ($1, $2, 0, current_timestamp, current_timestamp, current_timestamp)  returning *`,
      [user_id, generatedCode]
    );

    if (rows[0]) {
      console.log("Codigo de activación generado: ", rows[0]);
      return true;
    }
  } catch (error) {
    errorHandler(error);
  }
  return await false;
};

/* verify email and phone */
const sendMessageToActivateAccount = async (args: any): Promise<Boolean> => {
  console.log("sms - email args: ", args);
  const { role, name, email, phone, generatedCode } = args;

  /* role */
  let roleUser = role === "1" ? "admin" : "player";

  /* EMAIL */
  let subject = `Registro ${roleUser}`;
  let content = `Bienvenido ${name}, para terminar tu registro ingresa el siguiente códido: <br/> <b>${generatedCode}</b>`;
  let dataEmail = await sendEmail({
    email,
    subject,
    content,
  });

  //return false;
  /* SMS */
  let message = `Bienvenido ${name}, para terminar tu registro ingresa el siguiente códido: ${generatedCode}`;
  let dataSms = await sendSms({
    phone,
    message,
    reference: "Registro",
  });

  console.log("dataEmail: ", dataEmail);
  console.log("dataSms: ", dataSms);

  /* 
      => Crear torneos => jugadores  => identificar quienes ganan... jajaja !!
    */
  return false;
};
