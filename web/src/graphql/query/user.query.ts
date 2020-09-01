import gql from "graphql-tag";

export const LOGIN_USER = gql`
  query($variables: JSON!) {
    user: LoginUser(variables: $variables) {
        user_id
        role
        email
        name
        phone
        token
    }
  }
`;
