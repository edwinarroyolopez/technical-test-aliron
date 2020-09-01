import React from 'react';
import appContext, { Provider } from '../../context';

const withProviderContext = (
  WrappedComponent: any,
  reducer: any,
  defaultState: any = {}
) => {
  return (props: any = {}) => {
    const useContextState = React.useReducer(reducer, defaultState);
    return (
      <Provider value={useContextState}>
        <WrappedComponent {...props} contextData={useContextState[0]} run={useContextState[1]}/>
      </Provider>
    );
  };
};

export const withAppContext = (WrappedComponent: any) => {
  return (props: any) => {
    const [contextData, run] = React.useContext(appContext);
    return (<WrappedComponent {...props} contextData={contextData} run={run} />)
  }
}

export default withProviderContext;
