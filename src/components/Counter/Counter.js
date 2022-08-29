import React from 'react';
// import PropTypes from 'prop-types';
import './Counter.css';
import Value from './Value';
import Controls from './Controls';

class Counter extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     value: 0,
  //   };
  // }

  static defaultProps = {
    initialValue: 0,
  };

  static propTypes = {
    //
  };

  state = {
    value: this.props.initialValue,
  };

  handleIncrement = () => {
    this.setState(prevState => ({ value: prevState.value + 1 }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({ value: prevState.value - 1 }));
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Counter">
        <Value value={value} />

        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}

export default Counter;
