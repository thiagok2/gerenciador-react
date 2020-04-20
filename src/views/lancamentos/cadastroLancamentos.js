import React from 'react'

import { withRouter } from 'react-router-dom' 

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'

import * as messages from '../../components/toastr'

import LocalStorageService from '../../app/service/localStorageService'

class CadastroLancamentos extends React.Component{

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes:'',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(props){
        super(props);
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        if(params.id){
            this.service.obterPorId(params.id).then( (response) => {
                this.setState({...response.data, atualizando: true});
            }).catch((erro) => {
                messages.mensagemErro(erro.response.data);
            })
        }
        console.log(params);
        
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value});
    }

    submit = () => {
        console.log(this.state);
        

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes ,ano, tipo } = this.state;

        const lancamento = {
            descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id
        };

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }     


        this.service.salvar(lancamento).then( response =>{
            this.props.history.push('/consulta-lancamentos');
            messages.mensagemSucesso("Lançamento cadastrado com sucesso");
        }).catch((error => {
            messages.mensagemErro(error);
        }));
    }

    atualizar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes ,ano, tipo, status, usuario, id  } = this.state;

        const lancamento = {
            descricao, valor, mes, ano, tipo, status, usuario, id 
        };

        this.service.atualizar(lancamento).then( response =>{
            this.props.history.push('/consulta-lancamentos');
            messages.mensagemSucesso("Lançamento atualizado com sucesso");
        }).catch((error => {
            messages.mensagemErro(error);
        }));
    }


    render(){

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        return (
            <Card title={this.state.atualizando ? 'Atualizando Lançamento':'Cadastrando Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup label="Descrição: *" htmlFor="inputDesc">
                            <input type="text" 
                                className="form-control" 
                                id="inputDesc" 
                                name="descricao" 
                                value={this.state.descricao}
                                onChange={this.handleChange} 
                                placeholder="Digite parte da descrição"
                                />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label="Ano: *" htmlFor="inputAno">
                            <input type="text" 
                                className="form-control" 
                                id="anoDesc" 
                                name="ano" 
                                value={this.state.ano}
                                onChange={this.handleChange}
                                placeholder="Digite parte da ano"
                                />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        
                        <FormGroup label="Mes: *" htmlFor="selectMes">
                            <SelectMenu className="form-control" 
                                        lista={meses} 
                                        value={this.state.mes} 
                                        name="mes"
                                        onChange={this.handleChange}/>
                        </FormGroup>
            
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup label="Valor: *" htmlFor="inputValor">
                            <input type="text" 
                                className="form-control" 
                                id="inputValor" 
                                name="valor" 
                                value={this.state.valor}
                                onChange={this.handleChange}
                                placeholder="Digite o valor"
                                />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup label="Tipo: *" htmlFor="selectTipo">
                            <SelectMenu id="selectTipo" 
                                        className="form-control" 
                                        lista={tipos}
                                        name="tipo"
                                        value={this.state.tipo} 
                                        onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup label="Status: *" htmlFor="inputStatus">
                            <input type="text" 
                                className="form-control" 
                                id="inputStatus" 
                                name="status" 
                                value={this.state.status}
                                onChange={this.handleChange}
                                disabled
                                />
                        </FormGroup>
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col-md-6">
                        {
                            this.state.atualizando ?
                            (<button onClick={this.atualizar} className="btn btn-info">Atualizar</button>)
                            :
                            (<button onClick={this.submit} className="btn btn-success">Salvar</button>)
                        }
                        <button onClick={() => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)