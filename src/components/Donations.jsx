import React, { Component } from 'react';
import { newInvoice, awaitStatus } from '../api';
import Logo from './Logo';
import AmountButton from './AmountButton';
import QRCodePending from './QRCodePending';
import QRCodeView from './QRCodeView';
import QRCodePaid from './QRCodePaid';

const paymentEnum = {
  GENERATING_INVOICE: 0,
  REQUESTING_PAYMENT: 1,
  PAID: 2,
};


class Donations extends Component {
  constructor(props) {
    super(props);
    this.state = { bitcoinAmount: 0.1, invoice: '', qrCodeType: 'both', paymentStatus: paymentEnum.GENERATING_INVOICE };

    this.handleNewAmount = this.handleNewAmount.bind(this);
    this.generateInvoice();
  }

  setInvoice(invoice) {
    this.setState({
      invoice,
      paymentStatus: paymentEnum.REQUESTING_PAYMENT,
    }, this.checkInvoiceStatus);
  }

  async generateInvoice() {
    const description = `Donation of ${this.state.bitcoinAmount}`;
    const invoice = await newInvoice(this.state.bitcoinAmount * 1e8, description);
    this.setInvoice(invoice);
  }

  handleNewAmount(bitcoinAmount) {
    this.setState({
      bitcoinAmount,
    }, this.generateInvoice);
  }

  async checkInvoiceStatus() {
    // Check for both LN & BTC statuses
    const status = await awaitStatus(this.state.invoice.hash, this.state.invoice.address);
    if (!('error' in status)) {
      // TODO: check what error happened
      this.setState({
        paymentStatus: paymentEnum.PAID,
      });
    }

    // TODO handle expired invoices
  }

  displayQRCode() {
    switch (this.state.paymentStatus) {
      case paymentEnum.GENERATING_INVOICE:
        return (
          <QRCodePending />
        );
      case paymentEnum.REQUESTING_PAYMENT:
        return (
          <QRCodeView
            address={this.state.invoice.address}
            amount={this.state.bitcoinAmount}
            bolt11={this.state.invoice.bolt11}
            qrCodeType={this.state.qrCodeType}
          />
        );
      case paymentEnum.PAID:
        return (
          <QRCodePaid />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div id="donationsWrapper">
        <div id="donationLogo">
          <Logo />
        </div>
        <div id="donationDescription">
          <span>Please select an amount to Donate</span>
        </div>

        <div>
          {this.displayQRCode()}
        </div>

        <div id="donationAmount">
          <span>Donate {this.state.bitcoinAmount} BTC</span>
        </div>

        <div id="donationButtons">
          <AmountButton
            amount={0.001}
            selectedAmount={this.state.bitcoinAmount}
            onAmountSelected={this.handleNewAmount}
          />
          <AmountButton
            amount={0.01}
            selectedAmount={this.state.bitcoinAmount}
            onAmountSelected={this.handleNewAmount}
          />
          <AmountButton
            amount={0.1}
            selectedAmount={this.state.bitcoinAmount}
            onAmountSelected={this.handleNewAmount}
          />
          <AmountButton
            amount={1}
            selectedAmount={this.state.bitcoinAmount}
            onAmountSelected={this.handleNewAmount}
          />
          <AmountButton
            amount={10}
            selectedAmount={this.state.bitcoinAmount}
            onAmountSelected={this.handleNewAmount}
          />
        </div>
      </div>
    );
  }
}

export default Donations;
