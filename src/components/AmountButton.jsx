import React, { Component } from 'react';
import { AnchorButton } from '@blueprintjs/core';
import PropTypes from 'prop-types';

class AmountButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onAmountSelected(this.props.amount);
  }

  render() {
    const intent = (this.props.amount === this.props.selectedAmount) ? 'success' : 'warning';
    return (
      <div className="amountButton">
        <AnchorButton
          fill
          large
          intent={intent}
          text={this.props.amount}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

AmountButton.propTypes = {
  onAmountSelected: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  selectedAmount: PropTypes.number.isRequired,
};

export default AmountButton;
