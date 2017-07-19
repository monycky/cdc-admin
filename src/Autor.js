import React, {Component} from 'react';
import $ from 'jquery';
import InputCostumized from './components/InputCostumized';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';


class FormularioAutor extends Component{
    constructor() {
        super();
        this.state = {nome: "", email: "", senha: "" };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

  enviaForm(evento) {
    evento.preventDefault();

    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      contentType: "application/json",
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      success: function (novaLista) {
        PubSub.publish('atualiza-lista-autores', novaLista);
      }.bind(this),
      error: function(resposta) {
        if(resposta.status === 400){
          new TratadorErros().publicaErros(resposta.responseJSON);
        }         
      }
    });
  }

 setNome(evento) {
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value });
  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value });
  }
  
    render(){
        return(
        <div className="pure-form pure-form-aligned">
              <form
                className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post" >
                <div className="pure-control-group">
                  <InputCostumized id="nome" type="text" name="nome" value={this.state.name} onChange={this.setNome} label="Nome" />
                  <InputCostumized id="email" type="mail" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                  <InputCostumized id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                </div>
                <div className="pure-control-group">
                  <label />
                  <button type="submit" className="pure-button pure-button-primary">
                    Gravar
                  </button>
                </div>
              </form>
            </div>);
    }
}

class TabelaAutores extends Component{
    render(){
        return(
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.lista.map(function(autor) {
                    return (
                      <tr key={autor.id}>
                        <td>{autor.nome}</td>
                        <td>{autor.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
        );
    }

}

export default class AutorBox extends Component{
 constructor() {
    super();
    this.state = { lista: []};   
  }

  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: "json",
      success: function(resposta) {
        this.setState({ lista: resposta });
      }.bind(this)
    });
    PubSub.subscribe('atualiza-lista-autores', function(topico, novaLista){
      this.setState({lista: novaLista});
    }.bind(this));
  }


    render(){
        return(
            <div>
            <FormularioAutor/>
            <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }

}