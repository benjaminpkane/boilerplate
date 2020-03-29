export type Maybe<T> = T | null;

export interface GameInputType {
  home?: Maybe<number>;

  away?: Maybe<number>;
}

/** The `DateTime` scalar type represents a DateTime value as specified by [iso8601](https://en.wikipedia.org/wiki/ISO_8601). */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export namespace GamesQuery {
  export type Variables = {
    search?: Maybe<string>;
  };

  export type Query = {
    __typename?: "Query";

    games: Maybe<Games>;
  };

  export type Games = {
    __typename?: "GameTypeConnection";

    edges: Maybe<Edges>[];
  };

  export type Edges = {
    __typename?: "GameTypeEdge";

    node: Maybe<Node>;
  };

  export type Node = {
    __typename?: "GameType";

    id: string;

    name: string;

    home: number;

    away: number;

    createdAt: DateTime;
  };
}

export namespace GameCreateMutation {
  export type Variables = {
    input: GameInputType;
  };

  export type Mutation = {
    __typename?: "Mutation";

    gameCreate: Maybe<GameCreate>;
  };

  export type GameCreate = {
    __typename?: "GameCreate";

    game: Maybe<Game>;
  };

  export type Game = {
    __typename?: "GameType";

    id: string;
  };
}

export namespace GameDeleteMutation {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    gameDelete: Maybe<GameDelete>;
  };

  export type GameDelete = {
    __typename?: "GameDelete";

    ok: Maybe<boolean>;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace GamesQuery {
  export const Document = gql`
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
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...((this as any)["props"] as any)}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace GameCreateMutation {
  export const Document = gql`
    mutation GameCreateMutation($input: GameInputType!) {
      gameCreate(input: $input) {
        game {
          id
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...((this as any)["props"] as any)}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace GameDeleteMutation {
  export const Document = gql`
    mutation GameDeleteMutation($id: ID!) {
      gameDelete(id: $id) {
        ok
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...((this as any)["props"] as any)}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
