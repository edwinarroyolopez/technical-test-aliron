import gql from "graphql-tag";

/* Create users on signup */
export const SINUP_USER = gql`
  mutation($user: UserInput!) {
    user: signupUser(input: $user) {
      user_id
      role
      name
      email
      phone
      status
    }
  }
`;

/* Activate user */
export const ACTIVATE_USER = gql`
  mutation($variables: JSON!) {
    user: activateUser(variables: $variables) {
      user_id
      role
      email
      name
      phone
      token
    }
  }
`;

/* Update password */
export const PASSWORD_UPDATE = gql`
  mutation($variables: JSON!) {
    user: updateUserPassword(variables: $variables)
  }
`;

/*
mutation{
  user: activateUser(variables:{
   user_id: "13", confirmationCode: "123456"
  })
 {
  	user_id
    email
    password
    name
    phone
    description
  	token
  }
}*/
