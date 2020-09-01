import {
  createChampionshipModel,
  updateChampionshipModel,
  getChampionshipsModel
} from "../../models/championshipModel";
/* @Mutations */
export const Mutation = {
  createChampionship: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any> => {
    return await createChampionshipModel(args);
  },
  
  updateChampionship: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<boolean | undefined> => {
    console.log(args);
    return await updateChampionshipModel(args);
  },
};

/* @Querys */
export const Query = {
  getChampionships: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any[] | []> => {
    return await getChampionshipsModel();
  },
};
