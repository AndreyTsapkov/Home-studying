import { number } from 'prop-types';
import { Component } from 'react';
import { Controls } from './Controls';
import { Progress } from './Progress';
import { Publicaton } from './Publication';

const LS_KEY = 'reader_item_index';

export default class Reader extends Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    const savedIndex = localStorage.getItem(LS_KEY);

    if (savedIndex) {
      this.setState({ index: Number(savedIndex) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      localStorage.setItem(LS_KEY, this.state.index);
    }
  }

  changeIndex = value => {
    this.setState(state => ({ index: state.index + value }));
  };

  render() {
    const { index } = this.state;
    const { items } = this.props;

    const totalItems = items.length;
    const currentItem = items[this.state.index];

    return (
      <div>
        <Controls
          currentItem={index + 1}
          totalItems={totalItems}
          onChange={this.changeIndex}
        />

        <Progress currentPage={index + 1} totalPages={totalItems} />

        <Publicaton title={currentItem.title} text={currentItem.text} />
      </div>
    );
  }
}
