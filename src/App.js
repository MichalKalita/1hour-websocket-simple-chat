import React, { Component } from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

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
    this.connect = this.connect.bind(this)
  }

  componentDidMount() {
    this.connect()
  }

  componentWillUnmount() {
    clearInterval(this.connectTimeout)
  }

  connect() {
    const client = new W3CWebSocket(`ws://${window.location.hostname}:8080/`, 'echo-protocol');

    client.onerror = () => {
        console.log('Connection Error');
    };

    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };

    client.onclose = () => {
        console.log('echo-protocol Client Closed');
        this.connectTimeout = setTimeout(this.connect, 3 * 1000);
    };

    client.onmessage = e => {
        if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");
            this.setState({
              messages: [...this.state.messages, e.data]
            })
        }
    };
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
