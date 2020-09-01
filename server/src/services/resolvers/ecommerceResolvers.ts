import {
  getEcommerceRowsModel,
  createEcommerceRowModel,
} from "../../models/ecommerceModel";

/* @Mutations */
export const Mutation = {
  createEcommerceRow: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any> => {
    return await createEcommerceRowModel(args);
  },
};

/* @Querys */
export const Query = {
  getEcommerceRows: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any[] | []> => {
    return await getEcommerceRowsModel();
  },
};
