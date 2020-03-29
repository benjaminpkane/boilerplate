import { Button, Col, Form, Input, Row } from "antd";
import * as React from "react";
import { compose, withApollo } from "react-apollo";

import { GameCreateMutation } from "../../generatedModels";

interface ICreateGameFormState {
  gameAway: string | number;
  gameHome: string | number;
}

export interface ICreateGameFormProps {
  createGame: GameCreateMutation.MutationFn;
  onSuccess: () => any;
}

class CreateGameForm extends React.Component<
  ICreateGameFormProps,
  ICreateGameFormState
> {
  public state: ICreateGameFormState = {
    gameAway: "",
    gameHome: ""
  };

  public render() {
    const { gameAway, gameHome } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Home"
              value={String(gameHome)}
              onChange={this.handleGameHomeChange}
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Away"
              value={String(gameAway)}
              onChange={this.handleGameAwayChange}
            />
          </Col>
          <Col span={8}>
            <Button type="primary" htmlType="submit" block={true}>
              Record Game
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  private handleGameHomeChange = (event: any) => {
    this.setState({ gameHome: event.target.value });
  };

  private handleGameAwayChange = (event: any) => {
    this.setState({ gameAway: event.target.value });
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const { gameAway, gameHome } = this.state;
    const { createGame, onSuccess } = this.props;
    if (gameHome === "" || gameAway === "") {
      alert("Invalid Scores");
      return;
    }
    const homeVal = parseInt(String(gameHome), 10);
    const awayVal = parseInt(String(gameAway), 10);
    return createGame({
      variables: {
        input: {
          away: awayVal,
          home: homeVal
        }
      }
    }).then(() => {
      this.setState({ gameAway: "", gameHome: "" });
      return onSuccess();
    });
  };
}

export default compose(
  withApollo,
  GameCreateMutation.HOC({
    props: ({ mutate }) => ({
      createGame: mutate
    })
  })
)(CreateGameForm);
