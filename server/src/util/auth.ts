import jwt from "jsonwebtoken";

const JWT_SECRET = "jx7B9vHSUcJq6pA";

export const authUser = (user: any): any => {
  const { user_id, role, email, name, phone, description } = user;

  const tokenData = {
    user_id,
    email,
    role,
    name,
    phone,
    description,
  };
  const token = jwt.sign(tokenData, JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  return token;
};

/*
export const authOperative = (user: any): any => {
  const { user_id, email, name, phone, description } = user;

  const tokenData = {
    user_id,
    email,
    name,
    phone,
    description
  };
  const token = jwt.sign(tokenData, JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  return token;
};
*/