import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { Grid, Segment, Divider, Button } from 'semantic-ui-react';

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
    this.handleChange = this.handleChange.bind(this);
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
    });
    document.getElementById('slider').disabled = true;
  }

  stopTimer() {
    clearInterval(this.countdown);
    this.setState({
      running: false
    });
    document.getElementById('slider').disabled = false;
  }

  handleChange(e) {
    this.setState({
      secondsRemaining: e.target.value
    })
  }

  render() {
    const seconds = this.formatedSeconds();
    const minutes = this.formatedMinutes();
    const running = this.state.running;
    return (
      <div>
        <Grid centered columns={2}>
          <Segment padded="very">
            <h1>{minutes}:{seconds}</h1>
            <Divider horizontal>Choose Duration</Divider>
            <input id="slider" onChange={this.handleChange} type='range' min="0" max="3600"/><br />
            <Button primary size='massive' type='button' onClick={this.state.running ? this.stopTimer : this.startTimer}>{running ? 'stop' : 'start'}</Button>
          </Segment>
        </Grid>
      </div>
    )
  }
}

ReactDOM.render(
  <Timer />, document.getElementById('root')
);
