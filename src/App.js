import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css'

import Login from './views/login'

import './custom.css'

class App extends React.Component {
  

  render(){
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
  
}

export default App;
