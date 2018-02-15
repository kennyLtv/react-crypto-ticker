import React, { Component } from 'react';
import './TickerBox.css';

class TickerBox extends Component {
  render() {
    return (
      <div className="ticker">
        <div className="ticker-header">
          Crypto: {this.props.product}
        </div>
        <div className="ticker-volume">
          24 Hour Volume: {this.props.volume}
        </div>
        <div className="ticker-price">
          Current Price: {Number(this.props.price).toFixed(2)}
        </div>
      </div>
    );
  }
}

export default TickerBox;
