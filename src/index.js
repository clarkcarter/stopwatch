import React from 'react';
import ReactDOM from 'react-dom';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 610,
      running: false
    };
    this.formatedSeconds = this.formatedSeconds.bind(this);
    this.formatedMinutes = this.formatedMinutes.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  formatedSeconds() {
    const formatedSecs = this.state.secondsRemaining % 60;
    if (formatedSecs > 9) {
      return formatedSecs;
    } else {
      return "0" + formatedSecs;
    }
  }

  formatedMinutes() {
    const formatedMinutes = Math.floor(this.state.secondsRemaining / 60);
    if (formatedMinutes > 9) {
      return formatedMinutes;
    } else {
      return "0" + formatedMinutes;
    }
  }

  startTimer() {
    this.countdown = setInterval(() =>
    this.setState({
      secondsRemaining: this.state.secondsRemaining -1
    }),1000);
    this.setState({
      running: true
    })
  }

  stopTimer() {
    clearInterval(this.countdown);
    this.setState({
      running: false
    })
  }

  render() {
    const seconds = this.formatedSeconds();
    const minutes = this.formatedMinutes();
    const running = this.state.running;
    return (
      <div className="timer">
        <h1>{minutes}:{seconds}</h1>
        <button onClick={this.state.running ? this.stopTimer : this.startTimer}>{running ? 'stop' : 'start'}</button>
        <button>reset</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Timer />, document.getElementById('root')
);
