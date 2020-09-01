import { createContext } from 'react';

export default createContext<Partial<any>>({});


//import React from "react";

// export default React.createContext({
//   members: [
//     {
//       id: "1",
//       name: "1",
//       email: "1",
//       role: "organizer"
//     },
//     {
//       id: "1",
//       name: "1",
//       email: "1",
//       role: "invited"
//     },
//     {
//       id: "1",
//       name: "1",
//       email: "1",
//       role: "invited"
//     },
//   ],
//   products: [],
//   //handleModalClose: () => {},
//   createGame: (data: any) => {},
//   // addProductToCart: (product: any) => {},
//   // removeProductFromCart: (productId: any) => {},
//   // handleDoubleClickRow: (row: any[], number: any) => number,
// });
