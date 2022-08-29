import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {
  state = {
    visible: false,
  };

  toggle = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  //   onMouseOver = () => {
  //     this.setState(prevState => ({ visible: !prevState.visible }));
  //   };

  render() {
    const { visible } = this.state;

    return (
      <div className="Dropdown">
        <button
          type="button"
          className="Dropdown__toggle"
          onClick={this.toggle}
          //   onMouseOver={this.onMouseOver}
        >
          {visible ? 'Скрыть' : 'Показать'}
        </button>

        {visible && <div className="Dropdown__menu">Выпадающее меню</div>}
      </div>
    );
  }
}
export default Dropdown;
