import {
  createUserModel,
  LoginUserModel,
  signupUserModel,
  activateUserModel,
  getUsersModel,
  updateUserPasswordModel,
  updateUserModel,
} from "../../models/userModel";
/* @Mutations */
export const Mutation = {
  createUser: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any> => {
    return await createUserModel(args);
  },
  signupUser: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any> => {
    return await signupUserModel(args);
  },

  activateUser: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any> => {
    return await activateUserModel(args);
  },
  
  updateUser: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<boolean | undefined> => {
    console.log(args);
    return await updateUserModel(args);
  },
  updateUserPassword: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<boolean | undefined> => {
    return updateUserPasswordModel(args);
    return await false;
  },
  createUsersCSV: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<boolean | undefined> => {
    console.log(args);
    return await false;
  },
};

/* @Querys */
export const Query = {
  getUsers: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any[] | []> => {
    return await getUsersModel();
  },
  LoginUser: async (
    root?: any,
    args?: any,
    context?: any
  ): Promise<any[] | []> => {
    return await LoginUserModel(args);
  },
};
