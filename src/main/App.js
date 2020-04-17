import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css'

import Login from '../views/login'

import Rotas from './rotas'

import NavBar from '../components/navbar'

import CadastroUsuario from '../views/cadastroUsuario'

import '../custom.css'

class App extends React.Component {
  

  render(){
    return (
      <div>
        <NavBar />
        <div className="container">
          <Rotas  />
        </div>
      </div>
    );
  }
  
}

export default App;
