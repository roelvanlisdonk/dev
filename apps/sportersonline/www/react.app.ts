

console.log("dit is een test");

const root = document.getElementById('root');

class Hello extends React.Component<any, any> {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);