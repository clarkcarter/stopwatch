import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { Segment, Button, Grid } from 'semantic-ui-react';
import ding from './assets/ding.mp3';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 1800,
      running: false
    };
    this.formatedSeconds = this.formatedSeconds.bind(this);
    this.formatedMinutes = this.formatedMinutes.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tick = this.tick.bind(this);
    this.ding = new Audio(ding);
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

  tick() {
    if (this.state.secondsRemaining > 0) {
      this.setState({
        secondsRemaining: this.state.secondsRemaining -1
      });
    } else {
      this.ding.play();
      clearInterval(this.countdown);
      document.getElementById("slider").disabled = false;
      this.setState({
        running: false
      });
    }
  }

  startTimer() {
    this.setState({
      running: true
    });
    this.countdown = setInterval(this.tick, 1000);
    document.getElementById("slider").disabled = true;
  }

  stopTimer() {
    clearInterval(this.countdown);
    this.setState({
      running: false
    });
    document.getElementById("slider").disabled = false;
  }

  handleChange(e) {
    this.setState({
      secondsRemaining: e.target.value
    })
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  render() {
    const seconds = this.formatedSeconds();
    const minutes = this.formatedMinutes();
    const running = this.state.running;
    return (
      <div>
        <Segment>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column id='timer'>
              <h1 id='counter'>{minutes}:{seconds}</h1>
              <input id="slider" onChange={this.handleChange} value={this.state.secondsRemaining} type='range' min="0" max="3600" step="60"/>
              <Button id="button" color={ running ? "red" : "green" } size='massive' type='button' onClick={ running ? this.stopTimer : this.startTimer }> { running ? 'stop' : 'start' }</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

ReactDOM.render(
  <Timer />, document.getElementById('root')
);
