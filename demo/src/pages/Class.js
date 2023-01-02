import { Component } from 'react';

let timer = null;

class Class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      delete: false
    };
  }

  componentDidMount() {
    console.log('componentDidMount!');

    timer = setInterval(() => {
      if (this.state.count >= 5) {
        clearInterval(timer);
        this.setState({
          count: 0
        });
      } else {
        this.setState({
          count: this.state.count + 1
        });
      }
    }, 1_000);
  }

  componentWillUnmount() {
    console.log('Class componentWillUnmount!');

    if (timer) {
      clearInterval(timer);
    }
  }

  render() {
    console.log('render!');

    return (
      <>
        <h1>class</h1>
        <h2>count: { this.state.count }</h2>
        <button onClick={ () => this.setState({ delete: true }) }>Delete</button>
        {
          this.state.delete ? <></> : <Target />
        }
      </>
    );
  }
}

class Target extends Component {
  componentWillUnmount() {
    console.log('Target componentWillUnmount');
  }

  render() {
    return (
      <>Target</>
    )
  }
}

export default Class;