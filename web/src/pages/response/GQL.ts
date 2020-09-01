import gql from "graphql-tag";

export const ADD_RESPONSE = gql`
    mutation($user: UserAddResponseInput!) {
        user: addResponseToUser(input: $user) {
            cedula_arrendatario
            nombre_arrendatario
            correo_arrendatario
            telefono_arrendatario
            direccion_arrendatario
            ciudad
            cedula_propietario
            nombre_propietario
            correo_propietario
            telefono_propietario
            direccion_propietario
        }
    }
`;
