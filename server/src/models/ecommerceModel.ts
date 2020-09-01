import { queryHandler } from "../data/db";
import { errorHandler } from "./errorHandler";

/* @Mutation */

export const createEcommerceRowModel = async (
  args?: any
): Promise<boolean | undefined> => {
  const pathFunction = "createAssistance";
  let serviceInserted;
  try {
    const {
      input: {
        email,
        petname,
        specie,
        breeds,
        age,
        weight,
        size
      },
    } = args;

    console.log("args: ", args);

    let data = { data: [] };

    const { rows } = await queryHandler(
      `INSERT INTO  manchas.service (
          email,
          petname,
          specie,
          breeds,
          age,
          weight,
          size,
          service,
          status,
          created_at,
          updated_at
          ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp, current_timestamp)  returning *`,
      [email, petname, specie, breeds, age, weight, size, "ecommerce", 0]
    );

    serviceInserted = rows[0];
  } catch (error) {
    errorHandler({ error, pathFunction });
  }
  return serviceInserted;
};

/* @Query */
export const getEcommerceRowsModel = async (): Promise<any[] | []> => {
  let ecommerceRows = [];
  try {
    const { rows } = await queryHandler(
      `
      SELECT
       *
      FROM  manchas.service
      where service='ecommerce'
      ORDER BY service_id DESC
      `,
      []
    );
    ecommerceRows = await rows;
  } catch (error) {
    errorHandler(error);
  }
  return await ecommerceRows;
};
