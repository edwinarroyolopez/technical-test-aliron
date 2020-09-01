import { createContext } from 'react';

const appContext = createContext({} as any);

export const Provider = appContext.Provider;
export const Consumer = appContext.Consumer;

export default appContext;
