import { setAuthTokenCookie, setUserToActivateCookie } from "../utils/cookiesHandler";

export const LOGIN = "LOGIN";
export const CREATE_GAME = "CREATE_GAME";
export const SIGNUP = "SIGNUP";

type Action =
  | { type: "CREATE_GAME" }
  | { type: "SIGNUP" }
  | { type: "LOGIN" };

const login = (user: any, state: any) => {
  console.log(" game.reducer - user: ", user);
  console.log(" game.reducer - state: ", state);

  const { user_id, role ,name, email, token } = user;

  if (token) {
    setAuthTokenCookie({
      tokenUser: token,
      role,
      user_id,
      name,
      email,
    });

    return { ...state, user: user };
  }
};


const signup = (user: any, state: any) => {
  const { user_id, name, email, phone } = user;
  setUserToActivateCookie({
    user_id, name, email, phone
  });

  return { ...state, userToActivate: user };

};

const createGame = (product: any, state: any) => {

  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

export const gameReducer = (state: any, action: any) => {
  console.log("ACTION: ", action.type);
  console.log("STATE: ", state);
  switch (action.type) {
    case CREATE_GAME:
      return createGame(action.product, state);
    case LOGIN:
      return login(action.user, state);
    case SIGNUP:
      return signup(action.user, state);
    default:
      return state;
  }
};
