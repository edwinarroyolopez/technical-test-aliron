import gql from "graphql-tag";

export const GET_CHAMPIONSHIPS = gql`
  query($variables: JSON) {
    championships: getChampionships(variables: $variables) {
      championship_id
      user_id
      title
      teams_quantity
      award
      start_date
      end_date
      status
    }
  }
`;
