import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      break: 5, session: 25, minutes: '00', seconds: '03', timerStarted: false, 
      timerStopped: true, timerPaused: false, timerLabel: 'Session', playAudio: false
    };
  }

  handleTimerStart = () => {
    const audio = new Audio("https://goo.gl/65cBl1");
    if(this.state.timerStopped || this.state.timerPaused) {
      this.setState({ timerStarted: true, timerStopped: false, timerPaused: false });
      this.timer = setInterval(() => {
        const { minutes, seconds } = this.state;
        if(minutes === '00' && seconds === '00' || minutes === '00' && seconds === '01') {
          this.setState({ playAudio: true });
        } else if(minutes !== '00'){
          this.setState({ autoPlay: false });
        }
        if(parseInt(seconds) > 0) {
          if(parseInt(seconds) <= 10) {
            this.setState({ seconds: `0${seconds - 1}` })
          } else {
            this.setState({ seconds: seconds - 1 });
          }
        } else if (parseInt(minutes) > 0) {
          if(parseInt(minutes) < 10) {
            this.setState({ minutes: `0${minutes - 1}`, seconds: String(59) });
          } else {
            this.setState({ minutes: String(minutes - 1), seconds: String(59) });
          }
        } else if (minutes === '00' && seconds === '00'){
            if(this.state.timerLabel === 'Session') {
              this.setState({ minutes: this.state.break, seconds: '00', timerLabel: 'Break' });
            } else {
              this.setState({ minutes: this.state.session, seconds: '00', timerLabel: 'Session' });
            }
        }
      }, 1000);
    } else if(this.state.timerStarted) {
      this.setState({ timerStarted: false, timerStopped: false, timerPaused: true });
      clearInterval(this.timer);
    }
  }

  handleTimerStop = () => {
    this.setState({ timerStarted: false, timerStopped: true, minutes: '25', seconds: '00', break: 5, session: 25, timerLabel: 'Session', playAudio: false });
    clearInterval(this.timer);
  }

  decrement = (value) => {
    if(this.state.timerStopped === true) {
      if(value === 0) {
        this.setState({ break: this.state.break > 1 ? this.state.break - 1 : this.state.break });
      } else {
        this.setState({ session: this.state.session > 1 ? this.state.session - 1 : this.state.session }, () => { this.setState({ minutes: String(this.state.session), seconds: 0 })});
      }
    }
  }

  increment = (value) => {
    if(this.state.timerStopped === true) {
      if(value === 0) {
        this.setState({ break: this.state.break < 60 ? this.state.break + 1 : this.state.break });
      } else {
        this.setState({ 
          session: this.state.session < 60 ? this.state.session + 1 : this.state.session }, () => { this.setState({ minutes: String(this.state.session), seconds: 0 })});
      }
    }
  }
  render() {
    return (
      <div id="display">
        <div className="current-timer">
          <div id="timer-label">{ this.state.timerLabel }</div>
          <div id="time-left">{`${this.state.minutes}:${this.state.seconds}`}</div>
        </div>
        <div className="current-details">
          <div className="outer">
            <span id="break-label">Break Length</span>
            <div className="inner">
            <i className="fa fa-arrow-down" id="break-decrement" onClick={() => this.decrement(0)} />
              <span id="break-length">{this.state.break}</span>
              <i className="fa fa-arrow-up" id="break-increment" onClick={() => this.increment(0)} />
            </div>
          </div>
          <div className="outer">
            <span id="session-label">Session Length</span>
            <div className="inner">
            <i className="fa fa-arrow-down" id="session-decrement" onClick={() => this.decrement(1)} />
              <span id="session-length">{this.state.session}</span>
              <i className="fa fa-arrow-up" id="session-increment" onClick={() => this.increment(1)} />
            </div>
          </div>
        </div>
        <div className="button-group">
          <button onClick={() => this.handleTimerStart()} id="start_stop" className="button button-orange">{this.state.timerStarted ? 'Pause' : 'Start' }</button>
          <button onClick={() => this.handleTimerStop()} id="reset" className="button button-orange">Stop</button>
        </div>
        {this.state.playAudio && <audio id="beep" src="https://goo.gl/65cBl1" autoPlay /> }
      </div>
        
    );
  }
}