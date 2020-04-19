import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import {withRouter} from 'react-router-dom'

import SelectMenu from '../../components/selectMenu'

import LancamentoTable from './lancamentoTable'

import LancamentoService from '../../app/service/lancamentoService'

import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'
class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        usuario: ''
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () =>{

        if(!this.state.ano){
            messages.mensagemErro('Preencher ano é obrigatório');
            return false;
        }
        console.log(this.state);

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar( lancamentoFiltro )
        .then(
            (response) => {
                this.setState({lancamentos: response.data});
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        );
    }
    
    render(){

        const lista = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-12">

                        <FormGroup lable="Descrição: *" htmlFor="inputDesc">
                            <input type="text" 
                                className="form-control" 
                                id="inputDesc" 
                                name="descricao" 
                                value={this.state.descricao}
                                onChange={(e) => this.setState({descricao: e.target.value})} 
                                placeholder="Digite parte da descrição"
                                />
                        </FormGroup>

                        <FormGroup lable="Ano: *" htmlFor="inputAno">
                            <input type="text" 
                                className="form-control" 
                                id="inputAno" 
                                name="ano" 
                                value={this.state.ano}
                                onChange={(e) => this.setState({ano: e.target.value})} 
                                placeholder="Digite Ano"
                                />
                        </FormGroup>

                        <FormGroup lable="Mês: *" htmlFor="inputMes">
                            <SelectMenu id="inputMes" className="form-control" lista={lista} value={this.state.mes} onChange={(e) => this.setState({mes: e.target.value})}></SelectMenu>
                        </FormGroup>

                        <FormGroup lable="Tipo: *" htmlFor="inputTipo">
                            <SelectMenu className="form-control" lista={tipos} value={this.state.tipo} onChange={(e) => this.setState({tipo: e.target.value})}></SelectMenu>
                        </FormGroup>

                        <button type="button" onClick={this.buscar} className="btn btn-success">Buscar</button>
                        <button type="button" className="btn btn-danger">Cadastrar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div class="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos}></LancamentoTable>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)