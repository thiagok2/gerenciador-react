import React from 'react'

import NavBarItem from './navbarItem'

import { AuthConsumer } from '../main/provedorAutenticacao'


function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="/#/home" className="navbar-brand">Minhas Finanças</a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    <NavBarItem render={props.isUsuarioAutenticado} label="home" href="/#/home"/>
                    <NavBarItem render={props.isUsuarioAutenticado} label="Cadastrar Usuário" href="/#/cadastro-usuarios"/>

                    <NavBarItem render={props.isUsuarioAutenticado} label="Lançamento" href="/#/consulta-lancamentos"/>
                    
                    <NavBarItem render={props.isUsuarioAutenticado} label="Cadastrar Lançamento" href="/#/cadastro-lancamentos"/>
                
                    <NavBarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} label="Sair" href="/#/login"/>
                </ul>

                </div>
            </div>
        </div>
    );
}

export default () => (
    <AuthConsumer>
        {(context) => (<Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}/>)}
    </AuthConsumer>
);