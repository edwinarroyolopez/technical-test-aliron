import {
  getAssistancesModel,
  createAssistanceModel,
} from "../../models/assistanceModel";

/* @Mutations */
export const Mutation = {
  createAssistance: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any> => {
    return await createAssistanceModel(args);
  },
};

/* @Querys */
export const Query = {
  getAssistances: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any[] | []> => {
    return await getAssistancesModel();
  },
};
