import gql from "graphql-tag";

export const GAMES_QUERY = gql`
  query GamesQuery($search: String) {
    games(search: $search) {
      edges {
        node {
          id
          name
          home
          away
          createdAt
        }
      }
    }
  }
`;

export const GAME_CREATE_MUTATION = gql`
  mutation GameCreateMutation($input: GameInputType!) {
    gameCreate(input: $input) {
      game {
        id
      }
    }
  }
`;

export const GAME_DELETE_MUTATION = gql`
  mutation GameDeleteMutation($id: ID!) {
    gameDelete(id: $id) {
      ok
    }
  }
`;
