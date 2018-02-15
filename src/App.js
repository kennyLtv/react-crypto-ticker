import React, { Component } from 'react';
import './App.css';
import TickerBox from './components/TickerBox';

class App extends Component {
  constructor(props){
    super(props)  
    this.state = {
      status: '',
      subscription: {
        "type": "subscribe",
        "product_ids": [
          "BTC-USD",
          "LTC-USD",
          "ETH-USD",
        ],
        "channels": [
            {
                "name": "ticker",
                "product_ids": [
                    "BTC-USD",
                    "LTC-USD",
                    "ETH-USD",
                ]
            }
        ]
      },
      crypto:[],
    }
  }
  componentDidMount(){
   this.socket = new WebSocket('wss://ws-feed.gdax.com')
   this.socket.onopen = function(event){
      this.socket.send(JSON.stringify(this.state.subscription))
      this.setState({
         status: "Connected"
      });
    }.bind(this);
    this.socket.onmessage = function(event){
      let data = JSON.parse(event.data)
      if(data.type !== "subscriptions"){
        this.setState({
          crypto:{
            ...this.state.crypto, [data.product_id]: data 
          }
        })
      } 
    }.bind(this);
    this.socket.onerror = function(event){
      console.log(event)
    }
  }
  componentWillUnmount(){
    this.socket.close()
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">React Crypto Ticker</h1>
          <h3>{this.state.status}</h3>
        </header>
        <div className="content">
          { Object.keys(this.state.crypto).map((item, key)=>{
            let data = this.state.crypto[item]
            return <TickerBox key={key} product={data.product_id} price={data.price} volume={data.volume_24h} />
           
          })}
        </div>
      </div>
    );
  }
}

export default App;
