import React from 'react';
import ReactDOM from 'react-dom';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 57
    };
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.formatSeconds = this.formatSeconds.bind(this);
    this.formatMinutes = this.formatMinutes.bind(this);
  }

  formatSeconds() {
    const formatedSeconds = this.state.seconds % 60;
    return (formatedSeconds);
  }

  formatMinutes() {
    return Math.floor(this.state.seconds / 60);
  }

  startTimer() {
    this.setState({
      seconds: this.state.seconds + 1
    })
  }

  handleStartClick() {
   this.timer = setInterval(() => this.startTimer(),1000);
  }

  handleStopClick() {
    clearInterval(this.timer);
    this.setState({
      seconds: 0
    })
  }

  render() {
    return (
      <div>
        <h1>{this.formatMinutes()}:{this.formatSeconds()}</h1>
        <button onClick={this.handleStartClick}>start</button>
        <button onClick={this.handleStopClick}>stop</button>
      </div>
    )
  }
}

ReactDOM.render(<Stopwatch />, document.getElementById('root'));
