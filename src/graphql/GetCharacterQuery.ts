import { gql } from "@apollo/client";

export const CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        id
        name
      }
      location {
        id
        name
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;
