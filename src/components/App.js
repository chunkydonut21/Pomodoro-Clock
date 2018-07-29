import React from 'react';
import Header from './Header';
import Clock from './Clock';

class App extends React.Component {
  render() {
    return (
      <div className="wrap">
        <Header />
        <Clock />
      </div>
    );
  }
}

export default App;
