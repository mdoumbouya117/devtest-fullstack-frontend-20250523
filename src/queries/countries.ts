import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
    query Counties($continentCode: String) {
        countries(filter: { continent: { eq: $continentCode } }) {
            name
            code
            capital
            continent {
                name
                code
            }
            currencies
            emoji
        }
    }
`