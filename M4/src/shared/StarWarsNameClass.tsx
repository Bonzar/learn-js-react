import React from "react";
import { starWars, uniqueNamesGenerator } from "unique-names-generator";

interface IStarWarsNameClassState {
  name: string;
  count: number;
}

export class StarWarsNameClass extends React.PureComponent<
  {},
  IStarWarsNameClassState
> {
  state: Readonly<IStarWarsNameClassState> = { name: this.randomName(), count: 0 }; // READONLY!!
 
  // constructor(props: {}) {
  //   super(props);
  //
  //   this.state = {
  //     name: '123'
  //   }
  // }

  render() {
    return (
      <section>
        <span>{this.state.name}</span>
        <div />
        <button onClick={this.handleClick}>I need a name!</button>
      </section>
    );
  }

  private randomName(): string {
    return uniqueNamesGenerator({ dictionaries: [starWars], length: 1 });
  }

  private handleClick = () => {
    this.setState({ name: this.randomName() });
    this.setState((state, props) => ({count: state.count + 1}), () => console.log(this.state.count));
  }
}
