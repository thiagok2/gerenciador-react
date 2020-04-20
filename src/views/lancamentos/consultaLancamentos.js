import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import {withRouter} from 'react-router-dom'

import SelectMenu from '../../components/selectMenu'

import LancamentoTable from './lancamentoTable'

import LancamentoService from '../../app/service/lancamentoService'

import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        usuario: '',
        showConfirmDialog: false,
        lancamentoDeletar: null
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

    editar = (id) => {
        console.log('editando lancamento', id);
        this.props.history.push(`/cadastro-lancamentos/${id}`);

    }

    abrirConfirmacao = (lancamento) =>{
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: null});
    }

    deletar = () => {
        console.log('deletando lancamento', this.state.lancamentoDeletar.id);
        this.service.deletar(this.state.lancamentoDeletar.id).
            then( response =>{

                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamentos);
                lancamentos.splice(index, 1);

                this.setState({
                    lancamentos: lancamentos,
                    showConfirmDialog: false
                });

            messages.mensagemSucesso('Lancamento ex');
        }).catch(error => {
            messages.mensagemErro(error);
        })
    }

    prepararFormularioLancamento = () =>{
        this.props.history.push('/cadastro-lancamentos');
    }
    
    render(){

        const lista = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={this.deletar} />
                <Button label="No" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        
        const myIcon = (
            <button className="p-dialog-titlebar-icon p-link">
                <span className="pi pi-search"></span>
            </button>
        )

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
                        <button type="button" onClick={this.prepararFormularioLancamento} className="btn btn-danger">Cadastrar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar}

                            ></LancamentoTable>
                            
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirma?" 
                        visible={this.state.showConfirmDialog} 
                        style={{width: '50vw'}} 
                        modal={true}
                        footer={confirmDialogFooter} 
                        onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão desse lançamento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)