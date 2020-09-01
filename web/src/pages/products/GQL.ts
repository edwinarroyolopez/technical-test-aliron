import gql from "graphql-tag";

export const GET_PATCHS = gql`
  query($user_id: String) {
    dataPatch: getBookingsByUser (user_id: $user_id) {
        reservas
        id_parche
        parche
        estado
        enlace
        fecha_inicio
        fecha_fin
    }
  }
`;
