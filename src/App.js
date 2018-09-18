import React, { Component } from 'react';
import './App.css';

const styles = {
  message: {

  }
}

class App extends Component {
  constructor() {
    super()

    this.state = {
      actualValue: '',
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this)

    var W3CWebSocket = require('websocket').w3cwebsocket;

    const client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');

    client.onerror = function() {
        console.log('Connection Error');
    };

    client.onopen = function() {
        console.log('WebSocket Client Connected');
    };

    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };

    client.onmessage = function(e) {
        if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");
            this.setState({
              messages: [...this.state.messages, e.data]
            })
        }
    }.bind(this);
    this.client = client
  }

  sendMessage() {
    const message = this.state.actualValue
    this.client.send(message)
    this.setState({
      actualValue: ''
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.messages.map(m => (
          <div style={styles.message}>
            {m}
          </div>
        ))}

        <input type="text" value={this.state.actualValue} onChange={e => this.setState({actualValue: e.target.value})}></input>
        <input type="button" value="Send" onClick={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
