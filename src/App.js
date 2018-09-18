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
  }

  sendMessage() {
    const message = this.state.actualValue
    this.setState({
      actualValue: '',
      messages: [...this.state.messages, message]
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
