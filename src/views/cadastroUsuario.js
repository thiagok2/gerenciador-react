import React from 'react';

import Card from '../components/card'

import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'

import { withRouter } from 'react-router-dom'

import { mensagemErro, mensagemSucesso, mostrarMensagem } from '../components/toastr'


class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        repitaSenha: '',
    };

    constructor(props){
        super(props)
        this.service = new UsuarioService();
    }

    validar(){
        const msgs = [];

        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório');
        }

        if(!this.state.email){
            msgs.push('O campo email é obrigatório');
        }else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            msgs.push('O campo email é inválido');
        }


        if(!this.state.senha || !this.state.repitaSenha){
            msgs.push('Preencha os campos de senha');
        }else if( this.state.senha !== this.state.repitaSenha ){
            msgs.push('A senha não bate.');
        }

        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0 ){
            msgs.forEach( (msg, index) => {
                mensagemErro(index+1 + ' - ' + msg);
            })
            
            return;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        };
        this.service.salvar( usuario ).then((response) => {
            mensagemSucesso('Usuário cadastrado com sucesso. Faça o login');
            this.props.history.push('/login');
        }).catch((erro) => {
            console.log(erro);
            mensagemSucesso(erro.response.data);
        });
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    id="inputNome" 
                                    name="nome" onChange={(e) => this.setState({nome: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Email: *"  htmlFor="inputEmail">
                                <input type="email" 
                                    className="form-control"
                                    id="inputEmail" name="email" onChange={(e) => this.setState({email: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Senha: *"  htmlFor="inputSenha">
                                <input type="password" 
                                    className="form-control"
                                    id="inputSenha" name="senha" onChange={(e) => this.setState({senha: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *"  htmlFor="inputRepitaSenha">
                                <input type="password" 
                                    className="form-control"
                                    id="inputSenha" name="repitaSenha" onChange={(e) => this.setState({repitaSenha: e.target.value})}/>
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Voltar</button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter( CadastroUsuario );