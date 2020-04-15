import React from 'react';


class App extends React.Component {
  
  state = {
    numero1: null,
    numero2: null,
    resultado: null
  }

  somar = () => {
    this.setState({resultado: parseInt(this.state.numero1) + parseInt(this.state.numero2)});
  }

  render(){
    return (
      <div className="App">
        <label>Numero 1</label>
        <input type="text" value={this.state.numero1} onChange={(e) => this.setState({numero1: e.target.value}) }/>

        <br/>
        <label>Numero 2</label>
        <input type="text" value={this.state.numero2} onChange={(e) => this.setState({numero2: e.target.value}) }/>
        

        <br/>

        <button onClick={this.somar}>
          Somar 
        </button>
        <br/>
        O nome digitado foi: {this.state.resultado}
      </div>
    );
  }
  
}

export default App;
