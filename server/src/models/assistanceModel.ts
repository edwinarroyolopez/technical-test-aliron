import { queryHandler } from "../data/db";
import { errorHandler } from "./errorHandler";

/* @Mutation */

export const createAssistanceModel = async (
  args?: any
): Promise<boolean | undefined> => {
  const pathFunction = "createAssistance";
  let serviceInserted;
  try {
    const {
      input: {
        fullname,
        phone,
        email,
        petname,
        specie,
        breeds,
        observations,
        age,
        weight,
        size,
        service,
        status,
      },
    } = args;

    let data = { data: [] };

    const { rows } = await queryHandler(
      `INSERT INTO  manchas.service (
          fullname,
          phone,
          email,
          petname,
          specie,
          breeds,
          observations,
          age,
          weight,
          size,
          service,
          data,
          created_at,
          updated_at
          ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp, current_timestamp)  returning *`,
      [
        fullname,
        phone,
        email,
        petname,
        specie,
        breeds,
        observations,
        age,
        weight,
        size,
        "assistance",
        data,
      ]
    );

    serviceInserted = rows[0];
  } catch (error) {
    errorHandler({ error, pathFunction });
  }
  return serviceInserted;
};

/* @Query */
export const getAssistancesModel = async (): Promise<any[] | []> => {
  let assistances = [];
  try {
    const { rows } = await queryHandler(
      `
      SELECT
       *
      FROM  manchas.service
      where service='assistance'
      ORDER BY service_id DESC
      `,
      []
    );
    assistances = await rows;
  } catch (error) {
    errorHandler(error);
  }
  return await assistances;
};
