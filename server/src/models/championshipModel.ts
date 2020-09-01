import bcrypt from "bcrypt";
import { queryHandler } from "../data/db";
import { errorHandler } from "./errorHandler";
import { authUser } from "../util/auth";
import { sendEmail, sendSms } from "../util/sendEmailOrSms";

export const createChampionshipModel = async (args?: any): Promise<any> => {
  let User;

  console.log("createChampionshipModel -> args: ", args);
  const {
    input: { user_id, title, teams_quantity, award, start_date, end_date },
  } = args;

  try {
    const { rows } = await queryHandler(
      `INSERT INTO game.championships (
          user_id,
          title,
          teams_quantity,
          award,
          start_date,
          end_date,
          status,
          created_at,
          updated_at
        ) values ($1, $2, $3, $4, $5, $6, 0, current_timestamp, current_timestamp)  returning *`,
      [user_id, title, teams_quantity, award, start_date, end_date]
    );
    User = rows[0];
    return User;
  } catch (error) {
    errorHandler(error);
  }
};

export const updateChampionshipModel = async (args?: any): Promise<any> => {
  const { input }: any = args;
  let { user_id, role, email, name, phone, description } = input;

  try {
    const { rows } = await queryHandler(
      `UPDATE game.championships
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


/* @Query */
export const getChampionshipsModel = async (): Promise<any[] | []> => {
  let championships = [];
  try {
    const { rows } = await queryHandler(`SELECT * FROM game.championships`, []);
    championships = await rows;
  } catch (error) {
    errorHandler(error);
  }
  return await championships;
};
