import { Card, Col, Divider, Icon, Input, Row, Spin } from "antd";
import moment from "moment";
import * as queryString from "query-string";
import * as React from "react";
import { compose, withApollo } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { GameDeleteMutation, GamesQuery } from "../../generatedModels";
import CreateGameForm from "./CreateGameForm";

interface IGamesState {
  searchQuery?: string;
}

interface IGamesBaseProps {
  deleteGame: GameDeleteMutation.MutationFn;
}

type IGamesProps = GamesQuery.Props<IGamesBaseProps> & RouteComponentProps;

class Games extends React.Component<IGamesProps, IGamesState> {
  constructor(props: IGamesProps) {
    super(props);
    const query = queryString.parse(props.location.search);
    this.state = {
      searchQuery: query && query.search ? query.search.toString() : undefined
    };
  }

  public render() {
    const { searchQuery } = this.state;
    const { data } = this.props;

    return (
      <Row>
        <Col span={12} offset={6}>
          <Divider>Record Game</Divider>
          <CreateGameForm onSuccess={this.handleCreateGameFormSuccess} />
          <Divider>Games</Divider>
          <Input.Search
            placeholder="Search..."
            enterButton="Search"
            defaultValue={searchQuery}
            onChange={this.handleSearchQueryChange}
            onSearch={this.handleSearch}
          />
          {data!.loading ? (
            <Spin style={{ marginTop: 16, display: "block" }} />
          ) : (
            <div>
              {data!.games!.edges.map(edge => (
                <Row key={edge!.node!.id}>
                  <Col span={10}>
                    <Card style={{ marginTop: 16 }}>
                      <Card.Meta title={edge!.node!.name} />
                      {moment(edge!.node!.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                      <Icon
                        type="delete"
                        key={edge!.node!.id}
                        onClick={() => this.handleDeleteGame(edge!.node!.id)}
                      />
                    </Card>
                  </Col>
                  <Col span={7}>
                    <Card style={{ marginTop: 16 }}>
                      <Card.Meta title="Home" />
                      <span>{edge!.node!.home}</span>
                    </Card>
                  </Col>
                  <Col span={7}>
                    <Card style={{ marginTop: 16 }}>
                      <Card.Meta title="Away" />
                      <span>{edge!.node!.away}</span>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          )}
        </Col>
      </Row>
    );
  }

  private handleSearchQueryChange = (event: any) => {
    this.setState({
      searchQuery: event.target.value || undefined
    });
  };

  private handleSearch = () => {
    const { searchQuery } = this.state;
    const { history, location } = this.props;

    history.push({
      pathname: location.pathname,
      search: queryString.stringify({
        search: searchQuery
      })
    });
  };

  private handleCreateGameFormSuccess = () => {
    const { data } = this.props;
    return data!.refetch();
  };

  private handleDeleteGame = (id: string) => {
    const { data, deleteGame } = this.props;
    return deleteGame({ variables: { id } }).then(() => data!.refetch());
  };
}

export default compose(
  withApollo,
  withRouter,
  GamesQuery.HOC({
    options: (props: IGamesProps) => ({
      variables: queryString.parse(props.location.search)
    })
  }),
  GameDeleteMutation.HOC({
    props: ({ mutate }) => ({
      deleteGame: mutate
    })
  })
)(Games);
