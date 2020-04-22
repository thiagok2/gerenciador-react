import React from 'react';

import ProvedorAutenticacao from './provedorAutenticacao'

import 'bootswatch/dist/flatly/bootstrap.css'

import Login from '../views/login'

import Rotas from './rotas'

import NavBar from '../components/navbar'

import CadastroUsuario from '../views/cadastroUsuario'

import '../custom.css'

import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

import {Button} from 'primereact/button';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends React.Component {
  

  render(){
    return (
      <ProvedorAutenticacao>
        <NavBar />
        
        <div className="container">
          <Rotas  />
        </div>
      </ProvedorAutenticacao>
    );
  }
  
}

export default App;
